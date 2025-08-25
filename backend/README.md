# Document Summarizer Backend

A Django REST API backend for the AI Document Summarizer application with support for document processing, summarization, citation detection, plagiarism checking, and conference suggestions.

## Features

- **Document Upload & Processing**: Support for PDF, DOCX, and TXT files
- **AI-Powered Summarization**: Using Google Gemini API
- **Citation Detection**: Automatic detection of references and citations
- **Plagiarism Checking**: Integration with Copyleaks API
- **Conference Suggestions**: Using pretrained ML model for conference recommendations
- **Analytics Dashboard**: Comprehensive analytics and statistics
- **SQLite Database**: Lightweight database for data storage

## Prerequisites

- Python 3.8+
- Django 4.2.7
- Required API keys (see Configuration section)

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd ai-doc-summarizer/backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp env_example.txt .env
   
   # Edit .env with your API keys
   nano .env
   ```

4. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://127.0.0.1:8000/api/`

## Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

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

### API Keys Setup

1. **Google Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

2. **Copyleaks API Key:**
   - Sign up at [Copyleaks](https://api.copyleaks.com/)
   - Get your API key and email
   - Add them to your `.env` file

## API Endpoints

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

## Database Models

### Document
- Stores uploaded document information
- Fields: id, name, file, file_type, size, uploaded_at, processed

### Summary
- Stores generated summaries
- Fields: id, document, content, word_count, generated_at

### Citation
- Stores detected citations
- Fields: id, document, text, source, confidence, detected_at

### PlagiarismCheck
- Stores plagiarism detection results
- Fields: id, document, similarity_percentage, matched_sources, status, checked_at

### ConferenceSuggestion
- Stores conference suggestions
- Fields: id, document, conference_name, confidence_score, reasoning, suggested_at

### Analytics
- Stores analytics data
- Fields: id, total_documents, total_processing_time, average_accuracy, success_rate, documents_today, citations_found, plagiarism_detected, conferences_matched, updated_at

## Services

### DocumentProcessor
- Handles text extraction from various file formats (PDF, DOCX, TXT)

### GeminiService
- Integrates with Google Gemini API for summarization and citation detection

### CopyleaksService
- Integrates with Copyleaks API for plagiarism detection

### ConferenceSuggestionService
- Uses pretrained ML model for conference suggestions
- Loads model from `../Conference_models/` directory

### AnalyticsService
- Calculates analytics from database data

## File Structure

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
└── README.md             # This file
```

## Development

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

### Django Admin
Access the admin interface at `http://127.0.0.1:8000/admin/`

## Integration with Frontend

The backend is designed to work with the React/Next.js frontend. The frontend expects the API to be running on `http://127.0.0.1:8000/api/`.

### CORS Configuration
The backend is configured to allow requests from the frontend running on `http://localhost:3000`.

## Troubleshooting

### Common Issues

1. **API Key Errors:**
   - Ensure all API keys are correctly set in `.env`
   - Check that the keys are valid and have proper permissions

2. **File Upload Issues:**
   - Ensure the `media/` directory exists and is writable
   - Check file size limits in settings

3. **Model Loading Errors:**
   - Ensure the Conference_models directory exists with required files
   - Check file permissions for model files

4. **Database Issues:**
   - Run migrations: `python manage.py migrate`
   - Check database file permissions

### Logs
Check Django logs for detailed error information:
```bash
python manage.py runserver --verbosity=2
```

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in settings
2. Use a production database (PostgreSQL recommended)
3. Configure proper CORS settings
4. Set up static file serving
5. Use environment variables for sensitive data
6. Configure proper logging

## License

This project is part of the AI Document Summarizer application.
