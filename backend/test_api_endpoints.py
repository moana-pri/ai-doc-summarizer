#!/usr/bin/env python3
"""
Comprehensive API endpoint testing script
"""

import os
import sys
import django
import requests
import json
import time

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion
from api.services import GeminiService, ConferenceSuggestionService

def test_api_endpoints():
    """Test all API endpoints"""
    base_url = "http://127.0.0.1:8000/api"
    
    print("🧪 Testing API Endpoints")
    print("=" * 50)
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health/")
        print(f"✅ Health check: {response.status_code}")
        if response.status_code == 200:
            print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
    
    # Test analytics endpoint
    try:
        response = requests.get(f"{base_url}/analytics/")
        print(f"✅ Analytics: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Total documents: {data.get('total_documents', 0)}")
            print(f"   Citations found: {data.get('citations_found', 0)}")
            print(f"   Conferences matched: {data.get('conferences_matched', 0)}")
    except Exception as e:
        print(f"❌ Analytics failed: {e}")
    
    # Test documents endpoint
    try:
        response = requests.get(f"{base_url}/documents/")
        print(f"✅ Documents list: {response.status_code}")
        if response.status_code == 200:
            documents = response.json()
            print(f"   Found {len(documents)} documents")
            if documents:
                doc_id = documents[0]['id']
                print(f"   First document ID: {doc_id}")
                
                # Test document results
                response = requests.get(f"{base_url}/documents/{doc_id}/")
                print(f"✅ Document results: {response.status_code}")
                if response.status_code == 200:
                    doc_data = response.json()
                    print(f"   Has summaries: {len(doc_data.get('summaries', []))}")
                    print(f"   Has citations: {len(doc_data.get('citations', []))}")
                    print(f"   Has plagiarism checks: {len(doc_data.get('plagiarism_checks', []))}")
                    print(f"   Has conference suggestions: {len(doc_data.get('conference_suggestions', []))}")
                    print(f"   Plagiarism score: {doc_data.get('plagiarismScore', 'N/A')}")
    except Exception as e:
        print(f"❌ Documents test failed: {e}")

def test_services():
    """Test individual services"""
    print("\n🧪 Testing Services")
    print("=" * 50)
    
    # Test Gemini service
    try:
        gemini_service = GeminiService()
        test_text = "This is a test document for summarization and citation detection."
        
        # Test summary generation
        summary = gemini_service.generate_summary(test_text, 50)
        print(f"✅ Summary generated: {len(summary)} characters")
        print(f"   Preview: {summary[:100]}...")
        
        # Test citation detection
        citations = gemini_service.detect_citations(test_text)
        print(f"✅ Citations detected: {len(citations)}")
        for i, citation in enumerate(citations[:3], 1):
            print(f"   {i}. {citation.get('text', 'N/A')[:50]}...")
            
    except Exception as e:
        print(f"❌ Gemini service failed: {e}")
    
    # Test conference service
    try:
        conference_service = ConferenceSuggestionService()
        test_text = "This paper presents a novel database management system for handling large-scale distributed data processing."
        
        suggestions = conference_service.suggest_conferences(test_text, 3)
        print(f"✅ Conference suggestions: {len(suggestions)}")
        for i, suggestion in enumerate(suggestions, 1):
            print(f"   {i}. {suggestion['conference_name']} (Score: {suggestion['confidence_score']:.3f})")
            
    except Exception as e:
        print(f"❌ Conference service failed: {e}")

def test_database_data():
    """Test database data"""
    print("\n🧪 Testing Database Data")
    print("=" * 50)
    
    try:
        # Check documents
        documents = Document.objects.all()
        print(f"✅ Documents in database: {documents.count()}")
        
        if documents.exists():
            doc = documents.first()
            print(f"   Latest document: {doc.name}")
            print(f"   Processed: {doc.processed}")
            
            # Check summaries
            summaries = doc.summaries.all()
            print(f"   Summaries: {summaries.count()}")
            if summaries.exists():
                print(f"   Latest summary: {summaries.latest('generated_at').content[:100]}...")
            
            # Check citations
            citations = doc.citations.all()
            print(f"   Citations: {citations.count()}")
            
            # Check plagiarism checks
            plagiarism_checks = doc.plagiarism_checks.all()
            print(f"   Plagiarism checks: {plagiarism_checks.count()}")
            if plagiarism_checks.exists():
                latest = plagiarism_checks.latest('checked_at')
                print(f"   Latest similarity: {latest.similarity_percentage}%")
            
            # Check conference suggestions
            conference_suggestions = doc.conference_suggestions.all()
            print(f"   Conference suggestions: {conference_suggestions.count()}")
            if conference_suggestions.exists():
                for suggestion in conference_suggestions[:3]:
                    print(f"   - {suggestion.conference_name} (Score: {suggestion.confidence_score:.3f})")
        else:
            print("   No documents found in database")
            
    except Exception as e:
        print(f"❌ Database test failed: {e}")

def create_test_document():
    """Create a test document for testing"""
    print("\n🧪 Creating Test Document")
    print("=" * 50)
    
    try:
        # Create a test document
        test_content = """
        This research paper presents a comprehensive analysis of machine learning applications in healthcare.
        
        The study demonstrates significant advances in early disease detection through AI-powered imaging analysis.
        According to recent studies in medical imaging (Smith et al., 2023), deep learning models have achieved
        remarkable accuracy in detecting various conditions.
        
        Our methodology builds upon the work of Johnson and colleagues (2022), who pioneered the use of
        convolutional neural networks in medical diagnostics. The results show a 23% improvement in detection
        accuracy compared to traditional methods.
        
        References:
        Smith, J., et al. (2023). "Deep Learning in Medical Imaging." Journal of Medical AI, 15(2), 45-67.
        Johnson, A., et al. (2022). "CNN Applications in Healthcare." Healthcare Technology Review, 8(4), 112-134.
        """
        
        # Create document record
        doc = Document.objects.create(
            name="test_research_paper.txt",
            file_type="txt",
            size=len(test_content),
            processed=True
        )
        
        # Create summary
        summary = Summary.objects.create(
            document=doc,
            content="This research paper analyzes machine learning applications in healthcare, focusing on AI-powered imaging analysis for disease detection. The study shows significant improvements in detection accuracy using deep learning models.",
            word_count=35
        )
        
        # Create citations
        Citation.objects.create(
            document=doc,
            text="Smith et al., 2023",
            source="Journal of Medical AI, 15(2), 45-67",
            confidence=0.95
        )
        Citation.objects.create(
            document=doc,
            text="Johnson and colleagues, 2022",
            source="Healthcare Technology Review, 8(4), 112-134",
            confidence=0.88
        )
        
        # Create plagiarism check
        PlagiarismCheck.objects.create(
            document=doc,
            similarity_percentage=12.5,
            matched_sources=[],
            status="completed"
        )
        
        # Create conference suggestions
        ConferenceSuggestion.objects.create(
            document=doc,
            conference_name="KDD",
            confidence_score=0.85,
            reasoning="Document contains machine learning and healthcare keywords"
        )
        ConferenceSuggestion.objects.create(
            document=doc,
            conference_name="ICSE",
            confidence_score=0.72,
            reasoning="Document discusses software and technology applications"
        )
        
        print(f"✅ Test document created: {doc.id}")
        print(f"   Summary: {summary.id}")
        print(f"   Citations: 2")
        print(f"   Plagiarism check: 12.5%")
        print(f"   Conference suggestions: 2")
        
        return doc.id
        
    except Exception as e:
        print(f"❌ Test document creation failed: {e}")
        return None

def main():
    """Run all tests"""
    print("🚀 Starting Comprehensive API Testing")
    print("=" * 60)
    
    # Create test document first
    test_doc_id = create_test_document()
    
    # Test services
    test_services()
    
    # Test database data
    test_database_data()
    
    # Test API endpoints
    test_api_endpoints()
    
    print("\n" + "=" * 60)
    print("✅ API testing completed!")
    
    if test_doc_id:
        print(f"\n💡 Test document ID: {test_doc_id}")
        print(f"   You can view it at: http://127.0.0.1:8000/api/documents/{test_doc_id}/")

if __name__ == "__main__":
    main()
