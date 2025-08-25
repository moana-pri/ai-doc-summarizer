#!/usr/bin/env python3
"""
Simple test to check if the Django server is running
"""

import requests
import time

def test_server():
    """Test if the server is running"""
    print("🧪 Testing if Django server is running...")
    
    # Try multiple times
    for i in range(3):
        try:
            print(f"Attempt {i+1}: Testing connection...")
            response = requests.get("http://127.0.0.1:8000/", timeout=5)
            if response.status_code == 200:
                print("✅ Server is running!")
                print(f"Response: {response.json()}")
                return True
            else:
                print(f"⚠️  Server responded with status: {response.status_code}")
        except requests.exceptions.ConnectionError:
            print(f"❌ Connection failed (attempt {i+1})")
        except Exception as e:
            print(f"❌ Error: {e}")
        
        if i < 2:  # Don't sleep after the last attempt
            print("Waiting 2 seconds before next attempt...")
            time.sleep(2)
    
    print("❌ Server is not running or not accessible")
    return False

if __name__ == "__main__":
    test_server()
