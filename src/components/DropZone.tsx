
import React, { useState, useRef } from "react";
import { Folder, Upload } from "lucide-react";

interface DropZoneProps {
  onFilesDrop: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export const DropZone: React.FC<DropZoneProps> = ({
  onFilesDrop,
  accept,
  maxFiles = 1,
  maxSize = 100 // Default 100MB
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    
    // Check file type if accept is provided
    if (accept) {
      const acceptedTypes = accept.split(',');
      const validFiles = filesArray.filter(file => {
        const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
        return acceptedTypes.some(type => 
          type.trim() === extension || 
          type.trim() === file.type ||
          (type.includes('*') && file.type.startsWith(type.replace('*', '')))
        );
      });
      
      if (validFiles.length < filesArray.length) {
        alert("Some files are not of the accepted type");
      }
      
      filesArray.splice(0, filesArray.length, ...validFiles);
    }
    
    // Check file count
    if (filesArray.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      filesArray.splice(maxFiles);
    }
    
    // Check file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    const oversizedFiles = filesArray.filter(file => file.size > maxSizeBytes);
    
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the maximum size of ${maxSize}MB`);
      oversizedFiles.forEach(file => {
        const index = filesArray.indexOf(file);
        if (index > -1) filesArray.splice(index, 1);
      });
    }
    
    // Pass valid files to callback
    if (filesArray.length > 0) {
      onFilesDrop(filesArray);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
        isDragging ? "border-sat-blue bg-sat-blue/10" : "border-sat-gray/50 hover:border-sat-blue/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept={accept}
        className="hidden"
        multiple={maxFiles > 1}
      />
      
      <div className="flex flex-col items-center justify-center">
        {isDragging ? (
          <Upload className="h-8 w-8 text-sat-blue mb-2" />
        ) : (
          <Folder className="h-8 w-8 text-muted-foreground mb-2" />
        )}
        <p className="text-sm font-medium">
          {isDragging ? "Drop files here" : "Drag files here or click to browse"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {accept ? `Accepted formats: ${accept}` : "All file types supported"}
          {maxFiles > 1 ? ` (up to ${maxFiles} files)` : ""}
        </p>
      </div>
    </div>
  );
};
