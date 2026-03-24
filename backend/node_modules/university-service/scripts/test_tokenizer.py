import os
import traceback
from transformers import AutoTokenizer

if __name__ == "__main__":
    hf_token = os.getenv('HF_TOKEN')
    try:
        AutoTokenizer.from_pretrained('AbdullahGhani/NewFYPmodel_univerity', token=hf_token)
        print("Success")
    except Exception as e:
        traceback.print_exc()
