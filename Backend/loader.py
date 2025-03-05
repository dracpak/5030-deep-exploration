"""
This is the .env loader for db_connector
"""
import os
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
