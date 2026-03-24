import pandas as pd
import json

df = pd.read_csv('training_data_with_job_support.csv')
all_factors = ['Overall', 'Faculty', 'Campus', 'Labs', 'Cafeteria', 'Management', 'Sports', 'Hostels', 'Resources', 'Job Support', 'Events']

unis = df['university'].unique()
missing_data = []

print('--- MISSING FACTORS FOR ALL UNIVERSITIES ---')
for uni in unis:
    uni_df = df[df['university'] == uni]
    present_factors = uni_df['factor'].unique()
    missing = [f for f in all_factors if f not in present_factors]
    if missing:
        missing_data.append(f"{str(uni).strip()} ({len(uni_df)} total reviews):\\n  Missing: {', '.join(missing)}\\n")

with open('missing_factors_all.txt', 'w', encoding='utf-8') as f:
    f.writelines(missing_data)

print(f"Analysis complete. Found missing factors for {len(missing_data)} universities. Saved to missing_factors_all.txt")
