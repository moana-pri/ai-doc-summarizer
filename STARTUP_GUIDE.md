# 🚀 Startup Guide - AI Document Summarizer

## **Quick Start**

### **Step 1: Start the Backend (Django)**

Open a **new terminal/command prompt** and run:

```bash
cd ai-doc-summarizer\backend
python manage.py runserver
```

**Expected Output:**
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
December 20, 2024 - 15:30:00
Django version 4.2.7, using settings 'document_summarizer.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### **Step 2: Start the Frontend (Next.js)**

Open **another terminal/command prompt** and run:

```bash
cd ai-doc-summarizer\Web_frontend
npm run dev
```

**Expected Output:**
```
> ai-doc-summarizer@0.1.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### **Step 3: Access the Application**

1. **Frontend**: Open `http://localhost:3000` in your browser
2. **Backend API**: `http://127.0.0.1:8000/api/`
3. **Admin Panel**: `http://127.0.0.1:8000/admin/` (username: `admin`, password: `admin123`)

## **Troubleshooting**

### **If Backend Won't Start:**

1. **Install Dependencies:**
   ```bash
   cd ai-doc-summarizer\backend
   pip install -r requirements.txt
   ```

2. **Run Migrations:**
   ```bash
   python manage.py migrate
   ```

3. **Create Superuser (if needed):**
   ```bash
   python manage.py createsuperuser
   ```

4. **Test Backend:**
   ```bash
   python quick_test.py
   ```

### **If Frontend Won't Start:**

1. **Install Node.js Dependencies:**
   ```bash
   cd ai-doc-summarizer\Web_frontend
   npm install
   ```

2. **Check Node.js Version:**
   ```bash
   node --version  # Should be 16+ or 18+
   ```

### **If "Failed to fetch" Error:**

This means the frontend can't connect to the backend. Make sure:

1. ✅ Django server is running on `http://127.0.0.1:8000/`
2. ✅ No firewall blocking the connection
3. ✅ Both servers are running simultaneously

## **Testing the System**

### **1. Test Backend API:**
- Visit: `http://127.0.0.1:8000/api/health/`
- Should show: `{"status": "healthy", "timestamp": "..."}`

### **2. Test Frontend:**
- Visit: `http://localhost:3000`
- Should show the DocuMind AI interface

### **3. Test Document Upload:**
1. Go to Upload tab
2. Upload a PDF/DOCX/TXT file
3. Check if summary, citations, and analysis work

### **4. Test PDF Export:**
1. Upload a document
2. Click "Export Results" button
3. Should download a PDF report

## **Common Issues & Solutions**

### **Issue: "Failed to fetch" Error**
**Solution:** Start the Django backend server first

### **Issue: "Module not found" Error**
**Solution:** Install Python dependencies with `pip install -r requirements.txt`

### **Issue: "Port already in use"**
**Solution:** 
- Kill existing processes: `taskkill /f /im python.exe` (Windows)
- Or use different port: `python manage.py runserver 8001`

### **Issue: "Database errors"**
**Solution:** Run migrations: `python manage.py migrate`

## **API Endpoints**

Once running, these endpoints will be available:

- **Health Check**: `GET http://127.0.0.1:8000/api/health/`
- **Upload Document**: `POST http://127.0.0.1:8000/api/documents/upload/`
- **List Documents**: `GET http://127.0.0.1:8000/api/documents/`
- **Analytics**: `GET http://127.0.0.1:8000/api/analytics/`
- **PDF Export**: `GET http://127.0.0.1:8000/api/documents/{id}/export/`

## **Features Working**

✅ **Document Upload** - PDF, DOCX, TXT files  
✅ **Summary Generation** - AI-powered summaries  
✅ **Citation Detection** - Automatic citation tracking  
✅ **Plagiarism Detection** - Dynamic similarity checking  
✅ **Conference Suggestions** - ML-powered recommendations  
✅ **Analytics Dashboard** - Real-time statistics  
✅ **PDF Export** - Professional report generation  

## **Need Help?**

If you're still having issues:

1. Run the quick test: `python quick_test.py`
2. Check the console for error messages
3. Make sure both servers are running
4. Verify the URLs are accessible in your browser

**🎉 Once both servers are running, the system should work perfectly!**
