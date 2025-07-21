import { motion } from 'framer-motion';
import { FaPython, FaCalculator, FaBrain } from 'react-icons/fa';
import DashboardCard from '../components/DashboardCard';
import { useProgress } from '../contexts/ProgressContext';
import AchievementsPanel from '../components/AchievementsPanel';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const Dashboard = () => {
  const { getProgress } = useProgress();

  const progressData = [
    { title: 'Python', percentage: getProgress('python'), color: 'blue', Icon: FaPython },
    { title: 'Aptitude', percentage: getProgress('aptitude'), color: 'green', Icon: FaCalculator },
    { title: 'Reasoning', percentage: getProgress('reasoning'), color: 'purple', Icon: FaBrain },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome Back, Learner!
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={pageVariants}
        >
          {progressData.map((data, index) => (
            <DashboardCard
              key={index}
              title={data.title}
              percentage={data.percentage}
              color={data.color}
              Icon={data.Icon}
            />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          <AchievementsPanel />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard; 