# WroclawCinema

Description:
WroclawCinema, a state-of-the-art cinema platform, seamlessly merges the realms of technology and entertainment. Crafted with Django for the backend, React with MaterialUI for the frontend, and driven by MySQL as the database, WroclawCinema offers a holistic cinematic experience for both registered users and quick-ticket buyers.

User Features:
1. User Authorization: Create an account or log in securely for a personalized experience, managing bookings and special offers.
2. Seat Selection: Enjoy an interactive seat selection interface, allowing users to choose preferred seats for upcoming movie sessions.
3. Filtering Options: Easily find movies using advanced filtering options such as genre or movie name.
4. Special Offers: Stay updated with exclusive special offers, discounts, and loyalty programs for an enhanced cinema experience.
5. Great UI: Immerse yourself in a visually appealing and user-friendly interface, designed with React and MaterialUI for a modern and responsive experience.
6. Fast Ticket Purchase: For non-registered users, quickly purchase tickets by entering an email address. Tickets are swiftly delivered to the provided email for a seamless movie-going experience.

Staff Features:
1. Admin Panel: Efficiently manage users, movie sessions, and cinema operations with a robust admin panel.
2. Ticket Validation Microservice: Utilize the SpringBoot-based microservice for ticket validation. Staff can scan QR codes to check previous validations and obtain information about ticket holders and associated movie sessions.

Technology Stack:
1. Backend Framework: Django
2. Frontend Library: React with MaterialUI
3. Database: MySQL
4. Microservice: SpringBoot (Ticket Validation)
5. Email Delivery: SMTP

[Ticket Validation System](https://github.com/Alexei-Savich/ticket-validation-system/tree/dev)

## Instalation Guide

```
pip install -r requirements.txt
```

### To prepare set of database migrations to perform

```
python manage.py makemigrations
```

### To perform prepared migrations to the dataset

```
python manage.py migrate
```

### To create the first admin the the most powerful user of the app

```
python manage.py createsuperuser
```

### To clear database

```
python manage.py flush
```

### To remove all .py files from migraions folder

```
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
```

### To remove all .pyc files from migraions folder

```
find . -path "*/migrations/*.pyc" -delete
```

### Execute Django App

```
python manage.py runserver
```

Runs the django app with react frontend.
Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to view it in your browser.

### Execute React App

```
npm run dev
```
