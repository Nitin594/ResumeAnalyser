"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const MAX_SIZE = 5 * 1024 * 1024;

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const allowedExtensions = [".pdf", ".doc", ".docx"];

const errorToastStyle: React.CSSProperties = {
  background: "#ef4444",
  color: "#ffffff",
  borderColor: "#ef4444",
};

const successToastStyle: React.CSSProperties = {
  background: "#22c55e",
  color: "#ffffff",
  borderColor: "#22c55e",
};

const UploadBox = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    const fileName = file?.name.toLowerCase();

    // extension check
    const hasValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );
    if (!hasValidExtension) {
      toast.error("Only PDF, DOC, and DOCX files are allowed.", {
        position: "top-center",
        style: errorToastStyle,
      });
      return "Invalid file extension.";
    }
    // MIME type check (more secure than checking file extension)
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a PDF, DOC, or DOCX file.", {
        position: "top-center",
        style: errorToastStyle,
      });
      return "Invalid file type.";
    }
    // size check
    if (file.size > MAX_SIZE) {
      toast.error("File size exceeds the 5MB limit.", {
        position: "top-center",
        style: errorToastStyle,
      });
      return "File size exceeds the 5MB limit.";
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }
    setError(null);
    setFile(file);
    toast.success(`File ${file.name} selected successfully!`, {
      position: "top-center",
      style: successToastStyle,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    handleFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = e.dataTransfer.files[0];
    if (!dropped) return;
    handleFile(dropped);
    setDragActive(false);
  };

  return (
    <div className="flex flex-col">
      {/* Hidden input */}
      <input
        type="file"
        accept=".doc, .docx, .pdf"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
      />
      {/* Clickable area */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragActive(false);
          }
        }}
        className={`h-70 w-full mx-auto cursor-pointer my-4 rounded-xl border-2 flex flex-col items-center justify-center hover:scale-[1.01] transition-transform 
            ${
              dragActive
                ? "border-purple-600 border-solid bg-purple-50 dark:bg-indigo-950 shadow-lg shadow-purple-200 scale-[1.02]"
                : "border-dashed border-purple-600"
            }`}
      >
        <Image src="/upload.png" alt="Logo" width={150} height={150} />
        <p className="text-center text-gray-500 mt-4">
          {dragActive
            ? "Drop your resume here 👇"
            : "Drag and drop your resume here, or click to select a file."}
        </p>
        <p className="text-center text-gray-500">
          Accepted file types: DOC, DOCX, PDF
        </p>
        <p className="text-sm text-muted-foreground">PDF, DOCX up to 5MB</p>
        {file && (
          <p className="mt-2 text-sm font-medium text-green-600">Selected: {file.name}</p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default UploadBox;
