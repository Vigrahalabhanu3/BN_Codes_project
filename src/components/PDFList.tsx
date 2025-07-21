import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, FileIcon, Search, CheckCircle } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { useUser } from '../contexts/UserContext';

export interface PDF {
  id: string;
  title: string;
  url: string;
  category?: string;
  pages?: number;
  size?: string;
  uploadDate?: string;
  description?: string;
}

interface PDFListProps {
  pdfs: PDF[];
  title: string;
  category: string;
}

const PDFList: React.FC<PDFListProps> = ({ pdfs, title, category }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { completedPDFs, markAsCompleted } = useProgress();
  const { addRecentView, unlockAchievement } = useUser();

  const categories = [...new Set(pdfs.map(pdf => pdf.category))];

  const filteredPDFs = pdfs.filter(pdf => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pdf.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || pdf.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (pdf: PDF) => {
    try {
      const link = document.createElement('a');
      link.href = pdf.url;
      link.download = `${pdf.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = `Downloading: ${pdf.title}`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const isCompleted = (pdfId: string) => {
    return completedPDFs[category as keyof typeof completedPDFs]?.includes(pdfId);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const handleViewPDF = (pdf: PDF) => {
    window.open(pdf.url, '_blank');
    addRecentView({ id: pdf.id, title: pdf.title, category });
  };

  const handleMarkAsCompleted = (pdfId: string) => {
    if (!isCompleted(pdfId)) {
      markAsCompleted(category as keyof typeof completedPDFs, pdfId);
      unlockAchievement('first_completion');
    } else {
      markAsCompleted(category as keyof typeof completedPDFs, pdfId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title} ({filteredPDFs.length})
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search PDFs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}

          {(searchTerm || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {(searchTerm || selectedCategory) && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              Search: "{searchTerm}"
            </span>
          )}
          {selectedCategory && (
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              Category: {selectedCategory}
            </span>
          )}
        </div>
      )}
      
      {filteredPDFs.length === 0 ? (
        <div className="text-center py-12">
          <FileIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No PDFs found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || selectedCategory ? 'Try adjusting your search criteria.' : 'No PDFs available in this category yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPDFs.map((pdf, index) => (
            <motion.div
              key={pdf.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isCompleted(pdf.id) ? 'border-2 border-green-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <FileText className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      {pdf.category}
                    </span>
                    {isCompleted(pdf.id) && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {pdf.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {pdf.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <FileIcon size={14} className="mr-1" />
                      {pdf.size}
                    </span>
                    <span>{pdf.pages} pages</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} className="mr-1" />
                    Uploaded: {pdf.uploadDate
                      ? new Date(pdf.uploadDate).toLocaleDateString()
                      : 'Unknown'}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewPDF(pdf)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <FileText size={16} className="mr-1" />
                    View PDF
                  </button>
                  <button
                    onClick={() => handleDownload(pdf)}
                    className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                    title="Download PDF"
                  >
                    <Download size={16} />
                  </button>
                </div>

                <button
                  onClick={() => handleMarkAsCompleted(pdf.id)}
                  className={`w-full mt-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                    isCompleted(pdf.id)
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                  }`}
                >
                  {isCompleted(pdf.id) ? 'Completed ✓' : 'Mark as Completed'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDFList; 