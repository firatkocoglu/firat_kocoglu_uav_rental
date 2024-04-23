from rest_framework import serializers
from .models import Category, UAV, Rental
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category']
        
class UAVSerializer(serializers.ModelSerializer):   
    #USERS SHOULD ONLY TYPE CATEGORY ID TO LINK AN UAV TO A CATEGORY
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = UAV
        fields = ['id', 'category_id', 'category', 'brand', 'model', 'weight', 'altitude', 'height', 'length', 'payload_capacity']

class RentalSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)
    
    uav = UAVSerializer(read_only=True)
    uav_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Rental
        fields = ['id', 'user_id', 'user', 'uav_id', 'uav', 'date']