# 🔧 Troubleshooting Guide

## **Issue: "Failed to fetch" Error**

This error occurs when the frontend can't connect to the backend.

### **Solution 1: Start Backend Server**

**Option A: Using Batch File (Windows)**
```bash
# Double-click this file:
start_backend.bat
```

**Option B: Manual Command**
```bash
cd ai-doc-summarizer\backend
python manage.py runserver
```

**Expected Output:**
```
Watching for file changes with StatReloader
Performing system checks...
System check identified no issues (0 silenced).
Starting development server at http://127.0.0.1:8000/
```

### **Solution 2: Start Frontend Server**

**Option A: Using Batch File (Windows)**
```bash
# Double-click this file:
start_frontend.bat
```

**Option B: Manual Command**
```bash
cd ai-doc-summarizer\Web_frontend
npm run dev
```

**Expected Output:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

## **Issue: Export Not Working**

The export functionality now generates professional PDF reports.

### **What's Fixed:**
✅ **Export now downloads PDF file** with comprehensive document analysis  
✅ **Professional formatting** with tables, charts, and sections  
✅ **Complete analysis report** including all data  
✅ **Works immediately** after backend starts  

### **How to Test Export:**

1. **Start both servers** (backend + frontend)
2. **Upload a document** through the frontend
3. **Click "Export Results"** button
4. **Download PDF report** with all analysis data

### **PDF Report Includes:**
- **Title page** with document information
- **Executive summary** with key statistics
- **Document details** and metadata
- **AI-generated summaries** with word counts
- **Citation analysis** with confidence scores
- **Plagiarism assessment** with risk levels
- **Conference recommendations** with reasoning
- **Professional formatting** and styling

## **Issue: Backend Won't Start**

### **Step 1: Install Dependencies**
```bash
cd ai-doc-summarizer\backend
pip install -r requirements.txt
```

### **Step 2: Run Migrations**
```bash
python manage.py migrate
```

### **Step 3: Create Superuser (if needed)**
```bash
python manage.py createsuperuser
# Username: admin
# Password: admin123
```

### **Step 4: Test Backend**
```bash
python quick_test.py
```

## **Issue: Frontend Won't Start**

### **Step 1: Install Node.js Dependencies**
```bash
cd ai-doc-summarizer\Web_frontend
npm install
```

### **Step 2: Check Node.js Version**
```bash
node --version  # Should be 16+ or 18+
```

## **Quick Test Commands**

### **Test Backend:**
```bash
cd ai-doc-summarizer\backend
python test_pdf_export.py
```

### **Test API Endpoints:**
- Health: `http://127.0.0.1:8000/api/health/`
- Analytics: `http://127.0.0.1:8000/api/analytics/`
- Documents: `http://127.0.0.1:8000/api/documents/`

### **Test Frontend:**
- Visit: `http://localhost:3000`

## **Common Error Messages**

### **"Module not found"**
```bash
pip install -r requirements.txt
```

### **"Port already in use"**
```bash
# Kill existing processes (Windows)
taskkill /f /im python.exe

# Or use different port
python manage.py runserver 8001
```

### **"Database errors"**
```bash
python manage.py migrate
```

### **"Failed to fetch"**
- Make sure Django server is running
- Check if `http://127.0.0.1:8000/api/health/` works
- Verify no firewall blocking connection

## **Step-by-Step Startup**

### **1. Start Backend First:**
```bash
cd ai-doc-summarizer\backend
python manage.py runserver
```

### **2. Start Frontend Second:**
```bash
cd ai-doc-summarizer\Web_frontend
npm run dev
```

### **3. Test Connection:**
- Visit: `http://127.0.0.1:8000/api/health/`
- Should show: `{"status": "healthy"}`

### **4. Use Application:**
- Visit: `http://localhost:3000`
- Upload documents and test export

## **Export Functionality**

### **What Changed:**
- ✅ **PDF export** (now working with professional formatting)
- ❌ **JSON export** (replaced with PDF)

### **Export Features:**
- Downloads comprehensive PDF report
- Includes all summaries, citations, plagiarism data
- Professional formatting with tables and sections
- Executive summary and detailed analysis

### **How to Use:**
1. Upload document
2. Wait for analysis to complete
3. Click "Export Results" button
4. PDF report downloads automatically

## **Need More Help?**

If you're still having issues:

1. **Check console errors** in browser (F12)
2. **Check terminal output** for error messages
3. **Verify both servers** are running
4. **Test API endpoints** directly in browser
5. **Run test scripts** to verify functionality

**🎉 Once both servers are running, everything should work perfectly!**
