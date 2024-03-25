# Generated by Django 5.0.1 on 2024-02-22 06:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_names', models.CharField(max_length=500)),
                ('total_products', models.CharField(default=0, max_length=500)),
                ('transaction_id', models.CharField(default=0, max_length=150)),
                ('total_amount', models.CharField(default=0, max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.customuser')),
            ],
        ),
    ]