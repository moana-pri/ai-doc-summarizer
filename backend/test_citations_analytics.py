#!/usr/bin/env python3
"""
Test script to verify citations and analytics
"""

import os
import sys
import django
import requests

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion, Analytics
from api.services import GeminiService, ConferenceSuggestionService, CopyleaksService, AnalyticsService

def create_test_document_with_citations():
    """Create a test document with citations"""
    print("🧪 Creating Test Document with Citations")
    print("=" * 50)
    
    try:
        # Create test content with citations
        test_content = """
        This research paper presents a comprehensive analysis of machine learning applications in healthcare.
        
        According to recent studies in medical imaging (Smith et al., 2023), deep learning models have achieved
        remarkable accuracy in detecting various conditions.
        
        Our methodology builds upon the work of Johnson and colleagues (2022), who pioneered the use of
        convolutional neural networks in medical diagnostics.
        
        For more information, visit https://example.com/research.
        
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
            content="This research paper analyzes machine learning applications in healthcare, focusing on AI-powered imaging analysis for disease detection.",
            word_count=25
        )
        
        # Create citations manually
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
        Citation.objects.create(
            document=doc,
            text="https://example.com/research",
            source="Web reference",
            confidence=0.9
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
        print(f"   📝 Summary: {summary.id}")
        print(f"   📚 Citations: 3")
        print(f"   🔍 Plagiarism check: 12.5%")
        print(f"   🎯 Conference suggestions: 2")
        
        return doc.id
        
    except Exception as e:
        print(f"❌ Test document creation failed: {e}")
        return None

def test_citation_detection():
    """Test citation detection with Gemini service"""
    print("\n🧪 Testing Citation Detection")
    print("=" * 50)
    
    try:
        test_content = """
        This research paper presents a comprehensive analysis of machine learning applications in healthcare.
        
        According to recent studies in medical imaging (Smith et al., 2023), deep learning models have achieved
        remarkable accuracy in detecting various conditions.
        
        Our methodology builds upon the work of Johnson and colleagues (2022), who pioneered the use of
        convolutional neural networks in medical diagnostics.
        
        For more information, visit https://example.com/research.
        
        References:
        Smith, J., et al. (2023). "Deep Learning in Medical Imaging." Journal of Medical AI, 15(2), 45-67.
        Johnson, A., et al. (2022). "CNN Applications in Healthcare." Healthcare Technology Review, 8(4), 112-134.
        """
        
        # Test Gemini service citation detection
        gemini_service = GeminiService()
        citations = gemini_service.detect_citations(test_content)
        
        print(f"✅ Citations detected: {len(citations)}")
        
        for i, citation in enumerate(citations, 1):
            print(f"📚 {i}. {citation.get('text', 'N/A')[:50]}...")
            print(f"   Source: {citation.get('source', 'N/A')}")
            print(f"   Confidence: {citation.get('confidence', 'N/A')}")
        
        return citations
        
    except Exception as e:
        print(f"❌ Citation detection failed: {e}")
        return []

def test_analytics():
    """Test analytics calculation"""
    print("\n🧪 Testing Analytics")
    print("=" * 50)
    
    try:
        # Calculate analytics
        analytics_data = AnalyticsService.calculate_analytics()
        
        print(f"✅ Analytics calculated:")
        print(f"   📄 Total documents: {analytics_data.get('total_documents', 0)}")
        print(f"   📅 Documents today: {analytics_data.get('documents_today', 0)}")
        print(f"   📚 Citations found: {analytics_data.get('citations_found', 0)}")
        print(f"   🔍 Plagiarism detected: {analytics_data.get('plagiarism_detected', 0)}")
        print(f"   🎯 Conferences matched: {analytics_data.get('conferences_matched', 0)}")
        print(f"   ⏱️ Processing time: {analytics_data.get('total_processing_time', 0)}s")
        print(f"   📊 Average accuracy: {analytics_data.get('average_accuracy', 0)}%")
        print(f"   ✅ Success rate: {analytics_data.get('success_rate', 0)}%")
        
        # Create or update analytics record
        analytics = None
        if Analytics.objects.exists():
            analytics = Analytics.objects.first()
        else:
            analytics = Analytics.objects.create()
        
        # Update analytics with new data
        for key, value in analytics_data.items():
            setattr(analytics, key, value)
        analytics.save()
        
        print(f"✅ Analytics record updated: {analytics.id}")
        
        return analytics_data
        
    except Exception as e:
        print(f"❌ Analytics test failed: {e}")
        return {}

def test_api_endpoints():
    """Test API endpoints"""
    print("\n🧪 Testing API Endpoints")
    print("=" * 50)
    
    base_url = "http://127.0.0.1:8000/api"
    
    # Test analytics endpoint
    try:
        response = requests.get(f"{base_url}/analytics/")
        print(f"✅ Analytics endpoint: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   📊 Total documents: {data.get('total_documents', 0)}")
            print(f"   📚 Citations found: {data.get('citations_found', 0)}")
            print(f"   🎯 Conferences matched: {data.get('conferences_matched', 0)}")
    except Exception as e:
        print(f"❌ Analytics endpoint failed: {e}")
    
    # Test documents endpoint
    try:
        response = requests.get(f"{base_url}/documents/")
        print(f"✅ Documents endpoint: {response.status_code}")
        if response.status_code == 200:
            documents = response.json()
            print(f"   📄 Found {len(documents)} documents")
            if documents:
                doc_id = documents[0]['id']
                print(f"   📄 First document ID: {doc_id}")
                
                # Test document results
                response = requests.get(f"{base_url}/documents/{doc_id}/")
                print(f"✅ Document results: {response.status_code}")
                if response.status_code == 200:
                    doc_data = response.json()
                    print(f"   📝 Has summaries: {len(doc_data.get('summaries', []))}")
                    print(f"   📚 Has citations: {len(doc_data.get('citations', []))}")
                    print(f"   🔍 Has plagiarism checks: {len(doc_data.get('plagiarism_checks', []))}")
                    print(f"   🎯 Has conference suggestions: {len(doc_data.get('conference_suggestions', []))}")
    except Exception as e:
        print(f"❌ Documents endpoint failed: {e}")

def check_database_data():
    """Check what data is in the database"""
    print("\n🧪 Checking Database Data")
    print("=" * 50)
    
    try:
        documents = Document.objects.all()
        print(f"📄 Documents: {documents.count()}")
        
        if documents.exists():
            doc = documents.first()
            print(f"   Latest: {doc.name} (ID: {doc.id})")
            
            summaries = doc.summaries.all()
            print(f"📝 Summaries: {summaries.count()}")
            if summaries.exists():
                latest_summary = summaries.latest('generated_at')
                print(f"   Latest: {latest_summary.content[:100]}...")
            
            citations = doc.citations.all()
            print(f"📚 Citations: {citations.count()}")
            if citations.exists():
                for citation in citations[:3]:
                    print(f"   - {citation.text[:50]}...")
            
            plagiarism_checks = doc.plagiarism_checks.all()
            print(f"🔍 Plagiarism checks: {plagiarism_checks.count()}")
            if plagiarism_checks.exists():
                latest = plagiarism_checks.latest('checked_at')
                print(f"   Latest: {latest.similarity_percentage}%")
            
            conference_suggestions = doc.conference_suggestions.all()
            print(f"🎯 Conference suggestions: {conference_suggestions.count()}")
            if conference_suggestions.exists():
                for suggestion in conference_suggestions[:3]:
                    print(f"   - {suggestion.conference_name} (Score: {suggestion.confidence_score:.3f})")
        
        # Check analytics
        analytics = Analytics.objects.first()
        if analytics:
            print(f"📊 Analytics record: {analytics.id}")
            print(f"   Total documents: {analytics.total_documents}")
            print(f"   Citations found: {analytics.citations_found}")
            print(f"   Conferences matched: {analytics.conferences_matched}")
        
    except Exception as e:
        print(f"❌ Database check failed: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting Citations and Analytics Tests")
    print("=" * 60)
    
    # Create test document with citations
    doc_id = create_test_document_with_citations()
    
    # Test citation detection
    citations = test_citation_detection()
    
    # Test analytics
    analytics_data = test_analytics()
    
    # Test API endpoints
    test_api_endpoints()
    
    # Check database data
    check_database_data()
    
    print("\n" + "=" * 60)
    print("✅ Citations and analytics tests completed!")
    
    if doc_id:
        print(f"\n💡 Test document ID: {doc_id}")
        print(f"   You can view it at: http://127.0.0.1:8000/api/documents/{doc_id}/")
        print(f"   Analytics at: http://127.0.0.1:8000/api/analytics/")

if __name__ == "__main__":
    main()
