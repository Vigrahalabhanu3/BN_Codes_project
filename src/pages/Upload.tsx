import { motion } from 'framer-motion';

const Upload = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-4">Upload Page</h1>
        <p className="text-gray-600 dark:text-gray-300">Admin panel to upload and manage learning materials will be here soon.</p>
      </div>
    </motion.div>
  );
};

export default Upload;
