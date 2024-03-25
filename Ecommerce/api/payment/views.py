from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
import braintree
from rest_framework.response import Response
from django.utils.decorators import method_decorator

# Create your views here.



gateway = braintree.BraintreeGateway(
  braintree.Configuration(
      braintree.Environment.Sandbox,
      merchant_id="xg86c9cdjqpnz2r5",
      public_key="4y7vz96wdmkswn7y",
      private_key="ca613df9574bb575c09c97cb4b774c5f"
  )
)


def validate_user_session(id, token):
    UserModel = get_user_model()
    try: 
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False
    

@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error':'Invalid session, Please login again'})
    
    return JsonResponse({'clientToken': gateway.client_token.generate(), 'success': True})


@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error':'Invalid session, Please login again'})
    
    nonce_from_the_client = request.POST["PaymentMethodNonce"]
    amount_from_the_client = request.POST["amount"]

    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
        "submit_for_settlement": True
        }
    })

    if result.is_success:
        return JsonResponse({
            "success":result.is_success, "transaction":{'id': result.transaction.id, 'amount': result.transaction.amount}})
    else:
        return JsonResponse({'error':True, 'success':False})

@method_decorator(csrf_exempt, name='dispatch')
class PaymentView(APIView):
    permission_classes = []
    def get(self, request):
        data = {
            'message': "payment successfull",
            'status': 'success'
        }
        return Response(data)
        