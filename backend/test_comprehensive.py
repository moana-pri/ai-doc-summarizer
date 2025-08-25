#!/usr/bin/env python3
"""
Comprehensive test script to verify all fixes
"""

import os
import sys
import django
import requests
import json

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.services import ConferenceSuggestionService, GeminiService, CopyleaksService
from api.models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion

def test_ml_models():
    """Test ML model integration"""
    print("🧪 Testing ML Models Integration")
    print("-" * 40)
    
    try:
        conference_service = ConferenceSuggestionService()
        test_text = "This paper presents a novel database management system for handling large-scale distributed data processing."
        
        suggestions = conference_service.suggest_conferences(test_text, top_k=3)
        print(f"✅ ML Models loaded successfully")
        print(f"✅ Conference suggestions generated: {len(suggestions)}")
        
        for i, suggestion in enumerate(suggestions, 1):
            print(f"  {i}. {suggestion['conference_name']} (Score: {suggestion['confidence_score']:.3f})")
        
        return True
    except Exception as e:
        print(f"❌ ML Models test failed: {e}")
        return False

def test_gemini_api():
    """Test Gemini API handling"""
    print("\n🧪 Testing Gemini API Handling")
    print("-" * 40)
    
    try:
        gemini_service = GeminiService()
        test_text = "This is a test document for summarization."
        
        summary = gemini_service.generate_summary(test_text, 50)
        print(f"✅ Gemini API working: Summary generated ({len(summary)} chars)")
        return True
    except Exception as e:
        print(f"⚠️  Gemini API issue (expected if not configured): {e}")
        print("   This is normal if the API key is not set or API is disabled")
        return False

def test_plagiarism_service():
    """Test plagiarism detection service"""
    print("\n🧪 Testing Plagiarism Detection")
    print("-" * 40)
    
    try:
        copyleaks_service = CopyleaksService()
        test_text = "This is a test document for plagiarism detection."
        
        result = copyleaks_service.check_plagiarism(test_text, "test_doc")
        print(f"✅ Plagiarism detection working")
        print(f"   Similarity: {result['similarity_percentage']}%")
        print(f"   Sources found: {len(result['matched_sources'])}")
        return True
    except Exception as e:
        print(f"❌ Plagiarism detection failed: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints"""
    print("\n🧪 Testing API Endpoints")
    print("-" * 40)
    
    base_url = "http://127.0.0.1:8000/api"
    endpoints = [
        "/health/",
        "/analytics/",
        "/documents/"
    ]
    
    all_working = True
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{base_url}{endpoint}")
            if response.status_code == 200:
                print(f"✅ {endpoint} - Working")
            else:
                print(f"❌ {endpoint} - Status: {response.status_code}")
                all_working = False
        except requests.exceptions.ConnectionError:
            print(f"❌ {endpoint} - Connection failed (server not running)")
            all_working = False
        except Exception as e:
            print(f"❌ {endpoint} - Error: {e}")
            all_working = False
    
    return all_working

def test_database_models():
    """Test database models and relationships"""
    print("\n🧪 Testing Database Models")
    print("-" * 40)
    
    try:
        # Test document creation
        doc = Document.objects.create(
            name="test_document.txt",
            file_type="txt",
            size=1024,
            processed=True
        )
        print(f"✅ Document created: {doc.id}")
        
        # Test summary creation
        summary = Summary.objects.create(
            document=doc,
            content="This is a test summary",
            word_count=5
        )
        print(f"✅ Summary created: {summary.id}")
        
        # Test citation creation
        citation = Citation.objects.create(
            document=doc,
            text="Test citation",
            source="Test source",
            confidence=0.9
        )
        print(f"✅ Citation created: {citation.id}")
        
        # Test plagiarism check creation
        plagiarism = PlagiarismCheck.objects.create(
            document=doc,
            similarity_percentage=15.5,
            matched_sources=[],
            status="completed"
        )
        print(f"✅ Plagiarism check created: {plagiarism.id}")
        
        # Test conference suggestion creation
        conference = ConferenceSuggestion.objects.create(
            document=doc,
            conference_name="TEST_CONF",
            confidence_score=0.85,
            reasoning="Test reasoning"
        )
        print(f"✅ Conference suggestion created: {conference.id}")
        
        # Test relationships
        print(f"✅ Document has {doc.summaries.count()} summaries")
        print(f"✅ Document has {doc.citations.count()} citations")
        print(f"✅ Document has {doc.plagiarism_checks.count()} plagiarism checks")
        print(f"✅ Document has {doc.conference_suggestions.count()} conference suggestions")
        
        # Cleanup
        doc.delete()
        print("✅ Test data cleaned up")
        
        return True
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting Comprehensive Test Suite")
    print("=" * 50)
    
    results = {
        "ML Models": test_ml_models(),
        "Gemini API": test_gemini_api(),
        "Plagiarism Detection": test_plagiarism_service(),
        "API Endpoints": test_api_endpoints(),
        "Database Models": test_database_models()
    }
    
    print("\n📊 Test Results Summary")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your system is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the output above for details.")
    
    print("\n💡 Next Steps:")
    print("1. If ML Models failed: Check Conference_models folder exists")
    print("2. If Gemini API failed: Set GOOGLE_GEMINI_API_KEY in .env")
    print("3. If API Endpoints failed: Start Django server with 'python manage.py runserver'")
    print("4. If Database failed: Run 'python manage.py migrate'")

if __name__ == "__main__":
    main()
