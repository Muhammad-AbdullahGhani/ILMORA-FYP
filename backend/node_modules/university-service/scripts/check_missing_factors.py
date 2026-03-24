import pandas as pd

df = pd.read_csv('training_data_with_job_support.csv')
all_factors = ['Overall', 'Faculty', 'Campus', 'Labs', 'Cafeteria', 'Management', 'Sports', 'Hostels', 'Resources', 'Job Support', 'Events']

unis = [
    'Air University',
    'Bahria University',
    'COMSAT',
    'National University Of Computer And Emerging Sciences',
    'Capital University',
    'FAST'
]

print('--- MISSING FACTORS PER UNIVERSITY ---')
for uni in df['university'].unique():
    uni_str = str(uni)
    if any(name.lower() in uni_str.lower() for name in unis):
        uni_df = df[df['university'] == uni_str]
        present = uni_df['factor'].unique()
        missing = [f for f in all_factors if f not in present]
        print(f"{uni_str.strip()}: {len(uni_df)} reviews")
        print(f"  Missing: {', '.join(missing)}")
