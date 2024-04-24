# Generated by Django 5.0.4 on 2024-04-23 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rental', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rental',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=12),
        ),
        migrations.AlterField(
            model_name='uav',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]