import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import re
import json

# Load environment variables
load_dotenv('/Users/aryan/Desktop/brickfi/server/.env')

# Connect to MongoDB Atlas
MONGO_URI = os.getenv('MONGO_URI')
print(f"Connecting to: {MONGO_URI[:50]}...")

client = MongoClient(MONGO_URI)
db = client['brickfi']
collection = db['markets']

print("✅ Connected to MongoDB Atlas")

# Load State time series
print("📂 Loading State_time_series.csv...")
df = pd.read_csv('/Users/aryan/Desktop/brickfi/data/raw/zillow/State_time_series.csv')
print(f"📊 Loaded {len(df)} rows, {len(df.columns)} columns")

# Select the columns we want
columns_map = {
    'Date': 'date',
    'RegionName': 'state',
    'MedianListingPrice_AllHomes': 'medianListingPrice',
    'MedianListingPrice_1Bedroom': 'medianListingPrice_1bed',
    'MedianListingPrice_2Bedroom': 'medianListingPrice_2bed',
    'MedianListingPrice_3Bedroom': 'medianListingPrice_3bed',
    'MedianListingPrice_SingleFamilyResidence': 'medianListingPrice_sfr',
    'MedianListingPrice_CondoCoop': 'medianListingPrice_condo',
    'MedianListingPricePerSqft_AllHomes': 'pricePerSqft',
    'MedianListingPricePerSqft_SingleFamilyResidence': 'pricePerSqft_sfr',
    'MedianListingPricePerSqft_CondoCoop': 'pricePerSqft_condo',
    'MedianRentalPricePerSqft_AllHomes': 'rentalPricePerSqft',
    'MedianRentalPricePerSqft_1Bedroom': 'rentalPricePerSqft_1bed',
    'MedianRentalPricePerSqft_2Bedroom': 'rentalPricePerSqft_2bed',
    'MedianRentalPricePerSqft_3Bedroom': 'rentalPricePerSqft_3bed',
    'MedianRentalPricePerSqft_SingleFamilyResidence': 'rentalPricePerSqft_sfr',
    'MedianRentalPricePerSqft_CondoCoop': 'rentalPricePerSqft_condo',
    'MedianPctOfPriceReduction_AllHomes': 'pctPriceReduction',
    'MedianPriceCutDollar_AllHomes': 'medianPriceCutDollar',
    'DaysOnZillow_AllHomes': 'daysOnMarket',
    'InventoryRaw_AllHomes': 'inventoryCount',
    'InventorySeasonallyAdjusted_AllHomes': 'inventoryAdjusted',
}

# Filter to only columns that exist
available = {k: v for k, v in columns_map.items() if k in df.columns}
print(f"✅ Matched {len(available)} columns")

# Select and rename
df_clean = df[list(available.keys())].rename(columns=available)

# Fix state names: "NewYork" → "New York"
def fix_state_name(name):
    if isinstance(name, str):
        return re.sub(r'(?<!^)(?=[A-Z])', ' ', name).strip()
    return name

df_clean['state'] = df_clean['state'].apply(fix_state_name)

# Fix edge cases
df_clean['state'] = df_clean['state'].replace({
    'Districtof Columbia': 'District of Columbia',
})

print(f"✅ Fixed state names: {list(df_clean['state'].unique()[:5])}...")

# Convert date
df_clean['date'] = pd.to_datetime(df_clean['date'], errors='coerce')
df_clean = df_clean.dropna(subset=['state', 'date'])

# Calculate price-to-rent ratio
if 'pricePerSqft' in df_clean.columns and 'rentalPricePerSqft' in df_clean.columns:
    df_clean['priceToRentRatio'] = (
        df_clean['pricePerSqft'] / (df_clean['rentalPricePerSqft'] * 12)
    ).round(2)

print(f"📊 Cleaned data: {len(df_clean)} rows")

# Verify New York sample before inserting
ny = df_clean[df_clean['state'] == 'New York'].tail(1)
print(f"\n📋 Sample (New York latest):")
print(ny.to_string())

# Insert into MongoDB
records = df_clean.where(pd.notnull(df_clean), None).to_dict('records')

collection.delete_many({})
print("\n🗑️  Cleared existing data")

batch_size = 500
total = 0
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    collection.insert_many(batch)
    total += len(batch)
    print(f"⬆️  Inserted {total}/{len(records)} records...")

print(f"\n🎉 Done! {total} records loaded into MongoDB")

# Final verification
sample = collection.find_one({'state': 'New York'}, {'_id': 0})
if sample:
    print(f"\n✅ Verified in MongoDB (New York sample):")
    print(json.dumps({k: str(v) for k, v in sample.items()}, indent=2))
else:
    print("\n⚠️ Could not find New York in MongoDB - check state names")

client.close()