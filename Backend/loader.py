import os
from dotenv import load_dotenv, dotenv_values

def loadenv():
    
    load_dotenv()
    return {
        'database': os.getenv("DATABASE"),
        'user': os.getenv("USER"),
        'password': os.getenv("PASSWORD"),
        'host': os.getenv("HOST"),
        'port': os.getenv("PORT")
    }
