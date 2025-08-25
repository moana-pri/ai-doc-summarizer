# Django Backend Setup Guide

This guide will help you set up the Django backend for the AI Document Summarizer application.

## 🚀 Quick Start

### 1. Navigate to Backend Directory
```bash
cd ai-doc-summarizer/backend
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables
```bash
# Copy the example environment file
copy env_example.txt .env

# Edit .env with your API keys
notepad .env
```

### 4. Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Start the Server
```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`

## 🔑 API Keys Configuration

### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file:
   ```
   GOOGLE_GEMINI_API_KEY=your-actual-api-key-here
   ```

### Copyleaks API Key
1. Sign up at [Copyleaks](https://api.copyleaks.com/)
2. Get your API key and email
3. Add them to your `.env` file:
   ```
   COPYLEAKS_API_KEY=your-copyleaks-api-key
   COPYLEAKS_EMAIL=your-copyleaks-email
   ```

## 📋 API Endpoints

### Document Management
- `POST /api/documents/upload/` - Upload a document
- `GET /api/documents/` - List all documents
- `GET /api/documents/{id}/` - Get document results

### Summary Generation
- `POST /api/documents/{id}/summary/` - Generate summary

### Document Analysis
- `POST /api/documents/{id}/analyze/` - Analyze document (citations, plagiarism, conferences)

### Citations
- `GET /api/documents/{id}/citations/` - Get document citations

### Plagiarism
- `GET /api/documents/{id}/plagiarism/` - Get plagiarism checks

### Conference Suggestions
- `GET /api/documents/{id}/conferences/` - Get conference suggestions

### Analytics
- `GET /api/analytics/` - Get analytics data

### Health Check
- `GET /api/health/` - Health check endpoint

## 🧪 Testing the API

Run the test script to verify everything is working:
```bash
python test_api.py
```

## 🔧 Troubleshooting

### Common Issues

1. **ModuleNotFoundError: No module named 'sklearn'**
   - This is expected since we removed ML dependencies
   - The backend now uses keyword-based conference suggestions

2. **API Key Errors**
   - Ensure all API keys are correctly set in `.env`
   - Check that the keys are valid and have proper permissions

3. **File Upload Issues**
   - Ensure the `media/` directory exists and is writable
   - Check file size limits in settings

4. **Database Issues**
   - Run migrations: `python manage.py migrate`
   - Check database file permissions

### Error Logs
Check Django logs for detailed error information:
```bash
python manage.py runserver --verbosity=2
```

## 📁 File Structure

```
backend/
├── api/
│   ├── models.py          # Database models
│   ├── serializers.py     # DRF serializers
│   ├── services.py        # Business logic services
│   ├── views.py           # API views
│   ├── urls.py            # API URL patterns
│   └── admin.py           # Django admin configuration
├── document_summarizer/
│   ├── settings.py        # Django settings
│   ├── urls.py            # Main URL configuration
│   └── wsgi.py            # WSGI configuration
├── media/                 # Uploaded files
├── requirements.txt       # Python dependencies
├── env_example.txt        # Environment variables template
├── test_api.py           # API test script
└── README.md             # Detailed documentation
```

## 🔗 Integration with Frontend

The backend is designed to work with the React/Next.js frontend:

1. **Frontend URL**: `http://localhost:3000`
2. **Backend URL**: `http://127.0.0.1:8000/api/`
3. **CORS**: Configured to allow requests from frontend

### Testing Frontend-Backend Connection

1. Start the Django backend:
   ```bash
   python manage.py runserver
   ```

2. Start the frontend (in a new terminal):
   ```bash
   cd ../Web_frontend
   npm run dev
   ```

3. Visit `http://localhost:3000/test-connection` to test the connection

## 🛠️ Development

### Creating a Superuser
```bash
python manage.py createsuperuser
```

### Django Admin
Access the admin interface at `http://127.0.0.1:8000/admin/`

### Running Tests
```bash
python manage.py test
```

### Creating Migrations
```bash
python manage.py makemigrations
```

### Applying Migrations
```bash
python manage.py migrate
```

## 📊 Features

### ✅ Implemented
- Document upload and processing (PDF, DOCX, TXT)
- AI-powered summarization using Google Gemini
- Citation detection using Google Gemini
- Plagiarism checking (mock implementation)
- Conference suggestions using keyword matching
- Analytics dashboard
- SQLite database
- REST API endpoints
- CORS configuration for frontend

### 🔄 Future Enhancements
- Real Copyleaks API integration
- ML-based conference suggestions
- Advanced analytics
- User authentication
- File format support expansion

## 🎯 Next Steps

1. **Add API Keys**: Update `.env` file with your actual API keys
2. **Test Upload**: Try uploading a document through the frontend
3. **Test Analysis**: Generate summaries and analyze documents
4. **Monitor Logs**: Check server logs for any issues
5. **Customize**: Modify services for your specific needs

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Django logs for error details
3. Ensure all dependencies are installed correctly
4. Verify API keys are valid and properly configured

---

**Happy coding! 🚀**
