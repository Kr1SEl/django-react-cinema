import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()


def get_superuser_token():
    url = "http://127.0.0.1:8000/auth/jwt/create"
    payload = json.dumps({
        "email": os.getenv('SUPERUSER_LOGIN'),
        "password": os.getenv('SUPERUSER_PASSWORD')})
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()['access']


def create__moviesession(token):
    url = "http://127.0.0.1:8000/api/v1/movie-session/"
    payload = json.dumps({
        "movie_id": 1,
        "hall_number": 2,
        "starting_date": "2023-04-07",
        "starting_time": "12:00:00"
    })
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    print(headers)

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)


if __name__ == '__main__':
    print(create__moviesession(get_superuser_token()))
