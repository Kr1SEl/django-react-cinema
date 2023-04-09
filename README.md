# Install Required Modules

```
pip install -r requirements.txt
```

## Start Application

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

In other terminal open **\*cinema_react** \*as a working folder and run this command, to start dev branch on React
