from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=50)
    description =  models.CharField(max_length=500)
    add_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name