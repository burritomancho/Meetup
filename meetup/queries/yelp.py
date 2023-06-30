import requests
import os

class YelpCalls:
    def get_single_location(self, city: str, term: str):
        yelp_url = "https://api.yelp.com/v3/businesses/search"
        key = os.environ["YELP_API_KEY"]
        params = {
            "location": city,
            "term": term,
            "sort_by": "distance",
            "limit": 20
        }
        headers = {
            "Authoriztion": f"Bearer {key}",
            "Content-Type": "application/json",
        }
        response = requests.get(yelp_url, params=params, headers=headers)
        data = response.json()
        return data
