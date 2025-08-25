#!/usr/bin/env python3
"""
Simple test script to verify the Django API is working
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health/")
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_analytics():
    """Test the analytics endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/analytics/")
        if response.status_code == 200:
            print("✅ Analytics endpoint working")
            data = response.json()
            print(f"Total documents: {data.get('total_documents', 0)}")
            return True
        else:
            print(f"❌ Analytics failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Analytics error: {e}")
        return False

def test_documents_list():
    """Test the documents list endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/documents/")
        if response.status_code == 200:
            print("✅ Documents list endpoint working")
            documents = response.json()
            print(f"Found {len(documents)} documents")
            return True
        else:
            print(f"❌ Documents list failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Documents list error: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing Django API Endpoints")
    print("=" * 40)
    
    # Test health check
    health_ok = test_health_check()
    
    # Test analytics
    analytics_ok = test_analytics()
    
    # Test documents list
    documents_ok = test_documents_list()
    
    print("\n" + "=" * 40)
    if health_ok and analytics_ok and documents_ok:
        print("🎉 All tests passed! API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the server logs.")
    
    print("\n📋 Next steps:")
    print("1. Add your API keys to the .env file:")
    print("   - GOOGLE_GEMINI_API_KEY")
    print("   - COPYLEAKS_API_KEY")
    print("   - COPYLEAKS_EMAIL")
    print("2. Test with the frontend at http://localhost:3000")
    print("3. Access admin at http://127.0.0.1:8000/admin/")

if __name__ == "__main__":
    main()
