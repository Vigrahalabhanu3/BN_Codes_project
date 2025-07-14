import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Brain, Calculator, Upload, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Python Learning',
      description: 'Comprehensive Python tutorials and exercises from basics to advanced topics.',
      link: '/python',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Calculator,
      title: 'Aptitude Materials',
      description: 'Quantitative aptitude PDFs and practice materials for competitive exams.',
      link: '/aptitude',
      color: 'bg-green-500',
      lightColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Brain,
      title: 'Reasoning Resources',
      description: 'Logical and verbal reasoning materials to sharpen your analytical skills.',
      link: '/reasoning',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: Upload,
      title: 'Content Upload',
      description: 'Admin panel to upload and manage learning materials and resources.',
      link: '/upload',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">BN_Codes</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your comprehensive platform for Python programming, aptitude preparation, 
              and reasoning skill development. Learn, practice, and excel!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/python"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Start Learning Python
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/aptitude"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Explore Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our comprehensive collection of learning materials, from programming tutorials 
              to competitive exam preparation resources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  to={feature.link}
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 ${feature.lightColor} rounded-lg flex items-center justify-center mb-6`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color.split('-')[1]}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      Explore
                      <ArrowRight size={16} className="ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Python Topics</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Practice Materials</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Access</div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;