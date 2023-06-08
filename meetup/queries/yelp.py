import requests
import os

class YelpCalls:
    def get_single_location(self, location: str):
        yelp_url = "https://api.yelp.com/v3/businesses/search"
        key = os.environ["YELP_API_KEY"]
        params = {
            "location": "Los Angeles",
            "term": location,
        }
        headers = {
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        }
        response = requests.get(yelp_url, params=params, headers=headers)
        data = response.json()
        print(data["businesses"][0]["image_url"])
        return data["businesses"][0]["image_url"]


    def get_location_list(self, city: str, state: str):
        yelp_url = "https://api.yelp.com/v3/businesses/search"
        key = os.environ["YELP_API_KEY"]
        params = {
            "location": f"{city}, {state}",
            "term": "entertainment",
            "sort_by": "distance",
        }
        headers = {
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        }
        response = requests.get(yelp_url, params=params, headers=headers)
        data = response.json()
        return data
