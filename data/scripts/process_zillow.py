import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
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

    # Listing Prices
    'MedianListingPrice_AllHomes': 'medianListingPrice',
    'MedianListingPrice_1Bedroom': 'medianListingPrice_1bed',
    'MedianListingPrice_2Bedroom': 'medianListingPrice_2bed',
    'MedianListingPrice_3Bedroom': 'medianListingPrice_3bed',
    'MedianListingPrice_SingleFamilyResidence': 'medianListingPrice_sfr',
    'MedianListingPrice_CondoCoop': 'medianListingPrice_condo',

    # Price per sqft
    'MedianListingPricePerSqft_AllHomes': 'pricePerSqft',
    'MedianListingPricePerSqft_SingleFamilyResidence': 'pricePerSqft_sfr',
    'MedianListingPricePerSqft_CondoCoop': 'pricePerSqft_condo',

    # Rental Prices
    'MedianRentalPricePerSqft_AllHomes': 'rentalPricePerSqft',
    'MedianRentalPricePerSqft_1Bedroom': 'rentalPricePerSqft_1bed',
    'MedianRentalPricePerSqft_2Bedroom': 'rentalPricePerSqft_2bed',
    'MedianRentalPricePerSqft_3Bedroom': 'rentalPricePerSqft_3bed',
    'MedianRentalPricePerSqft_SingleFamilyResidence': 'rentalPricePerSqft_sfr',
    'MedianRentalPricePerSqft_CondoCoop': 'rentalPricePerSqft_condo',

    # Market indicators
    'MedianPctOfPriceReduction_AllHomes': 'pctPriceReduction',
    'MedianPriceCutDollar_AllHomes': 'medianPriceCutDollar',
    'DaysOnZillow_AllHomes': 'daysOnMarket',
    'InventoryRaw_AllHomes': 'inventoryCount',
    'InventorySeasonallyAdjusted_AllHomes': 'inventoryAdjusted',
}

# Filter to only columns that exist
available = {k: v for k, v in columns_map.items() if k in df.columns}
print(f"✅ Matched {len(available)} columns")

# Select, rename, clean
df_clean = df[list(available.keys())].rename(columns=available)
df_clean['date'] = pd.to_datetime(df_clean['date'], errors='coerce')
df_clean = df_clean.dropna(subset=['state', 'date'])

# Calculate price-to-rent ratio
if 'medianListingPrice' in df_clean.columns and 'rentalPricePerSqft' in df_clean.columns and 'pricePerSqft' in df_clean.columns:
    df_clean['priceToRentRatio'] = (
        df_clean['pricePerSqft'] / (df_clean['rentalPricePerSqft'] * 12)
    ).round(2)

print(f"📊 Cleaned data: {len(df_clean)} rows")
print(df_clean[df_clean['state'] == 'New York'].tail(3))

# Insert into MongoDB
records = df_clean.where(pd.notnull(df_clean), None).to_dict('records')

collection.delete_many({})
print("🗑️  Cleared existing data")

batch_size = 500
total = 0
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    collection.insert_many(batch)
    total += len(batch)
    print(f"⬆️  Inserted {total}/{len(records)} records...")

print(f"\n🎉 Done! {total} records loaded into MongoDB")

# Verify
sample = collection.find_one({'state': 'New York'}, {'_id': 0})
if sample:
    print(f"\n📋 Sample (New York):")
    print(json.dumps({k: str(v) for k, v in sample.items()}, indent=2))

client.close()