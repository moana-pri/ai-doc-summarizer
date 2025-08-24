"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentUploadProps {
  onUpload: (files: File[]) => void
  isProcessing: boolean
}

export function DocumentUpload({ onUpload, isProcessing }: DocumentUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    disabled: isProcessing,
  })

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles)
      setSelectedFiles([])
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden",
              isDragActive
                ? "border-primary bg-gradient-to-br from-primary/10 to-accent/10 scale-105"
                : "border-border/50 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5",
              isProcessing && "opacity-50 cursor-not-allowed",
              "hover-lift",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-xl animate-pulse delay-1000"></div>

            <input {...getInputProps()} />
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent animate-float">
                  <Upload className="w-12 h-12 text-white" />
                </div>
              </div>
              {isDragActive ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">Drop the files here!</p>
                  <p className="text-muted-foreground">Release to upload your documents</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Drag & drop documents here
                  </p>
                  <p className="text-lg text-muted-foreground">or click to select files</p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <Sparkles className="w-4 h-4" />
                      PDF, DOC, DOCX
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                      <Zap className="w-4 h-4" />
                      TXT files
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedFiles.length > 0 && (
        <Card className="hover-lift glass-effect border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Selected Files ({selectedFiles.length})
              </h3>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-card rounded-xl hover-lift border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold">{file.name}</span>
                      <div className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={isProcessing}
                    className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={handleUpload}
              disabled={isProcessing}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Magic...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Analyze {selectedFiles.length} Document{selectedFiles.length !== 1 ? "s" : ""} with AI
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
