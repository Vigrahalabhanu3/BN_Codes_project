/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, BookOpen } from 'lucide-react';
// @ts-ignore
import { getPDFsByCategory, addUpdateListener, removeUpdateListener } from '../data/pdfData';
// @ts-ignore
import PDFList from '../components/PDFList';

const Aptitude = () => {
  const [pdfs, setPdfs] = useState<{ pages: number; category: string; [key: string]: any }[]>([]);

  useEffect(() => {
    // Load initial PDFs
    setPdfs(getPDFsByCategory('aptitude'));

    // Add listener for real-time updates
    const updatePDFs = () => {
      setPdfs(getPDFsByCategory('aptitude'));
    };

    addUpdateListener('aptitude', updatePDFs);

    // Cleanup listener on unmount
    return () => {
      removeUpdateListener('aptitude', updatePDFs);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
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
            <Calculator className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quantitative Aptitude PDFs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Download comprehensive aptitude PDFs for competitive exam preparation.
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
            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {pdfs.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">PDF Resources</div>
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
          <PDFList pdfs={pdfs} title="Aptitude Study Materials" category="aptitude" />
        </motion.div>

        {/* Study Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Study Tips for Quantitative Aptitude</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">📚 Foundation First</h4>
              <p className="text-green-100">Start with basic concepts and gradually move to complex problems.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⏰ Time Management</h4>
              <p className="text-green-100">Practice solving problems within time limits to improve speed.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📝 Regular Practice</h4>
              <p className="text-green-100">Consistent daily practice is key to mastering aptitude questions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 Review Mistakes</h4>
              <p className="text-green-100">Always analyze your errors and learn from them.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Aptitude;