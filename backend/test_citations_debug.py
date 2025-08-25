#!/usr/bin/env python3
"""
Debug script to test citation creation and retrieval
"""

import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Citation, Analytics
from api.services import AnalyticsService
from django.utils import timezone

def test_citations():
    """Test citation creation and retrieval"""
    print("🔍 Testing Citation System...")
    
    # Check if we have any documents
    documents = Document.objects.all()
    print(f"📄 Found {documents.count()} documents in database")
    
    if documents.exists():
        doc = documents.first()
        print(f"📋 Testing with document: {doc.name} (ID: {doc.id})")
        
        # Check citations for this document
        citations = doc.citations.all()
        print(f"🔗 Found {citations.count()} citations for document {doc.name}")
        
        for i, citation in enumerate(citations):
            print(f"  Citation {i+1}:")
            print(f"    Text: {citation.text[:100]}...")
            print(f"    Source: {citation.source}")
            print(f"    Confidence: {citation.confidence}")
            print(f"    Detected at: {citation.detected_at}")
            print()
        
        # Check if citations exist but are not being retrieved
        all_citations = Citation.objects.all()
        print(f"📊 Total citations in database: {all_citations.count()}")
        
        if all_citations.exists():
            print("🔍 Sample citations from database:")
            for i, citation in enumerate(all_citations[:3]):
                print(f"  {i+1}. {citation.text[:80]}... (Doc: {citation.document.name})")
        else:
            print("❌ No citations found in database")
            
    else:
        print("❌ No documents found in database")
    
    # Test analytics calculation
    print("\n📈 Testing Analytics...")
    try:
        analytics = AnalyticsService.calculate_analytics()
        print(f"✅ Analytics calculated successfully:")
        print(f"   - Total documents: {analytics['total_documents']}")
        print(f"   - Citations found: {analytics['citations_found']}")
        print(f"   - Plagiarism detected: {analytics['plagiarism_detected']}")
        print(f"   - Conferences matched: {analytics['conferences_matched']}")
    except Exception as e:
        print(f"❌ Analytics calculation failed: {e}")
    
    # Check analytics record in database
    try:
        analytics_record = Analytics.objects.first()
        if analytics_record:
            print(f"\n📊 Analytics record in database:")
            print(f"   - ID: {analytics_record.id}")
            print(f"   - Citations found: {analytics_record.citations_found}")
            print(f"   - Updated at: {analytics_record.updated_at}")
        else:
            print("❌ No analytics record found in database")
    except Exception as e:
        print(f"❌ Error accessing analytics record: {e}")

def create_test_citation():
    """Create a test citation if none exist"""
    print("\n🔧 Creating test citation...")
    
    documents = Document.objects.all()
    if not documents.exists():
        print("❌ No documents available to create test citation")
        return
    
    doc = documents.first()
    
    # Check if citation already exists
    if doc.citations.exists():
        print("✅ Document already has citations")
        return
    
    # Create a test citation
    try:
        citation = Citation.objects.create(
            document=doc,
            text="This is a test citation for debugging purposes",
            source="Test source",
            confidence=0.9
        )
        print(f"✅ Created test citation: {citation.id}")
        print(f"   Text: {citation.text}")
        print(f"   Source: {citation.source}")
        print(f"   Confidence: {citation.confidence}")
    except Exception as e:
        print(f"❌ Failed to create test citation: {e}")

if __name__ == "__main__":
    print("🚀 Starting Citation Debug Test...")
    print("=" * 50)
    
    test_citations()
    create_test_citation()
    
    print("\n" + "=" * 50)
    print("🏁 Citation Debug Test Complete!")
    
    # Final check
    print("\n🔍 Final Status:")
    total_citations = Citation.objects.count()
    total_docs = Document.objects.count()
    print(f"   - Total documents: {total_docs}")
    print(f"   - Total citations: {total_citations}")
    
    if total_citations > 0:
        print("✅ Citations are being created and stored correctly")
    else:
        print("❌ No citations found - there may be an issue with citation creation")
