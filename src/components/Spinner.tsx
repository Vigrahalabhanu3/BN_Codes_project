import { motion } from 'framer-motion';

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <motion.div
      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      aria-label="Loading..."
      initial={{ scale: 0.8, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
  </div>
);

export default Spinner; 