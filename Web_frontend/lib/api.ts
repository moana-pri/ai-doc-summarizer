// API service for communicating with Django backend

export interface DocumentResults {
  id: string;
  name: string;
  file_type: string;
  size: number;
  uploaded_at: string;
  uploadedAt?: string;
  processed: boolean;
  summaries?: Summary[];
  citations?: Citation[];
  plagiarism_checks?: PlagiarismCheck[];
  conference_suggestions?: ConferenceSuggestion[];
  plagiarismScore?: number;
}

export interface Summary {
  id: string;
  content: string;
  word_count: number;
  generated_at: string;
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  confidence: number;
  detected_at: string;
}

export interface PlagiarismCheck {
  id: string;
  similarity_percentage: number;
  matched_sources: any[];
  status: string;
  checked_at: string;
}

export interface ConferenceSuggestion {
  id: string;
  conference_name: string;
  confidence_score: number;
  reasoning: string;
  suggested_at: string;
}

export interface Analytics {
  id: string;
  total_documents: number;
  total_processing_time: number;
  average_accuracy: number;
  success_rate: number;
  documents_today: number;
  citations_found: number;
  plagiarism_detected: number;
  conferences_matched: number;
  updated_at: string;
}

const API_BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async uploadDocument(file: File): Promise<{ document: DocumentResults }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/documents/upload/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    // Transform the response to match frontend expectations
    return {
      document: {
        ...result.document,
        uploadedAt: result.document.uploaded_at // Add uploadedAt for frontend compatibility
      }
    };
  }

  async listDocuments(): Promise<DocumentResults[]> {
    const documents = await this.request<DocumentResults[]>('/documents/');
    // Transform the response to match frontend expectations
    return documents.map(doc => ({
      ...doc,
      uploadedAt: doc.uploaded_at // Add uploadedAt for frontend compatibility
    }));
  }

  async getDocumentResults(documentId: string): Promise<{ document: DocumentResults }> {
    const document = await this.request<DocumentResults>(`/documents/${documentId}/`);
    return { 
      document: {
        ...document,
        uploadedAt: document.uploaded_at, // Add uploadedAt for frontend compatibility
        plagiarismScore: document.plagiarismScore || 0 // Ensure plagiarismScore is available
      }
    };
  }

  async generateSummary(documentId: string, maxWords: number = 200): Promise<Summary> {
    return this.request<Summary>(`/documents/${documentId}/summary/`, {
      method: 'POST',
      body: JSON.stringify({ max_words: maxWords }),
    });
  }

  async analyzeDocument(documentId: string): Promise<{ message: string; processing_time: number }> {
    return this.request<{ message: string; processing_time: number }>(`/documents/${documentId}/analyze/`, {
      method: 'POST',
    });
  }



  async getCitations(documentId: string): Promise<Citation[]> {
    return this.request<Citation[]>(`/documents/${documentId}/citations/`);
  }

  async getPlagiarismChecks(documentId: string): Promise<PlagiarismCheck[]> {
    return this.request<PlagiarismCheck[]>(`/documents/${documentId}/plagiarism/`);
  }

  async getConferenceSuggestions(documentId: string): Promise<ConferenceSuggestion[]> {
    return this.request<ConferenceSuggestion[]>(`/documents/${documentId}/conferences/`);
  }

  async getAnalytics(): Promise<Analytics> {
    return this.request<Analytics>('/analytics/');
  }

  async exportDocument(documentId: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/documents/${documentId}/export/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Export failed: ${response.status} ${response.statusText}`);
    }

    return response.blob();
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health/');
  }
}

export const apiService = new ApiService();
