from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from .import views


urlpatterns = [
    path('category/', include('api.category.urls')),
    path('product/', include('api.product.urls')),
    path('user/', include('api.user.urls')),
    path('order/', include('api.order.urls')),
    path('payment/', include('api.payment.urls')),
    path('sendmail/', views.send_email, name='sendmail' )
]