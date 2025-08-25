from rest_framework import serializers
from .models import Document, Summary, Citation, PlagiarismCheck, ConferenceSuggestion, Analytics


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'file_type', 'size', 'uploaded_at', 'processed']


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ['id', 'content', 'word_count', 'generated_at']


class CitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citation
        fields = ['id', 'text', 'source', 'confidence', 'detected_at']


class PlagiarismCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlagiarismCheck
        fields = ['id', 'similarity_percentage', 'matched_sources', 'status', 'checked_at']


class ConferenceSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConferenceSuggestion
        fields = ['id', 'conference_name', 'confidence_score', 'reasoning', 'suggested_at']


class AnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analytics
        fields = [
            'id', 'total_documents', 'total_processing_time', 'average_accuracy',
            'success_rate', 'documents_today', 'citations_found', 'plagiarism_detected',
            'conferences_matched', 'updated_at'
        ]


class DocumentResultsSerializer(serializers.ModelSerializer):
    """Serializer for complete document results including all related data"""
    summaries = SummarySerializer(many=True, read_only=True)
    citations = CitationSerializer(many=True, read_only=True)
    plagiarism_checks = PlagiarismCheckSerializer(many=True, read_only=True)
    conference_suggestions = ConferenceSuggestionSerializer(many=True, read_only=True)
    plagiarismScore = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = [
            'id', 'name', 'file_type', 'size', 'uploaded_at', 'processed',
            'summaries', 'citations', 'plagiarism_checks', 'conference_suggestions', 'plagiarismScore'
        ]
    
    def get_plagiarismScore(self, obj):
        """Get the plagiarism score from the most recent plagiarism check"""
        latest_check = obj.plagiarism_checks.order_by('-checked_at').first()
        if latest_check:
            return latest_check.similarity_percentage
        return 0.0
