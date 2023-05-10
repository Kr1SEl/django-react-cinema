import base64
import requests
from django.core.files.base import ContentFile


def image_file_to_base64(image):
    with open(image.path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read())
    return encoded_image.decode('utf-8')


def ping_spring_server():
    url = "http://localhost:8080/tickets/tickets/email/"

    payload = {}
    headers = {
        'Cookie': 'JSESSIONID=73B5F6375C394E2019D25C951DDFDA45'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
