from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import random
import re



# Create your views here.

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length) )

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid parameter only'})
    
    username = request.POST['email']
    password = request.POST['password']

    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if not re.match(email_regex, username):
        return JsonResponse({'error': 'Enter a valid email'})   
      
    UserModel = get_user_model()


    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            usr_dict = UserModel.objects.filter(email=username).values().first() 
            usr_dict.pop('password')

            if user.session_token != "0":   
                user.session_token = "0"
                user.save()
            
            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user':usr_dict})
        else:
            return JsonResponse({'error': 'Wrong Password!'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid Email'})
    

def signout(request, id):
    logout(request)
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:  
        return JsonResponse({'error':'Invalid user ID'})
    
    return JsonResponse({'success':'Logout success'})
    
        
class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create':[AllowAny]}

    queryset=CustomUser.objects.all().order_by('id')
    serializer_class= UserSerializer
    def get_permissions(self):
        action =self.action

        if action in self.permission_classes_by_action:
            return [permission() for permission in self.permission_classes_by_action[action]]
        else:
            return[AllowAny()]