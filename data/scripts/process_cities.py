import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import re

load_dotenv('/Users/aryan/Desktop/brickfi/server/.env')

client = MongoClient(os.getenv('MONGO_URI'))
db = client['brickfi']
collection = db['cities']

print("✅ Connected to MongoDB Atlas")

# Load crosswalk
print("📂 Loading crosswalk...")
cross = pd.read_csv('/Users/aryan/Desktop/brickfi/data/raw/zillow/cities_crosswalk.csv')
cross.columns = ['city_id', 'city', 'county', 'state']
print(f"✅ {len(cross)} cities in crosswalk")

# Load city time series - only latest date per city
print("📂 Loading City_time_series.csv (this may take a moment)...")
cols = [
    'Date', 'RegionName',
    'MedianListingPrice_AllHomes',
    'MedianListingPrice_1Bedroom',
    'MedianListingPrice_2Bedroom',
    'MedianListingPrice_3Bedroom',
    'MedianListingPrice_4Bedroom',
    'MedianListingPricePerSqft_AllHomes',
    'MedianListingPricePerSqft_1Bedroom',
    'MedianListingPricePerSqft_2Bedroom',
    'MedianListingPricePerSqft_3Bedroom',
    'MedianListingPricePerSqft_SingleFamilyResidence',
    'MedianListingPricePerSqft_CondoCoop',
    'MedianListingPrice_SingleFamilyResidence',
    'MedianListingPrice_CondoCoop',
    'InventoryRaw_AllHomes',
]

# Only load columns that exist
df = pd.read_csv(
    '/Users/aryan/Desktop/brickfi/data/raw/zillow/City_time_series.csv',
    usecols=lambda c: c in cols,
    low_memory=False
)

print(f"✅ Loaded {len(df)} rows")

# Get latest record per city
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df = df.dropna(subset=['Date'])
df = df.sort_values('Date').groupby('RegionName').last().reset_index()
print(f"✅ {len(df)} unique cities after getting latest record")

# Merge with crosswalk
df = df.merge(cross, left_on='RegionName', right_on='city_id', how='inner')
print(f"✅ {len(df)} cities matched with crosswalk")

# Rename columns
df = df.rename(columns={
    'Date': 'date',
    'MedianListingPrice_AllHomes': 'medianPrice',
    'MedianListingPrice_1Bedroom': 'price_1bed',
    'MedianListingPrice_2Bedroom': 'price_2bed',
    'MedianListingPrice_3Bedroom': 'price_3bed',
    'MedianListingPrice_4Bedroom': 'price_4bed',
    'MedianListingPricePerSqft_AllHomes': 'pricePerSqft',
    'MedianListingPricePerSqft_1Bedroom': 'pricePerSqft_1bed',
    'MedianListingPricePerSqft_2Bedroom': 'pricePerSqft_2bed',
    'MedianListingPricePerSqft_3Bedroom': 'pricePerSqft_3bed',
    'MedianListingPricePerSqft_SingleFamilyResidence': 'pricePerSqft_sfr',
    'MedianListingPricePerSqft_CondoCoop': 'pricePerSqft_condo',
    'MedianListingPrice_SingleFamilyResidence': 'price_sfr',
    'MedianListingPrice_CondoCoop': 'price_condo',
    'InventoryRaw_AllHomes': 'inventory',
})

# Keep only useful columns
keep = ['city', 'county', 'state', 'date', 'medianPrice', 
        'price_1bed', 'price_2bed', 'price_3bed', 'price_4bed',
        'pricePerSqft', 'pricePerSqft_1bed', 'pricePerSqft_2bed',
        'pricePerSqft_3bed', 'pricePerSqft_sfr', 'pricePerSqft_condo',
        'price_sfr', 'price_condo', 'inventory']

df_clean = df[[c for c in keep if c in df.columns]]
df_clean = df_clean.where(pd.notnull(df_clean), None)

print(f"📊 Final dataset: {len(df_clean)} cities")
print(df_clean[df_clean['state'] == 'NY'].head(3))

# Insert into MongoDB
records = df_clean.to_dict('records')
collection.delete_many({})
print("🗑️  Cleared existing city data")

batch_size = 500
total = 0
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    collection.insert_many(batch)
    total += len(batch)
    print(f"⬆️  Inserted {total}/{len(records)}...")

print(f"\n🎉 Done! {total} cities loaded into MongoDB")

# Verify
sample = collection.find_one({'state': 'NY'}, {'_id': 0})
if sample:
    print(f"\n✅ Sample NY city: {sample}")

client.close()