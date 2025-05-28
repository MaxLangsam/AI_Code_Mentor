
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, File } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileContent: (content: string, filename: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileContent }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const content = reader.result as string;
        onFileContent(content, file.name);
        toast({
          title: "📁 File Uploaded!",
          description: `${file.name} has been loaded for code review.`,
        });
      };
      
      reader.readAsText(file);
    });
  }, [onFileContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/javascript': ['.js'],
      'text/typescript': ['.ts'],
      'text/x-python': ['.py'],
      'text/x-java-source': ['.java'],
      'text/x-c++src': ['.cpp', '.cc', '.cxx'],
      'text/x-rustsrc': ['.rs'],
      'text/html': ['.html'],
      'text/css': ['.css'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024, // 1MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive 
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2">
          <Upload className="w-5 h-5 text-gray-500" />
          <File className="w-5 h-5 text-gray-500" />
        </div>
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              Drag & drop code files here, or click to select
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports: .js, .ts, .py, .java, .cpp, .rs, .html, .css, .json
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
