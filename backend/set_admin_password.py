#!/usr/bin/env python3
"""
Script to set admin password
"""

import os
import django
import sys

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from django.contrib.auth.models import User

def set_admin_password():
    """Set admin password"""
    try:
        # Get the admin user
        admin_user = User.objects.get(username='admin')
        
        # Set a simple password
        admin_user.set_password('admin123')
        admin_user.save()
        
        print("✅ Admin password set successfully!")
        print("Username: admin")
        print("Password: admin123")
        print("\nYou can now login at: http://127.0.0.1:8000/admin/")
        
    except User.DoesNotExist:
        print("❌ Admin user not found. Creating one...")
        admin_user = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='admin123',
            is_staff=True,
            is_superuser=True
        )
        print("✅ Admin user created successfully!")
        print("Username: admin")
        print("Password: admin123")
        print("\nYou can now login at: http://127.0.0.1:8000/admin/")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    set_admin_password()
