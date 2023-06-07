import requests
import os

key = os.environ["YELP_API_KEY"]


class YelpCalls:
    def get_single_location(self, city: str, location: str):
        yelp_url = "https://api.yelp.com/v3/businesses/search"
        params = {
            "location": city,
            "term": location
        }
        headers = {
            "Authoriztion": f"Bearer {key}",
            "Content-Type": "application/json",
        }
        response = requests.get(yelp_url, params=params, headers=headers)
        data = respo
