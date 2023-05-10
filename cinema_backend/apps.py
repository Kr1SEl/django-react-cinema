from django.apps import AppConfig
from .helper import ping_spring_server


class CinemaBackendConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "cinema_backend"

    def ready(self):
        ping_spring_server()
