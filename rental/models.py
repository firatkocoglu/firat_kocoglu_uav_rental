from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

#DEFINE CATEGORIES FOR UAV'S
class Category(models.Model):
    category = models.CharField(max_length=255, db_index=True)
    
    def __str__(self):
        return self.category

#DEFINE UAV FEATURES
class UAV(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    weight = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    
    def __str__(self):
        return self.brand + ' ' + self.title
    

#DEFINE UAV RENTAL RECORD DETAILS
class Rental(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uav = models.ForeignKey(UAV, on_delete=models.PROTECT)
    date = models.DateTimeField(default=now)
    total = models.DecimalField(max_digits=8, decimal_places=2)
    
    def __str__(self):
        return self.user + ' ' + self.uav