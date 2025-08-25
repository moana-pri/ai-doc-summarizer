#!/usr/bin/env python3
"""
Script to view database contents
"""

import os
import django
import sys

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'document_summarizer.settings')
django.setup()

from api.models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion, Analytics

def view_database():
    """View all database contents"""
    print("🗄️ DATABASE CONTENTS")
    print("=" * 60)
    
    # Documents
    print("\n📄 DOCUMENTS:")
    print("-" * 30)
    documents = Document.objects.all()
    if documents:
        for doc in documents:
            print(f"ID: {doc.id}")
            print(f"Name: {doc.name}")
            print(f"File Type: {doc.file_type}")
            print(f"Size: {doc.size} bytes")
            print(f"Uploaded: {doc.uploaded_at}")
            print(f"Processed: {doc.processed}")
            print(f"File Path: {doc.file.path if doc.file else 'No file'}")
            print("-" * 20)
    else:
        print("No documents found")
    
    # Summaries
    print("\n📊 SUMMARIES:")
    print("-" * 30)
    summaries = Summary.objects.all()
    if summaries:
        for summary in summaries:
            print(f"ID: {summary.id}")
            print(f"Document: {summary.document.name if summary.document else 'No document'}")
            print(f"Content: {summary.content[:100]}...")
            print(f"Word Count: {summary.word_count}")
            print(f"Generated: {summary.generated_at}")
            print("-" * 20)
    else:
        print("No summaries found")
    
    # Citations
    print("\n📚 CITATIONS:")
    print("-" * 30)
    citations = Citation.objects.all()
    if citations:
        for citation in citations:
            print(f"ID: {citation.id}")
            print(f"Document: {citation.document.name if citation.document else 'No document'}")
            print(f"Text: {citation.text[:100]}...")
            print(f"Source: {citation.source}")
            print(f"Confidence: {citation.confidence}")
            print(f"Detected: {citation.detected_at}")
            print("-" * 20)
    else:
        print("No citations found")
    
    # Plagiarism Checks
    print("\n🔍 PLAGIARISM CHECKS:")
    print("-" * 30)
    plagiarism_checks = PlagiarismCheck.objects.all()
    if plagiarism_checks:
        for check in plagiarism_checks:
            print(f"ID: {check.id}")
            print(f"Document: {check.document.name if check.document else 'No document'}")
            print(f"Similarity: {check.similarity_percentage}%")
            print(f"Status: {check.status}")
            print(f"Checked: {check.checked_at}")
            print("-" * 20)
    else:
        print("No plagiarism checks found")
    
    # Conference Suggestions
    print("\n🎯 CONFERENCE SUGGESTIONS:")
    print("-" * 30)
    suggestions = ConferenceSuggestion.objects.all()
    if suggestions:
        for suggestion in suggestions:
            print(f"ID: {suggestion.id}")
            print(f"Document: {suggestion.document.name if suggestion.document else 'No document'}")
            print(f"Conference: {suggestion.conference_name}")
            print(f"Confidence: {suggestion.confidence_score}")
            print(f"Reasoning: {suggestion.reasoning}")
            print(f"Suggested: {suggestion.suggested_at}")
            print("-" * 20)
    else:
        print("No conference suggestions found")
    
    # Analytics
    print("\n📈 ANALYTICS:")
    print("-" * 30)
    analytics = Analytics.objects.all()
    if analytics:
        for analytic in analytics:
            print(f"ID: {analytic.id}")
            print(f"Total Documents: {analytic.total_documents}")
            print(f"Total Processing Time: {analytic.total_processing_time} seconds")
            print(f"Average Accuracy: {analytic.average_accuracy}%")
            print(f"Success Rate: {analytic.success_rate}%")
            print(f"Documents Today: {analytic.documents_today}")
            print(f"Citations Found: {analytic.citations_found}")
            print(f"Plagiarism Detected: {analytic.plagiarism_detected}")
            print(f"Conferences Matched: {analytic.conferences_matched}")
            print(f"Updated: {analytic.updated_at}")
            print("-" * 20)
    else:
        print("No analytics found")

if __name__ == "__main__":
    view_database()
