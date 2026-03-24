import requests

# We will query the universities API to find exact names, then query reviews
res = requests.get("http://localhost:3005/api/universities?limit=100")
unis = res.json().get('universities', [])

print("--- University API inspection ---")
for uni in unis:
    name = uni.get('name')
    if any(n in name for n in ['Air', 'Bahria', 'CUST', 'FAST', 'GIKI', 'Capital']):
        print(f"Name: '{name}'")
        print(f"apiName: '{uni.get('apiName')}'")
        
        # Now query reviews
        try:
            r_res = requests.get(f"http://localhost:3005/api/reviews/university/{name}")
            reviews = r_res.json().get('data', [])
            job_support = [r for r in reviews if r.get('factor') == 'Job Support']
            print(f"  -> Found {len(job_support)} Job Support reviews using '{name}'")
        except:
            pass
            
        try:
            r_res2 = requests.get(f"http://localhost:3005/api/reviews/university/{uni.get('apiName')}")
            reviews2 = r_res2.json().get('data', [])
            job_support2 = [r for r in reviews2 if r.get('factor') == 'Job Support']
            print(f"  -> Found {len(job_support2)} Job Support reviews using apiName '{uni.get('apiName')}'")
        except:
            pass
        print()
