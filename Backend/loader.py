"""
This is the .env loader for db_connector
"""
import os
import json
from dotenv import load_dotenv

def loadenv():
    """
    .env loader function
    """
    load_dotenv()
    return {
        'database': os.getenv("DATABASE"),
        'user': os.getenv("USER"),
        'password': os.getenv("PASSWORD"),
        'host': os.getenv("HOST"),
        'port': os.getenv("PORT")
    }

def load_json(filepath):
    """
    .json loader function
    """
    try:
        with open(filepath, 'rt', encoding='utf-8') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f'Error: File not found at path: {filepath}')
        return None
    except json.JSONDecodeError:
        print(f'Error: Invalid JSON format in file: {filepath}')
        return None
