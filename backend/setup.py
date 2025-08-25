#!/usr/bin/env python3
"""
Setup script for Document Summarizer Backend
Automates the installation and configuration process
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path


def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False


def create_env_file():
    """Create .env file from template"""
    print("📝 Creating environment file...")
    
    if os.path.exists('.env'):
        print("⚠️  .env file already exists. Skipping creation.")
        return True
    
    if os.path.exists('env_example.txt'):
        shutil.copy('env_example.txt', '.env')
        print("✅ .env file created from template")
        print("⚠️  Please edit .env file with your API keys before running the server")
        return True
    else:
        print("❌ env_example.txt not found")
        return False


def create_media_directory():
    """Create media directory for file uploads"""
    print("📁 Creating media directory...")
    try:
        os.makedirs('media', exist_ok=True)
        print("✅ Media directory created")
        return True
    except Exception as e:
        print(f"❌ Failed to create media directory: {e}")
        return False


def check_python_version():
    """Check if Python version is compatible"""
    print("🐍 Checking Python version...")
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print(f"❌ Python 3.8+ required. Current version: {version.major}.{version.minor}")
        return False
    print(f"✅ Python version {version.major}.{version.minor}.{version.micro} is compatible")
    return True


def main():
    """Main setup function"""
    print("🚀 Document Summarizer Backend Setup")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        print("❌ Setup failed at dependency installation")
        sys.exit(1)
    
    # Create media directory
    if not create_media_directory():
        print("❌ Setup failed at media directory creation")
        sys.exit(1)
    
    # Create environment file
    if not create_env_file():
        print("❌ Setup failed at environment file creation")
        sys.exit(1)
    
    # Run Django migrations
    if not run_command("python manage.py makemigrations", "Creating database migrations"):
        print("❌ Setup failed at migration creation")
        sys.exit(1)
    
    if not run_command("python manage.py migrate", "Applying database migrations"):
        print("❌ Setup failed at migration application")
        sys.exit(1)
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Edit .env file with your API keys:")
    print("   - GOOGLE_GEMINI_API_KEY")
    print("   - COPYLEAKS_API_KEY")
    print("   - COPYLEAKS_EMAIL")
    print("2. Run the server: python manage.py runserver")
    print("3. Access the API at: http://127.0.0.1:8000/api/")
    print("4. Access admin at: http://127.0.0.1:8000/admin/")
    
    # Ask if user wants to create superuser
    create_superuser = input("\n🤔 Would you like to create a superuser for Django admin? (y/n): ").lower()
    if create_superuser in ['y', 'yes']:
        run_command("python manage.py createsuperuser", "Creating superuser")
    
    print("\n✨ Setup complete! Happy coding!")


if __name__ == "__main__":
    main()
