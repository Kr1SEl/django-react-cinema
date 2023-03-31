from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('cinema_backend.urls')),
    path('users/', include('django.contrib.auth.urls')),
    path('users/', include('cinema_users.urls'))
]
