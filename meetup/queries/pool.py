import os
import pymongo


conn = pymongo.MongoClient(os.environ.get("DATABASE_URL"))
