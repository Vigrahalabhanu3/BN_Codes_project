/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen } from 'lucide-react';
import { getPDFsByCategory, addUpdateListener, removeUpdateListener } from '../data/pdfData';
import PDFList from '../components/PDFList';

const Reasoning = () => {
  const [pdfs, setPdfs] = useState<{ pages: number; category: string; [key: string]: any }[]>([]);

  useEffect(() => {
    // Load initial PDFs
    setPdfs(getPDFsByCategory('reasoning'));

    // Add listener for real-time updates
    const updatePDFs = () => {
      setPdfs(getPDFsByCategory('reasoning'));
    };

    addUpdateListener('reasoning', updatePDFs);

    // Cleanup listener on unmount
    return () => {
      removeUpdateListener('reasoning', updatePDFs);
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
            <Brain className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Logical & Verbal Reasoning PDFs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Download comprehensive reasoning PDFs to enhance your logical thinking abilities.
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
            <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {pdfs.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Study Guides</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
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
          <PDFList pdfs={pdfs} title="Reasoning Study Materials" category="reasoning" />
        </motion.div>

        {/* Reasoning Types */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Types of Reasoning Covered
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-3xl mb-2">🧩</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Logical</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pattern recognition and logical deduction
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Verbal</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Language-based reasoning and comprehension
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Analytical</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Data analysis and interpretation
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-3xl mb-2">🔍</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Critical</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evaluation and critical thinking
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reasoning;