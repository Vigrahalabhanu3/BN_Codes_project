/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen } from 'lucide-react';
import { getPDFsByCategory, addUpdateListener, removeUpdateListener } from '../data/pdfData';
import PDFList from '../components/PDFList.jsx';

const Python = () => {
  const [pdfs, setPdfs] = useState<{ pages: number; category: string; [key: string]: any }[]>([]);

  useEffect(() => {
    // Load initial PDFs
    setPdfs(getPDFsByCategory('python'));

    // Add listener for real-time updates
    const updatePDFs = () => {
      setPdfs(getPDFsByCategory('python'));
    };

    addUpdateListener('python', updatePDFs);

    // Cleanup listener on unmount
    return () => {
      removeUpdateListener('python', updatePDFs);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <Code className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Python Learning Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Download comprehensive Python PDFs covering everything from basics to advanced topics.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {pdfs.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">PDF Resources</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Code className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {pdfs.reduce((total, pdf) => total + pdf.pages, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Pages</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {[...new Set(pdfs.map(pdf => pdf.category))].length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </motion.div>

        {/* PDF List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <PDFList pdfs={pdfs} title="Python Study Materials" category="python" />
        </motion.div>

        {/* Learning Path */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-green-500 to-purple-600 rounded-lg shadow-lg p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Recommended Learning Path</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🚀 Beginner</h4>
              <p className="text-blue-100">Start with Python Basics and Fundamentals</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚡ Intermediate</h4>
              <p className="text-blue-100">Move to OOP and Data Structures</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Advanced</h4>
              <p className="text-blue-100">Explore Web Development and Machine Learning</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Python;