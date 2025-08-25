@echo off
echo Starting Django Server...
echo.
echo Server will be available at:
echo - API Root: http://127.0.0.1:8000/
echo - Health Check: http://127.0.0.1:8000/api/health/
echo - Documents: http://127.0.0.1:8000/api/documents/
echo - Analytics: http://127.0.0.1:8000/api/analytics/
echo - Admin: http://127.0.0.1:8000/admin/
echo.
echo Press Ctrl+C to stop the server
echo.
python manage.py runserver 127.0.0.1:8000
pause
