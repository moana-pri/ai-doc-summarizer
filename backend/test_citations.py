#!/usr/bin/env python3
"""
Test script to verify citation detection and display
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Citation
from api.services import GeminiService

def test_citation_detection():
    """Test citation detection functionality"""
    print("🧪 Testing Citation Detection")
    print("=" * 50)
    
    # Test text with citations
    test_text = """
    This is a research paper about machine learning. According to Smith et al. (2023), 
    deep learning has revolutionized the field. Johnson and Brown (2022) found that 
    neural networks perform better than traditional methods. For more information, 
    see https://example.com/research.
    
    References:
    Smith, J., et al. (2023). Deep Learning Advances. Journal of AI Research.
    Johnson, M., & Brown, A. (2022). Neural Networks in Practice. IEEE Transactions.
    """
    
    try:
        # Test Gemini service citation detection
        gemini_service = GeminiService()
        citations = gemini_service.detect_citations(test_text)
        
        print(f"✅ Detected {len(citations)} citations:")
        for i, citation in enumerate(citations, 1):
            print(f"   {i}. Text: {citation.get('text', 'N/A')}")
            print(f"      Source: {citation.get('source', 'N/A')}")
            print(f"      Confidence: {citation.get('confidence', 'N/A')}")
            print()
        
        return citations
        
    except Exception as e:
        print(f"❌ Citation detection failed: {e}")
        return []

def test_database_citations():
    """Test citation database operations"""
    print("\n🧪 Testing Citation Database Operations")
    print("=" * 50)
    
    try:
        # Get all documents
        documents = Document.objects.all()
        print(f"📄 Found {documents.count()} documents")
        
        for doc in documents:
            citations = doc.citations.all()
            print(f"   📚 Document '{doc.name}': {citations.count()} citations")
            
            for citation in citations:
                print(f"      - {citation.text} (Source: {citation.source}, Confidence: {citation.confidence})")
        
        return documents
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return []

def test_api_endpoint():
    """Test the API endpoint for citations"""
    print("\n🧪 Testing Citation API Endpoint")
    print("=" * 50)
    
    try:
        import requests
        
        # Get first document
        doc = Document.objects.first()
        if not doc:
            print("❌ No documents found for API test")
            return
        
        # Test the citations endpoint
        url = f"http://127.0.0.1:8000/api/documents/{doc.id}/citations/"
        print(f"🌐 Testing URL: {url}")
        
        response = requests.get(url)
        print(f"📡 Response status: {response.status_code}")
        
        if response.status_code == 200:
            citations = response.json()
            print(f"✅ API returned {len(citations)} citations:")
            for citation in citations:
                print(f"   - {citation.get('text', 'N/A')}")
        else:
            print(f"❌ API failed: {response.text}")
            
    except Exception as e:
        print(f"❌ API test failed: {e}")

def create_test_citations():
    """Create test citations for a document"""
    print("\n🧪 Creating Test Citations")
    print("=" * 50)
    
    try:
        # Get or create a test document
        doc, created = Document.objects.get_or_create(
            name="test_citations_document.txt",
            defaults={
                'file_type': 'txt',
                'size': 1024,
                'processed': True
            }
        )
        
        if created:
            print(f"✅ Created test document: {doc.id}")
        else:
            print(f"📄 Using existing document: {doc.id}")
        
        # Clear existing citations
        doc.citations.all().delete()
        
        # Create test citations
        test_citations = [
            {
                'text': 'Smith et al. (2023) demonstrated significant advances',
                'source': 'Smith, J., et al. (2023). AI Research. Journal of AI.',
                'confidence': 0.95
            },
            {
                'text': 'According to Johnson and Brown (2022)',
                'source': 'Johnson, M., & Brown, A. (2022). ML Applications.',
                'confidence': 0.88
            },
            {
                'text': 'https://example.com/research-paper',
                'source': 'Web reference',
                'confidence': 0.9
            }
        ]
        
        for citation_data in test_citations:
            citation = Citation.objects.create(
                document=doc,
                text=citation_data['text'],
                source=citation_data['source'],
                confidence=citation_data['confidence']
            )
            print(f"✅ Created citation: {citation.text}")
        
        return doc
        
    except Exception as e:
        print(f"❌ Failed to create test citations: {e}")
        return None

def main():
    """Run all citation tests"""
    print("🚀 Starting Citation Tests")
    print("=" * 60)
    
    # Test citation detection
    citations = test_citation_detection()
    
    # Test database operations
    documents = test_database_citations()
    
    # Create test citations if none exist
    if not documents or all(doc.citations.count() == 0 for doc in documents):
        print("\n📝 No citations found, creating test data...")
        test_doc = create_test_citations()
        if test_doc:
            documents = [test_doc]
    
    # Test API endpoint
    test_api_endpoint()
    
    print("\n" + "=" * 60)
    print("✅ Citation tests completed!")
    
    if documents:
        print(f"\n💡 Test document ID: {documents[0].id}")
        print(f"   You can test the API at: http://127.0.0.1:8000/api/documents/{documents[0].id}/citations/")
        print(f"   Frontend should now show citations for document: {documents[0].name}")

if __name__ == "__main__":
    main()
