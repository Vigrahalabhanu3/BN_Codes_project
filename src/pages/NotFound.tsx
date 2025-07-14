import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8"
    >
      <div className="max-w-md w-full mx-4 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              404
            </div>
            <Search className="h-16 w-16 text-gray-400 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Don't worry, let's get you back on track!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Home size={20} className="mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Or explore these popular sections:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/python"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Python Topics
              </Link>
              <Link
                to="/aptitude"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Aptitude PDFs
              </Link>
              <Link
                to="/reasoning"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reasoning
              </Link>
              <Link
                to="/upload"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Upload Content
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;