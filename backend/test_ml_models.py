#!/usr/bin/env python3
"""
Script to test ML model integration for conference suggestions
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.services import ConferenceSuggestionService

def test_conference_suggestions():
    """Test conference suggestions with sample texts"""
    
    # Sample texts for testing
    test_texts = [
        "This paper presents a novel database management system for handling large-scale distributed data processing. We introduce a new query optimization technique that significantly improves performance for complex analytical workloads.",
        
        "We propose a new approach to computer graphics rendering using neural networks. Our method achieves real-time performance for complex 3D scenes with advanced lighting effects.",
        
        "This research focuses on wireless network protocols and communication systems. We analyze the performance of various routing algorithms in mobile ad-hoc networks.",
        
        "Our work explores machine learning applications in healthcare, specifically for medical image analysis and disease diagnosis using deep neural networks.",
        
        "This paper discusses web technologies and social media platforms, examining user behavior patterns and online interaction dynamics."
    ]
    
    conference_service = ConferenceSuggestionService()
    
    print("🧪 Testing Conference Suggestion Service")
    print("=" * 50)
    
    for i, text in enumerate(test_texts, 1):
        print(f"\n📄 Test {i}:")
        print(f"Text: {text[:100]}...")
        
        try:
            suggestions = conference_service.suggest_conferences(text, top_k=3)
            print("✅ Suggestions:")
            for j, suggestion in enumerate(suggestions, 1):
                print(f"  {j}. {suggestion['conference_name']} (Score: {suggestion['confidence_score']:.3f})")
                print(f"     Reason: {suggestion['reasoning']}")
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print("\n" + "=" * 50)
    print("✅ Conference suggestion testing completed!")

if __name__ == "__main__":
    test_conference_suggestions()
