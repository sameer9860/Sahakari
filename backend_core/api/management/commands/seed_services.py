from django.core.management.base import BaseCommand
from api.models import Service

class Command(BaseCommand):
    help = 'Seeds the database with default services'

    def handle(self, *args, **kwargs):
        services = [
            {"icon": "💰", "title": "Savings Schemes", "description": "Secure your future with our attractive saving plans."},
            {"icon": "🤝", "title": "Loan Services", "description": "Fair loans for agriculture and business."},
            {"icon": "📱", "title": "Mobile Banking", "description": "Bank on the go with our secure mobile app."},
            {"icon": "🌍", "title": "Remittance", "description": "Fast and reliable money transfer services."},
            {"icon": "🎓", "title": "Scholarships", "description": "Supporting education for member's children."},
            {"icon": "🌾", "title": "Agriculture Support", "description": "Providing seeds, fertilizers, and market access."},
        ]

        for svc in services:
            Service.objects.get_or_create(
                title=svc['title'],
                defaults={
                    'icon': svc['icon'],
                    'description': svc['description']
                }
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded services'))
