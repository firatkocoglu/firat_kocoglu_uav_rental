from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend


#IMPORT MODELS AND SERIALIZERS
from .models import Category, UAV, Rental
from . serializers import (CategorySerializer, UAVSerializer, RentalSerializer)


# SESSION BASED AUTHENTICATION VIEWS - LOGIN AND LOGOUT USER
@api_view(["POST"])
@ensure_csrf_cookie
def login_view(request):
    print(request)
    # EXTRACT USERNAME AND PASSWORD FROM THE REQUEST
    username = request.data["username"]
    password = request.data["password"]

    # IF USER DOESN'T PROVIDE HIS/HER USERNAME OR PASSWORD
    if not username:
        return Response(
            {"detail": "Please provide a username."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not password:
        return Response(
            {"detail": "Please provide your password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # AUTHENTICATE USER WITH GIVEN CREDENTIALS
    user = authenticate(username=username, password=password)

    # IF USER CANNOT BE AUTHENTICATED
    if not user:
        return Response(
            {"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
        )

    login(request, user)
    return Response({"detail": "Successfully logged in."}, status=status.HTTP_200_OK)


@api_view(["GET"])
def logout_view(request):
    # IF UNAUTHENTICATED USERS REQUEST TO LOGOUT
    if not request.user.is_authenticated:
        return Response(
            {"detail": "Not authorized."}, status=status.HTTP_401_UNAUTHORIZED
        )

    logout(request)
    return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)

#MODEL VIEWSET TO LIST, ADD, UPDATE AND DELETE CATEGORIES
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter,)
    filterset_fields = ['category']
    search_fields = ['category']

#MODEL VIEWSET TO LIST, ADD, UPDATE AND DELETE UAV'S
class UAVViewSet(ModelViewSet):
    queryset = UAV.objects.order_by('id')
    serializer_class = UAVSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
    )
    
    filterset_fields = ['category__id', 'brand', 'model']
    search_fields = (
        'category__category',
        'brand',
        'model',
    )
    
    
#MODEL VIEWSET TO LIST, ADD, UPDATE AND DELETE RENTALS
class RentalViewSet(ModelViewSet):
    queryset = Rental.objects.order_by('id')
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
    )
    
    filterset_fields = ['uav__model', 'user__username']
    search_fields = ('uav__brand', 'uav__model', 'user__username')
    
    def create(self, request):
        ##WE OBTAIN UAV ID FROM USER AND USER INFO FROM CSRF TOKEN SENT BY BROWSER
        rental_data = {'uav_id': request.data['uav_id'], 'user_id': request.user.id}
        serialized_rental = RentalSerializer(data=rental_data)
        serialized_rental.is_valid(raise_exception=True)
        serialized_rental.save()
        return Response(serialized_rental.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, pk):
        rental = get_object_or_404(Rental, id=pk)
        
        ##WE ONLY WANT USERS TO UPDATE THEIR OWN RENTALS 
        if rental.user.id == request.user.id:
            serialized_rental = RentalSerializer(rental, request.data, partial=True)
            serialized_rental.is_valid(raise_exception=True)
            self.perform_update(serialized_rental)
            return Response(serialized_rental.data, status=status.HTTP_200_OK)
        else: 
             return Response(
                {"detail": "You do not have permission to do this action."},
                status=status.HTTP_403_FORBIDDEN
            )
    
    def destroy(self,request,pk):
        rental = get_object_or_404(Rental, id=pk)
        
        ##WE ONLY WANT USERS TO DELETE THEIR OWN RENTALS
        if rental.user.id == request.user.id:
            self.perform_destroy(rental)
            return Response(
                {'detail': 'Rental successfully deleted.'}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "You do not have permission to do this action."},
                status=status.HTTP_403_FORBIDDEN,
            )
            