from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    title_np = models.CharField(max_length=200, blank=True, null=True)
    content_np = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    title_np = models.CharField(max_length=100, blank=True, null=True)
    description_np = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, help_text="FontAwesome icon class")
    
    def __str__(self):
        return self.title
