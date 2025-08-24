"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function DocumentUpload({ onUpload, isProcessing }) {
  const [selectedFiles, setSelectedFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
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

  const removeFile = (index) => {
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
      <Card className="overflow-hidden bg-slate-800/20 border-slate-700/50">
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden",
              isDragActive
                ? "border-blue-400 bg-gradient-to-br from-blue-500/10 to-purple-500/10 scale-105"
                : "border-slate-600/50 hover:border-blue-400/50 hover:bg-gradient-to-br hover:from-blue-500/5 hover:to-purple-500/5",
              isProcessing && "opacity-50 cursor-not-allowed",
              "hover:scale-[1.02]",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

            <input {...getInputProps()} />
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 animate-bounce">
                  <Upload className="w-12 h-12 text-white" />
                </div>
              </div>
              {isDragActive ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-400">Drop the files here!</p>
                  <p className="text-slate-400">Release to upload your documents</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Drag & drop documents here
                  </p>
                  <p className="text-lg text-slate-400">or click to select files</p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-400/30">
                      <Sparkles className="w-4 h-4" />
                      PDF, DOC, DOCX
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-400/30">
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
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-200">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Selected Files ({selectedFiles.length})
              </h3>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-700/50 to-slate-800/30 rounded-xl border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-200">{file.name}</span>
                      <div className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={isProcessing}
                    className="hover:bg-red-500/10 hover:text-red-400 transition-colors text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={handleUpload}
              disabled={isProcessing}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/25"
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
