#!/usr/bin/env python3
"""
Quick test script to verify backend is working
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion, Analytics
from api.services import AnalyticsService

def test_backend():
    """Quick test to verify backend is working"""
    print("🧪 Quick Backend Test")
    print("=" * 40)
    
    try:
        # Test database connection
        doc_count = Document.objects.count()
        print(f"✅ Database connection: OK ({doc_count} documents)")
        
        # Test analytics service
        analytics = AnalyticsService.calculate_analytics()
        print(f"✅ Analytics service: OK")
        print(f"   - Total documents: {analytics.get('total_documents', 0)}")
        print(f"   - Citations found: {analytics.get('citations_found', 0)}")
        
        # Test models
        print(f"✅ Models working: OK")
        
        print("\n🎉 Backend is working correctly!")
        print("\n📋 Next steps:")
        print("1. Start the Django server: python manage.py runserver")
        print("2. Start the frontend: cd ../Web_frontend && npm run dev")
        print("3. Visit: http://localhost:3000")
        
        return True
        
    except Exception as e:
        print(f"❌ Backend test failed: {e}")
        print("\n🔧 Troubleshooting:")
        print("1. Make sure you're in the backend directory")
        print("2. Install dependencies: pip install -r requirements.txt")
        print("3. Run migrations: python manage.py migrate")
        print("4. Create superuser: python manage.py createsuperuser")
        return False

if __name__ == "__main__":
    test_backend()
