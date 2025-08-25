#!/usr/bin/env python3
"""
Test script to verify export functionality
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion

def create_test_document():
    """Create a test document with data"""
    print("🧪 Creating Test Document for Export")
    print("=" * 50)
    
    try:
        # Create test document
        doc = Document.objects.create(
            name="test_document.txt",
            file_type="txt",
            size=1024,
            processed=True
        )
        
        # Create summary
        Summary.objects.create(
            document=doc,
            content="This is a test summary for the document.",
            word_count=10
        )
        
        # Create citations
        Citation.objects.create(
            document=doc,
            text="Test Citation 1",
            source="Test Source 1",
            confidence=0.9
        )
        Citation.objects.create(
            document=doc,
            text="Test Citation 2",
            source="Test Source 2",
            confidence=0.8
        )
        
        # Create plagiarism check
        PlagiarismCheck.objects.create(
            document=doc,
            similarity_percentage=15.5,
            matched_sources=[],
            status="completed"
        )
        
        # Create conference suggestions
        ConferenceSuggestion.objects.create(
            document=doc,
            conference_name="Test Conference 1",
            confidence_score=0.85,
            reasoning="Test reasoning 1"
        )
        ConferenceSuggestion.objects.create(
            document=doc,
            conference_name="Test Conference 2",
            confidence_score=0.75,
            reasoning="Test reasoning 2"
        )
        
        print(f"✅ Test document created: {doc.id}")
        print(f"   📝 Summary: 1")
        print(f"   📚 Citations: 2")
        print(f"   🔍 Plagiarism check: 1")
        print(f"   🎯 Conference suggestions: 2")
        
        return doc
        
    except Exception as e:
        print(f"❌ Test document creation failed: {e}")
        return None

def test_export_endpoint():
    """Test the export endpoint"""
    print("\n🧪 Testing Export Endpoint")
    print("=" * 50)
    
    try:
        import requests
        
        # Get document ID
        doc = Document.objects.first()
        if not doc:
            print("❌ No document found for export test")
            return
        
        # Test the export endpoint
        url = f"http://127.0.0.1:8000/api/documents/{doc.id}/export/"
        print(f"🌐 Testing URL: {url}")
        
        response = requests.get(url)
        print(f"📡 Response status: {response.status_code}")
        
        if response.status_code == 200:
            print(f"✅ Export endpoint working!")
            print(f"📄 Content-Type: {response.headers.get('Content-Type', 'Unknown')}")
            print(f"📄 Content-Length: {len(response.content)} bytes")
            
            # Parse JSON response
            try:
                data = response.json()
                print(f"📊 Export data structure:")
                print(f"   - Document: {data.get('document', {}).get('name', 'N/A')}")
                print(f"   - Summaries: {len(data.get('summaries', []))}")
                print(f"   - Citations: {len(data.get('citations', []))}")
                print(f"   - Plagiarism checks: {len(data.get('plagiarism_checks', []))}")
                print(f"   - Conference suggestions: {len(data.get('conference_suggestions', []))}")
                
                # Save the export file
                filename = f"test_export_{doc.name.replace('.', '_')}.json"
                with open(filename, 'wb') as f:
                    f.write(response.content)
                
                print(f"💾 Export file saved as: {filename}")
                
            except json.JSONDecodeError:
                print("❌ Response is not valid JSON")
                
        else:
            print(f"❌ Export endpoint failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Export test failed: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting Export Tests")
    print("=" * 60)
    
    # Create test data
    doc = create_test_document()
    
    if doc:
        # Test export endpoint
        test_export_endpoint()
        
        print("\n" + "=" * 60)
        print("✅ Export tests completed!")
        print(f"\n💡 Test document ID: {doc.id}")
        print(f"   You can test the export at: http://127.0.0.1:8000/api/documents/{doc.id}/export/")
    else:
        print("❌ Tests failed - no test data created")

if __name__ == "__main__":
    main()
