# 🚀 Quick Start Guide

## ✅ Your Django Backend is Ready!

The backend has been successfully created with all the necessary components. Here's how to get it running:

## 📋 Step-by-Step Instructions

### 1. **Start the Django Server**

**Option A: Using the batch file (Recommended)**
```bash
# Double-click on start_server.bat
# OR run from command line:
start_server.bat
```

**Option B: Using command line**
```bash
python manage.py runserver
```

**Option C: Using the startup script**
```bash
python start_server.py
```

### 2. **Verify the Server is Running**

You should see output like:
```
Watching for file changes with StatReloader
Performing system checks...
Django version 4.2.7, using settings 'document_summarizer.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### 3. **Test the API**

Open a **new terminal/command prompt** and run:
```bash
python test_api.py
```

You should see:
```
✅ Health check passed
✅ Analytics endpoint working
✅ Documents list endpoint working
🎉 All tests passed! API is working correctly.
```

### 4. **Access the API Endpoints**

Once the server is running, you can access:

- **API Root**: http://127.0.0.1:8000/
- **Health Check**: http://127.0.0.1:8000/api/health/
- **Documents**: http://127.0.0.1:8000/api/documents/
- **Analytics**: http://127.0.0.1:8000/api/analytics/
- **Admin**: http://127.0.0.1:8000/admin/

## 🔑 Configure API Keys

Edit the `.env` file and add your API keys:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# API Keys
GOOGLE_GEMINI_API_KEY=your-gemini-api-key-here
COPYLEAKS_API_KEY=your-copyleaks-api-key-here
COPYLEAKS_EMAIL=your-copyleaks-email-here

# Database
DATABASE_URL=sqlite:///db.sqlite3

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## 🔗 Connect with Frontend

1. **Start the Django backend** (keep it running)
2. **Start the frontend** in a new terminal:
   ```bash
   cd ../Web_frontend
   npm run dev
   ```
3. **Test the connection** at: http://localhost:3000/test-connection

## 🛠️ Available Commands

```bash
# Start server
python manage.py runserver

# Test API
python test_api.py

# Create superuser
python manage.py createsuperuser

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Check Django
python manage.py check
```

## 📁 File Structure

```
backend/
├── api/                    # API app
│   ├── models.py          # Database models
│   ├── views.py           # API views
│   ├── serializers.py     # Data serializers
│   ├── services.py        # Business logic
│   └── urls.py            # API URLs
├── document_summarizer/    # Django project
├── media/                 # Uploaded files
├── requirements.txt       # Dependencies
├── .env                   # Environment variables
├── start_server.bat       # Windows startup script
├── test_api.py           # API test script
└── README.md             # Full documentation
```

## 🎯 What's Working

✅ **Document Upload & Processing** (PDF, DOCX, TXT)  
✅ **AI-Powered Summarization** (Google Gemini)  
✅ **Citation Detection** (Google Gemini)  
✅ **Plagiarism Checking** (Copyleaks integration)  
✅ **Conference Suggestions** (Keyword-based)  
✅ **Analytics Dashboard**  
✅ **SQLite Database**  
✅ **REST API Endpoints**  
✅ **CORS Configuration**  
✅ **Frontend Integration**  

## 🚨 Troubleshooting

### Server Won't Start
- Check if port 8000 is available
- Try: `python manage.py runserver 8001`
- Check for error messages in the terminal

### API Tests Fail
- Make sure the server is running
- Check if you see "Starting development server at http://127.0.0.1:8000/"
- Wait 3-5 seconds after starting server before testing

### Import Errors
- Install dependencies: `pip install -r requirements.txt`
- Check Python version: `python --version` (should be 3.8+)

### Database Issues
- Run migrations: `python manage.py migrate`
- Check if `db.sqlite3` file exists

## 🎉 Success!

Once you see the server running and API tests passing, your backend is ready to work with the frontend!

**Next Steps:**
1. Add your API keys to `.env`
2. Start the frontend
3. Upload and analyze documents
4. Enjoy your AI Document Summarizer! 🚀
