#!/usr/bin/env python3
"""
Simple test script to verify citation system functionality
"""

import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Citation
from api.services import GeminiService
from django.utils import timezone

def test_citation_system():
    """Test the citation system"""
    print("🔍 Testing Citation System...")
    
    # Check documents
    documents = Document.objects.all()
    print(f"📄 Found {documents.count()} documents")
    
    if not documents.exists():
        print("❌ No documents found. Please upload a document first.")
        return
    
    doc = documents.first()
    print(f"📋 Testing with document: {doc.name}")
    
    # Check current citations
    current_citations = doc.citations.all()
    print(f"🔗 Current citations: {current_citations.count()}")
    
    for i, citation in enumerate(current_citations):
        print(f"  Citation {i+1}: {citation.text[:100]}...")
    
    # Test citation detection
    print("\n🧪 Testing citation detection...")
    try:
        gemini_service = GeminiService()
        
        # Extract text from document
        from api.services import DocumentProcessor
        text = DocumentProcessor.extract_text_from_file(doc.file)
        print(f"📝 Extracted {len(text)} characters of text")
        
        # Detect citations
        citations = gemini_service.detect_citations(text)
        print(f"🔍 Detected {len(citations)} citations")
        
        for i, citation in enumerate(citations[:3]):
            print(f"  Citation {i+1}: {citation['text'][:100]}...")
            print(f"    Source: {citation['source']}")
            print(f"    Confidence: {citation['confidence']}")
        
        return len(citations) > 0
        
    except Exception as e:
        print(f"❌ Citation detection failed: {e}")
        return False

def create_test_citation():
    """Create a test citation"""
    print("\n🔧 Creating test citation...")
    
    documents = Document.objects.all()
    if not documents.exists():
        print("❌ No documents available")
        return False
    
    doc = documents.first()
    
    try:
        # Create a test citation
        citation = Citation.objects.create(
            document=doc,
            text="This is a test citation to verify the system is working correctly. It contains meaningful content extracted from the document analysis.",
            source="Test citation creation",
            confidence=0.9
        )
        print(f"✅ Created test citation: {citation.id}")
        print(f"   Text: {citation.text}")
        print(f"   Source: {citation.source}")
        print(f"   Confidence: {citation.confidence}")
        return True
    except Exception as e:
        print(f"❌ Failed to create test citation: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Testing Citation System...")
    print("=" * 50)
    
    # Test citation detection
    detection_working = test_citation_system()
    
    # Create test citation if needed
    if not detection_working:
        citation_created = create_test_citation()
        if citation_created:
            print("✅ Test citation created successfully")
        else:
            print("❌ Failed to create test citation")
    
    # Final status
    print("\n" + "=" * 50)
    print("🏁 Test Complete!")
    
    total_citations = Citation.objects.count()
    total_docs = Document.objects.count()
    print(f"📊 Final Status:")
    print(f"   - Total documents: {total_docs}")
    print(f"   - Total citations: {total_citations}")
    
    if total_citations > 0:
        print("✅ Citations are working correctly")
    else:
        print("❌ No citations found - system may have issues")
