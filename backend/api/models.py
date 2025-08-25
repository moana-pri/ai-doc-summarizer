from django.db import models
from django.utils import timezone
import uuid


class Document(models.Model):
    """Model for uploaded documents"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/')
    file_type = models.CharField(max_length=50)
    size = models.BigIntegerField()
    uploaded_at = models.DateTimeField(default=timezone.now)
    processed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-uploaded_at']


class Summary(models.Model):
    """Model for document summaries"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='summaries')
    content = models.TextField()
    word_count = models.IntegerField()
    generated_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Summary for {self.document.name}"
    
    class Meta:
        ordering = ['-generated_at']


class Citation(models.Model):
    """Model for detected citations"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='citations')
    text = models.TextField()
    source = models.CharField(max_length=500)
    confidence = models.FloatField(default=0.0)
    detected_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Citation: {self.text[:50]}..."
    
    class Meta:
        ordering = ['-detected_at']


class PlagiarismCheck(models.Model):
    """Model for plagiarism detection results"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='plagiarism_checks')
    similarity_percentage = models.FloatField(default=0.0)
    matched_sources = models.JSONField(default=list)
    status = models.CharField(max_length=50, default='pending')
    checked_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Plagiarism check for {self.document.name}"
    
    class Meta:
        ordering = ['-checked_at']


class ConferenceSuggestion(models.Model):
    """Model for conference suggestions"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='conference_suggestions')
    conference_name = models.CharField(max_length=255)
    confidence_score = models.FloatField(default=0.0)
    reasoning = models.TextField()
    suggested_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Conference: {self.conference_name}"
    
    class Meta:
        ordering = ['-confidence_score']


class Analytics(models.Model):
    """Model for analytics data"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_documents = models.IntegerField(default=0)
    total_processing_time = models.FloatField(default=0.0)
    average_accuracy = models.FloatField(default=0.0)
    success_rate = models.FloatField(default=100.0)
    documents_today = models.IntegerField(default=0)
    citations_found = models.IntegerField(default=0)
    plagiarism_detected = models.IntegerField(default=0)
    conferences_matched = models.IntegerField(default=0)
    updated_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Analytics - {self.updated_at.strftime('%Y-%m-%d %H:%M')}"
    
    class Meta:
        ordering = ['-updated_at']
        verbose_name_plural = 'Analytics'
