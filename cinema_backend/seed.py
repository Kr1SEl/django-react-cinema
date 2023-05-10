import requests
import json
import os
import random
from dotenv import load_dotenv
from datetime import datetime
from datetime import timedelta

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


def create__moviesession(token, start_time, hall_id):
    print(start_time)
    url = "http://127.0.0.1:8000/api/v1/movie-session/"
    movie = random.randint(1, 3)
    price = random.randint(50, 90)
    payload = json.dumps({
        "movie_id": movie,
        "hall_number": hall_id,
        "starting_date": start_time.date().isoformat(),
        "starting_time": start_time.time().strftime('%H:%M:%S'),
        "ticket_price": price})
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code != 200:
        print('error')
        print(response.json())
    return response


def seed(token):
    time_now = datetime.now()
    create__moviesession(token, time_now+timedelta(hours=1), 1)
    create__moviesession(token, time_now+timedelta(hours=4.1), 1)
    create__moviesession(token, time_now+timedelta(hours=1.5), 2)
    create__moviesession(token, time_now+timedelta(hours=7), 2)
    create__moviesession(token, time_now+timedelta(hours=1.5), 3)
    create__moviesession(token, time_now+timedelta(hours=5), 3)


if __name__ == '__main__':
    token = get_superuser_token()
    seed(token)
