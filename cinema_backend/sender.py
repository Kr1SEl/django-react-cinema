import smtplib
import requests
from email.message import EmailMessage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
import environ
import os

env = environ.Env()
environ.Env.read_env()


def get_qr_code(ticket_id):
    url = f"http://localhost:8080/tickets/qr/{ticket_id}"
    payload = {}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    return response.content


def send_email(to_email, movie_name, seat, session_datetime, ticket_id):
    from_email = env('EMAIL_HOST_USER')
    password = env('EMAIL_HOST_PASSWORD')

    msg = MIMEMultipart()
    msg['Subject'] = f'Upcoming Cinema Session: {movie_name}'
    msg['From'] = from_email
    msg['To'] = to_email

    body = f'''
    Dear Customer,

    Thank you for booking a seat for "{movie_name}".

    Details of your upcoming cinema session:
    - Movie: {movie_name}
    - Seat: {seat}
    - Date and Time: {session_datetime}

    Please find the attached QR code for your booking.

    Best regards,
    The Wroclaw Cinema Team
    '''
    msg.attach(MIMEText(body, 'plain'))

    img_data = get_qr_code(ticket_id)

    image = MIMEImage(img_data, name="qr_code.png")
    msg.attach(image)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, password)
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()
    except Exception as e:
        print(f'Error: {e}')
