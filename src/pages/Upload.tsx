import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, Lock, FileText, CheckCircle, AlertCircle, Code, Calculator, Brain, LucideIcon } from 'lucide-react';
import { addPDFToCategory } from '../data/pdfData';

interface FormData {
  title: string;
  description: string;
  category: string;
  targetPage: string;
}

interface UploadStatus {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface PageOption {
  value: 'python' | 'aptitude' | 'reasoning';
  label: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple';
  description: string;
}

const Upload: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    targetPage: ''
  });
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'bhanu7671') {
      setIsAuthenticated(true);
      setUploadStatus(null);
    } else {
      setUploadStatus({ type: 'error', message: 'Invalid password! Try: its Not for you ' });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus(null);
      
      if (!formData.title) {
        const fileName = file.name.replace('.pdf', '').replace(/[_-]/g, ' ');
        setFormData(prev => ({
          ...prev,
          title: fileName.charAt(0).toUpperCase() + fileName.slice(1)
        }));
      }
    } else {
      setUploadStatus({ type: 'error', message: 'Please select a PDF file only.' });
      if(e.target) e.target.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const simulateFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = Date.now();
        const fileName = file.name.replace(/\s+/g, '_').toLowerCase().replace('.pdf', '');
        const simulatedURL = `https://res.cloudinary.com/demo/raw/upload/v${timestamp}/${fileName}.pdf`;
        resolve(simulatedURL);
      }, 2000);
    });
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedFile || !formData.title || !formData.description || !formData.targetPage) {
      setUploadStatus({ type: 'error', message: 'Please fill all required fields and select a PDF file.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: 'info', message: 'Uploading PDF... Please wait.' });

    try {
      const uploadedURL = await simulateFileUpload(selectedFile);
      
      const pdfData = {
        title: formData.title,
        description: formData.description,
        category: formData.category || 'General',
        url: uploadedURL,
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
        pages: Math.floor(Math.random() * 50) + 20
      };

      const newPDF = addPDFToCategory(formData.targetPage as 'python' | 'aptitude' | 'reasoning', pdfData);
      
      if (newPDF) {
        setUploadStatus({ 
          type: 'success', 
          message: `✅ PDF "${formData.title}" has been successfully uploaded to the ${formData.targetPage.charAt(0).toUpperCase() + formData.targetPage.slice(1)} page! You can now view it in the ${formData.targetPage} section.` 
        });
        
        setSelectedFile(null);
        setFormData({
          title: '',
          description: '',
          category: '',
          targetPage: ''
        });
        
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error('Failed to add PDF to category');
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const pageOptions: PageOption[] = [
    { 
      value: 'python', 
      label: 'Python Page', 
      icon: Code, 
      color: 'blue',
      description: 'Programming tutorials and Python resources'
    },
    { 
      value: 'aptitude', 
      label: 'Aptitude Page', 
      icon: Calculator, 
      color: 'green',
      description: 'Quantitative aptitude and math problems'
    },
    { 
      value: 'reasoning', 
      label: 'Reasoning Page', 
      icon: Brain, 
      color: 'purple',
      description: 'Logical and verbal reasoning materials'
    }
  ];

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8"
      >
        <div className="max-w-md w-full mx-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <Lock className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Access Required
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please enter the admin password to access the PDF upload panel.
              </p>
            </div>

            {uploadStatus && uploadStatus.type === 'error' && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {uploadStatus.message}
              </div>
            )}

            <form onSubmit={handleAuth}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Access Upload Panel
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Password:</strong> sorry, its only for admin use.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <UploadIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PDF Upload Panel
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload new PDF resources to Python, Aptitude, or Reasoning pages. Files will be instantly available for download.
          </p>
        </motion.div>

        {/* Upload Status */}
        {uploadStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center ${
              uploadStatus.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                : uploadStatus.type === 'info'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
            }`}
          >
            {uploadStatus.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            ) : uploadStatus.type === 'info' ? (
              <UploadIcon className="h-5 w-5 mr-2 flex-shrink-0 animate-pulse" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            )}
            <span>{uploadStatus.message}</span>
          </motion.div>
        )}

        {/* Upload Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleUpload}>
            {/* Target Page Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Select Target Page *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pageOptions.map((page) => {
                  const IconComponent = page.icon;
                  return (
                    <label key={page.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="targetPage"
                        value={page.value}
                        checked={formData.targetPage === page.value}
                        onChange={handleInputChange}
                        className="sr-only"
                        required
                      />
                      <div className={`p-6 border-2 rounded-lg text-center transition-all duration-200 ${
                        formData.targetPage === page.value 
                          ? `border-${page.color}-500 bg-${page.color}-50 dark:bg-${page.color}-900/20 shadow-lg` 
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 hover:shadow-md'
                      }`}>
                        <IconComponent className={`h-8 w-8 mx-auto mb-3 ${
                          formData.targetPage === page.value 
                            ? `text-${page.color}-600 dark:text-${page.color}-400` 
                            : 'text-gray-500'
                        }`} />
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {page.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {page.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select PDF File *
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="fileInput"
                  accept=".pdf"
                  required
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <UploadIcon className="h-5 w-5 mr-2" />
                  Choose PDF File
                </label>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Maximum file size: 50MB
                </p>
                {selectedFile && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-green-800 dark:text-green-200 font-medium">
                        {selectedFile.name}
                      </span>
                    </div>
                    <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* PDF Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  PDF Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter PDF title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Fundamentals, Advanced, etc."
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter PDF description"
                required
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Logout
              </button>
              <button
                type="submit"
                disabled={!selectedFile || !formData.title || !formData.description || !formData.targetPage || isUploading}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Upload PDF
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            📋 Upload Instructions
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
            <li>• <strong>Select Target Page:</strong> Choose where you want the PDF to appear (Python, Aptitude, or Reasoning)</li>
            <li>• <strong>File Requirements:</strong> Only PDF files are accepted (max 50MB)</li>
            <li>• <strong>Title & Description:</strong> Provide clear, descriptive information about the content</li>
            <li>• <strong>Category:</strong> Optional but helps with organization and filtering</li>
            <li>• <strong>Instant Availability:</strong> Once uploaded, PDFs appear immediately on the selected page</li>
            <li>• <strong>Download Ready:</strong> All uploaded PDFs are immediately available for viewing and downloading</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Upload;