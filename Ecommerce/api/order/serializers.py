from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ('id','user','product_names','total_products','total_amount','transaction_id','created_at','updated_at')