from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

from bson.codec_options import CodecOptions
from bson.binary import UuidRepresentation

client = MongoClient(DATABASE_URL, uuidRepresentation='standard')
db = client.get_database(os.getenv("DATABASE_NAME", "ai-contract-review"))