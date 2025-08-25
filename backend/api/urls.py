from django.urls import path
from . import views

urlpatterns = [
    # Document management
    path('documents/upload/', views.DocumentUploadView.as_view(), name='document-upload'),
    path('documents/', views.DocumentListView.as_view(), name='document-list'),
    path('documents/<uuid:document_id>/', views.DocumentResultsView.as_view(), name='document-results'),
    
    # Summary generation
    path('documents/<uuid:document_id>/summary/', views.SummaryView.as_view(), name='generate-summary'),
    
    # Document analysis
    path('documents/<uuid:document_id>/analyze/', views.DocumentAnalysisView.as_view(), name='analyze-document'),
    
    # Citations
    path('documents/<uuid:document_id>/citations/', views.CitationListView.as_view(), name='citation-list'),
    
    # Plagiarism checks
    path('documents/<uuid:document_id>/plagiarism/', views.PlagiarismListView.as_view(), name='plagiarism-list'),
    
    # Conference suggestions
    path('documents/<uuid:document_id>/conferences/', views.ConferenceSuggestionsView.as_view(), name='conference-suggestions'),
    
    # Export functionality
    path('documents/<uuid:document_id>/export/', views.ExportDocumentView.as_view(), name='export-document'),
    
    # Analytics
    path('analytics/', views.AnalyticsView.as_view(), name='analytics'),
    
    # Health check
    path('health/', views.health_check, name='health-check'),
]
