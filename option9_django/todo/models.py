from django.db import models

class Todo(models.Model):
	text = models.CharField(max_length = 300)
	done = models.BooleanField(default = False)
	order = models.IntegerField(null=True)

