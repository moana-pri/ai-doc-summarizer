#!/usr/bin/env python3
"""
Simple script to start the Django server with error handling
"""

import os
import sys
import django
from django.core.management import execute_from_command_line

def main():
    """Start the Django server"""
    print("🚀 Starting Django Server...")
    print("=" * 50)
    
    # Set up Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
    
    try:
        django.setup()
        print("✅ Django setup completed")
    except Exception as e:
        print(f"❌ Django setup failed: {e}")
        return
    
    # Start the server
    try:
        print("🌐 Starting server on http://127.0.0.1:8000/")
        print("📋 Available endpoints:")
        print("   - API Root: http://127.0.0.1:8000/")
        print("   - Health Check: http://127.0.0.1:8000/api/health/")
        print("   - Documents: http://127.0.0.1:8000/api/documents/")
        print("   - Analytics: http://127.0.0.1:8000/api/analytics/")
        print("   - Admin: http://127.0.0.1:8000/admin/")
        print("=" * 50)
        print("Press Ctrl+C to stop the server")
        print("=" * 50)
        
        # Start the server
        execute_from_command_line(['manage.py', 'runserver', '127.0.0.1:8000'])
        
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server failed to start: {e}")

if __name__ == "__main__":
    main()
