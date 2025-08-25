#!/usr/bin/env python3
"""
Test script to verify improved citation detection
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.services import GeminiService

def test_improved_citation_detection():
    """Test the improved citation detection with various text samples"""
    print("🧪 Testing Improved Citation Detection")
    print("=" * 60)
    
    # Test text with various citation patterns
    test_texts = [
        # Academic paper with citations
        """
        This research builds upon previous work in machine learning. According to Smith et al. (2023), 
        deep learning has revolutionized the field of artificial intelligence. Johnson and Brown (2022) 
        found that neural networks perform significantly better than traditional methods. 
        
        Recent studies by Anderson, Wilson, and Davis (2024) have shown promising results in 
        natural language processing. The work of Thompson & Lee (2021) provides a comprehensive 
        framework for understanding these advances.
        
        References:
        1. Smith, J., et al. (2023). Deep Learning Advances. Journal of AI Research, 45(2), 123-145.
        2. Johnson, M., & Brown, A. (2022). Neural Networks in Practice. IEEE Transactions on ML.
        3. Anderson, K., Wilson, R., & Davis, P. (2024). NLP Breakthroughs. ACM Conference Proceedings.
        4. Thompson, S., & Lee, J. (2021). AI Framework Analysis. Nature Machine Intelligence.
        
        For more information, visit: https://example.com/research-paper
        """,
        
        # Document with URLs and references
        """
        The implementation follows best practices outlined in the documentation.
        See https://docs.example.com/implementation for detailed guidelines.
        
        Additional resources:
        - https://github.com/example/project
        - https://arxiv.org/abs/2023.12345
        """,
        
        # Document with journal references
        """
        This study references several key publications in the field:
        - Nature Machine Intelligence Journal
        - IEEE Transactions on Pattern Analysis
        - ACM Computing Surveys Review
        - Journal of Machine Learning Research
        """
    ]
    
    gemini_service = GeminiService()
    
    for i, text in enumerate(test_texts, 1):
        print(f"\n📄 Test Text {i}:")
        print("-" * 40)
        print(f"Text length: {len(text)} characters")
        
        try:
            citations = gemini_service.detect_citations(text)
            print(f"✅ Detected {len(citations)} citations:")
            
            for j, citation in enumerate(citations, 1):
                print(f"   {j}. Text: {citation.get('text', 'N/A')}")
                print(f"      Source: {citation.get('source', 'N/A')}")
                print(f"      Confidence: {citation.get('confidence', 'N/A')}")
                print()
                
        except Exception as e:
            print(f"❌ Citation detection failed: {e}")

def main():
    """Run the improved citation detection test"""
    print("🚀 Testing Improved Citation Detection")
    print("=" * 60)
    
    test_improved_citation_detection()
    
    print("\n" + "=" * 60)
    print("✅ Improved citation detection test completed!")
    print("\n💡 The citation detection should now:")
    print("   • Detect academic citation patterns (Author, Year)")
    print("   • Extract URLs and web references")
    print("   • Identify journal names and publication info")
    print("   • Parse reference lists and bibliographies")
    print("   • Provide meaningful fallback citations")

if __name__ == "__main__":
    main()
