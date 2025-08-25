from django.contrib import admin
from .models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion, Analytics


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['name', 'file_type', 'size', 'uploaded_at', 'processed']
    list_filter = ['file_type', 'processed', 'uploaded_at']
    search_fields = ['name']
    readonly_fields = ['id', 'uploaded_at']
    ordering = ['-uploaded_at']


@admin.register(Summary)
class SummaryAdmin(admin.ModelAdmin):
    list_display = ['document', 'word_count', 'generated_at']
    list_filter = ['generated_at']
    search_fields = ['document__name', 'content']
    readonly_fields = ['id', 'generated_at']
    ordering = ['-generated_at']


@admin.register(Citation)
class CitationAdmin(admin.ModelAdmin):
    list_display = ['document', 'text', 'source', 'confidence', 'detected_at']
    list_filter = ['confidence', 'detected_at']
    search_fields = ['document__name', 'text', 'source']
    readonly_fields = ['id', 'detected_at']
    ordering = ['-detected_at']


@admin.register(PlagiarismCheck)
class PlagiarismCheckAdmin(admin.ModelAdmin):
    list_display = ['document', 'similarity_percentage', 'status', 'checked_at']
    list_filter = ['status', 'checked_at']
    search_fields = ['document__name']
    readonly_fields = ['id', 'checked_at']
    ordering = ['-checked_at']


@admin.register(ConferenceSuggestion)
class ConferenceSuggestionAdmin(admin.ModelAdmin):
    list_display = ['document', 'conference_name', 'confidence_score', 'suggested_at']
    list_filter = ['conference_name', 'suggested_at']
    search_fields = ['document__name', 'conference_name']
    readonly_fields = ['id', 'suggested_at']
    ordering = ['-confidence_score']


@admin.register(Analytics)
class AnalyticsAdmin(admin.ModelAdmin):
    list_display = ['total_documents', 'success_rate', 'documents_today', 'updated_at']
    readonly_fields = ['id', 'updated_at']
    ordering = ['-updated_at']
    
    def has_add_permission(self, request):
        # Only allow one analytics record
        return not Analytics.objects.exists()
