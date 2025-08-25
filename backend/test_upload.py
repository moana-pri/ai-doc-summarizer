#!/usr/bin/env python3
"""
Test script to upload a file and verify database storage
"""

import requests
import json
import os
from pathlib import Path

# API base URL
API_BASE_URL = 'http://127.0.0.1:8000/api'

def create_test_file():
    """Create a test text file for upload"""
    test_content = """
    This is a test document for the AI Document Summarizer.
    
    The document contains information about machine learning and artificial intelligence.
    Machine learning is a subset of artificial intelligence that enables computers to learn
    and make decisions without being explicitly programmed.
    
    Key topics covered:
    - Database systems and data management
    - Machine learning algorithms
    - Natural language processing
    - Computer vision and graphics
    - Software development methodologies
    
    This document will be used to test the summarization, citation detection,
    plagiarism checking, and conference suggestion features.
    """
    
    test_file_path = 'test_document.txt'
    with open(test_file_path, 'w', encoding='utf-8') as f:
        f.write(test_content)
    
    return test_file_path

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f'{API_BASE_URL}/health/')
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_file_upload(file_path):
    """Test file upload functionality"""
    try:
        with open(file_path, 'rb') as f:
            files = {'file': f}
            response = requests.post(f'{API_BASE_URL}/documents/upload/', files=files)
        
        if response.status_code == 201:
            print("✅ File upload successful")
            result = response.json()
            print(f"📄 Document ID: {result['document']['id']}")
            print(f"📄 Document Name: {result['document']['name']}")
            return result['document']['id']
        else:
            print(f"❌ File upload failed: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ File upload error: {e}")
        return None

def test_document_list():
    """Test getting the list of documents"""
    try:
        response = requests.get(f'{API_BASE_URL}/documents/')
        if response.status_code == 200:
            documents = response.json()
            print(f"✅ Found {len(documents)} documents in database")
            for doc in documents:
                print(f"  - {doc['name']} (ID: {doc['id']})")
            return documents
        else:
            print(f"❌ Document list failed: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Document list error: {e}")
        return []

def test_document_analysis(document_id):
    """Test document analysis (summary, citations, plagiarism, conferences)"""
    try:
        response = requests.post(f'{API_BASE_URL}/documents/{document_id}/analyze/')
        if response.status_code == 200:
            print("✅ Document analysis successful")
            result = response.json()
            print(f"📊 Summary: {result['summary']['content'][:100]}...")
            print(f"📚 Citations found: {len(result['citations'])}")
            print(f"🔍 Plagiarism checks: {len(result['plagiarism_checks'])}")
            print(f"🎯 Conference suggestions: {len(result['conference_suggestions'])}")
            return result
        else:
            print(f"❌ Document analysis failed: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Document analysis error: {e}")
        return None

def test_analytics():
    """Test analytics endpoint"""
    try:
        response = requests.get(f'{API_BASE_URL}/analytics/')
        if response.status_code == 200:
            analytics = response.json()
            print("✅ Analytics retrieved successfully")
            print(f"📈 Total documents: {analytics['total_documents']}")
            print(f"⏱️ Total processing time: {analytics['total_processing_time']} seconds")
            print(f"📊 Success rate: {analytics['success_rate']}%")
            return analytics
        else:
            print(f"❌ Analytics failed: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ Analytics error: {e}")
        return None

def main():
    """Main test function"""
    print("🚀 Starting comprehensive backend test...")
    print("=" * 50)
    
    # Test 1: Health check
    if not test_health_check():
        print("❌ Backend is not running. Please start the Django server first.")
        return
    
    print("\n" + "=" * 50)
    
    # Test 2: Create and upload test file
    test_file = create_test_file()
    print(f"📝 Created test file: {test_file}")
    
    document_id = test_file_upload(test_file)
    if not document_id:
        print("❌ Upload failed. Stopping tests.")
        return
    
    print("\n" + "=" * 50)
    
    # Test 3: List documents
    test_document_list()
    
    print("\n" + "=" * 50)
    
    # Test 4: Analyze document
    test_document_analysis(document_id)
    
    print("\n" + "=" * 50)
    
    # Test 5: Get analytics
    test_analytics()
    
    print("\n" + "=" * 50)
    print("🎉 All tests completed!")
    
    # Clean up test file
    if os.path.exists(test_file):
        os.remove(test_file)
        print(f"🧹 Cleaned up test file: {test_file}")

if __name__ == "__main__":
    main()
