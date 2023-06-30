import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file in the root directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
# Load environment variables from .env file

key = os.environ["YELP_API_KEY"]

class YelpCalls:
    def get_location_list(self, city: str, term: str):
        yelp_url = "https://api.yelp.com/v3/businesses/search"
        params = {
            "location": city,
            "term": term,
            "sort_by": "distance",
            "limit": 20
        }
        headers = {
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        }
        response = requests.get(yelp_url, params=params, headers=headers)
        data = response.json()
        return data
