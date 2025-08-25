#!/usr/bin/env python3
"""
Test script to verify summary and citation generation
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
from api.services import GeminiService, ConferenceSuggestionService, CopyleaksService, DocumentProcessor

def test_summary_generation():
    """Test summary generation"""
    print("🧪 Testing Summary Generation")
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
        
        The research was conducted in collaboration with leading medical institutions and follows
        established protocols for clinical validation. For more information, visit https://example.com/research.
        
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
        
        # Test Gemini service summary generation
        gemini_service = GeminiService()
        summary = gemini_service.generate_summary(test_content, 100)
        print(f"✅ Summary generated: {len(summary)} characters")
        print(f"📝 Summary preview: {summary[:200]}...")
        
        # Create summary record
        summary_obj = Summary.objects.create(
            document=doc,
            content=summary,
            word_count=len(summary.split())
        )
        print(f"✅ Summary saved to database: {summary_obj.id}")
        
        return doc.id
        
    except Exception as e:
        print(f"❌ Summary generation failed: {e}")
        return None

def test_citation_detection():
    """Test citation detection"""
    print("\n🧪 Testing Citation Detection")
    print("=" * 50)
    
    try:
        # Get the test document
        doc = Document.objects.first()
        if not doc:
            print("❌ No document found for citation test")
            return
        
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
        
        # Create citation records
        for citation_data in citations:
            Citation.objects.create(
                document=doc,
                text=citation_data.get('text', ''),
                source=citation_data.get('source', ''),
                confidence=citation_data.get('confidence', 0.8)
            )
        
        print(f"✅ {len(citations)} citations saved to database")
        
    except Exception as e:
        print(f"❌ Citation detection failed: {e}")

def test_plagiarism_detection():
    """Test plagiarism detection"""
    print("\n🧪 Testing Plagiarism Detection")
    print("=" * 50)
    
    try:
        # Get the test document
        doc = Document.objects.first()
        if not doc:
            print("❌ No document found for plagiarism test")
            return
        
        test_content = "This is a test document for plagiarism detection with unique content."
        
        # Test Copyleaks service
        copyleaks_service = CopyleaksService()
        result = copyleaks_service.check_plagiarism(test_content, "test_doc.txt")
        
        print(f"✅ Plagiarism check completed")
        print(f"📊 Similarity: {result['similarity_percentage']}%")
        print(f"🔗 Sources found: {len(result['matched_sources'])}")
        
        # Create plagiarism check record
        PlagiarismCheck.objects.create(
            document=doc,
            similarity_percentage=result['similarity_percentage'],
            matched_sources=result['matched_sources'],
            status=result['status']
        )
        
        print(f"✅ Plagiarism check saved to database")
        
    except Exception as e:
        print(f"❌ Plagiarism detection failed: {e}")

def test_conference_suggestions():
    """Test conference suggestions"""
    print("\n🧪 Testing Conference Suggestions")
    print("=" * 50)
    
    try:
        # Get the test document
        doc = Document.objects.first()
        if not doc:
            print("❌ No document found for conference test")
            return
        
        test_content = "This paper presents a novel database management system for handling large-scale distributed data processing."
        
        # Test conference service
        conference_service = ConferenceSuggestionService()
        suggestions = conference_service.suggest_conferences(test_content, 3)
        
        print(f"✅ Conference suggestions: {len(suggestions)}")
        
        for i, suggestion in enumerate(suggestions, 1):
            print(f"🎯 {i}. {suggestion['conference_name']} (Score: {suggestion['confidence_score']:.3f})")
            print(f"   Reason: {suggestion['reasoning']}")
        
        # Create conference suggestion records
        for suggestion in suggestions:
            ConferenceSuggestion.objects.create(
                document=doc,
                conference_name=suggestion['conference_name'],
                confidence_score=suggestion['confidence_score'],
                reasoning=suggestion['reasoning']
            )
        
        print(f"✅ {len(suggestions)} conference suggestions saved to database")
        
    except Exception as e:
        print(f"❌ Conference suggestions failed: {e}")

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
        
    except Exception as e:
        print(f"❌ Database check failed: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting Summary and Citation Tests")
    print("=" * 60)
    
    # Test summary generation
    doc_id = test_summary_generation()
    
    # Test citation detection
    test_citation_detection()
    
    # Test plagiarism detection
    test_plagiarism_detection()
    
    # Test conference suggestions
    test_conference_suggestions()
    
    # Check database data
    check_database_data()
    
    print("\n" + "=" * 60)
    print("✅ Summary and citation tests completed!")
    
    if doc_id:
        print(f"\n💡 Test document ID: {doc_id}")
        print(f"   You can view it at: http://127.0.0.1:8000/api/documents/{doc_id}/")

if __name__ == "__main__":
    main()
