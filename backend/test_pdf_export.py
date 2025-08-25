#!/usr/bin/env python3
"""
Test script to verify PDF export functionality
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
from api.pdf_service import PDFReportService

def create_test_document():
    """Create a test document with data"""
    print("🧪 Creating Test Document for PDF Export")
    print("=" * 50)
    
    try:
        # Create test document
        doc = Document.objects.create(
            name="test_document.pdf",
            file_type="pdf",
            size=2048,
            processed=True
        )
        
        # Create summary
        Summary.objects.create(
            document=doc,
            content="This is a comprehensive test summary for the document. It contains multiple sentences to demonstrate the PDF generation capabilities. The summary provides an overview of the document's key points and main findings.",
            word_count=25
        )
        
        # Create citations
        Citation.objects.create(
            document=doc,
            text="Smith et al. (2023) demonstrated that AI systems can effectively analyze documents.",
            source="Smith, J., et al. (2023). AI Document Analysis. Journal of AI Research.",
            confidence=0.95
        )
        Citation.objects.create(
            document=doc,
            text="According to recent studies, machine learning models show promising results in text processing.",
            source="Johnson, M. (2023). ML in Text Processing. Conference on AI.",
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
            conference_name="International Conference on AI and Machine Learning",
            confidence_score=0.92,
            reasoning="High relevance to AI and ML topics discussed in the document"
        )
        ConferenceSuggestion.objects.create(
            document=doc,
            conference_name="Conference on Natural Language Processing",
            confidence_score=0.85,
            reasoning="Document contains significant NLP-related content"
        )
        ConferenceSuggestion.objects.create(
            document=doc,
            conference_name="IEEE International Conference on Data Science",
            confidence_score=0.78,
            reasoning="Data analysis and processing aspects present in the document"
        )
        
        print(f"✅ Test document created: {doc.id}")
        print(f"   📝 Summary: 1")
        print(f"   📚 Citations: 2")
        print(f"   🔍 Plagiarism check: 1")
        print(f"   🎯 Conference suggestions: 3")
        
        return doc
        
    except Exception as e:
        print(f"❌ Test document creation failed: {e}")
        return None

def test_pdf_generation():
    """Test PDF generation"""
    print("\n🧪 Testing PDF Generation")
    print("=" * 50)
    
    try:
        # Get document
        doc = Document.objects.first()
        if not doc:
            print("❌ No document found for PDF test")
            return
        
        # Get related data
        summaries = doc.summaries.all()
        citations = doc.citations.all()
        plagiarism_checks = doc.plagiarism_checks.all()
        conference_suggestions = doc.conference_suggestions.all()
        
        print(f"📄 Generating PDF for document: {doc.name}")
        print(f"   📝 Summaries: {summaries.count()}")
        print(f"   📚 Citations: {citations.count()}")
        print(f"   🔍 Plagiarism checks: {plagiarism_checks.count()}")
        print(f"   🎯 Conference suggestions: {conference_suggestions.count()}")
        
        # Generate PDF
        pdf_service = PDFReportService()
        pdf_content = pdf_service.generate_document_report(
            document=doc,
            summaries=summaries,
            citations=citations,
            plagiarism_checks=plagiarism_checks,
            conference_suggestions=conference_suggestions
        )
        
        # Save PDF file
        filename = f"test_report_{doc.name.replace('.', '_')}.pdf"
        with open(filename, 'wb') as f:
            f.write(pdf_content)
        
        print(f"✅ PDF generated successfully!")
        print(f"📄 File size: {len(pdf_content)} bytes")
        print(f"💾 Saved as: {filename}")
        
        return True
        
    except Exception as e:
        print(f"❌ PDF generation failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_api_endpoint():
    """Test the export API endpoint"""
    print("\n🧪 Testing Export API Endpoint")
    print("=" * 50)
    
    try:
        import requests
        
        # Get document ID
        doc = Document.objects.first()
        if not doc:
            print("❌ No document found for API test")
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
            
            # Check if it's actually a PDF
            if response.content.startswith(b'%PDF'):
                print("✅ Response is a valid PDF file")
                
                # Save the PDF
                filename = f"api_export_{doc.name.replace('.', '_')}.pdf"
                with open(filename, 'wb') as f:
                    f.write(response.content)
                
                print(f"💾 API export saved as: {filename}")
            else:
                print("❌ Response is not a valid PDF file")
                print(f"   First 100 bytes: {response.content[:100]}")
                
        else:
            print(f"❌ Export endpoint failed: {response.text}")
            
    except Exception as e:
        print(f"❌ API test failed: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting PDF Export Tests")
    print("=" * 60)
    
    # Create test data
    doc = create_test_document()
    
    if doc:
        # Test PDF generation
        pdf_success = test_pdf_generation()
        
        if pdf_success:
            # Test API endpoint
            test_api_endpoint()
        
        print("\n" + "=" * 60)
        print("✅ PDF export tests completed!")
        print(f"\n💡 Test document ID: {doc.id}")
        print(f"   You can test the export at: http://127.0.0.1:8000/api/documents/{doc.id}/export/")
        print(f"   📄 Generated PDF files should be in the current directory")
    else:
        print("❌ Tests failed - no test data created")

if __name__ == "__main__":
    main()
