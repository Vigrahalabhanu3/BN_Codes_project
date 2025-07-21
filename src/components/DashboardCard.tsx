import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface DashboardCardProps {
  title: string;
  percentage: number;
  color: string;
  Icon: IconType;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
};

const DashboardCard = ({ title, percentage, color, Icon }: DashboardCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between"
      variants={cardVariants}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
            <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
          </div>
          <span className={`text-2xl font-bold text-${color}-500`}>{percentage}%</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your progress in {title.toLowerCase()} learning.
        </p>
      </div>

      <div className="mt-6">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 w-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-${color}-500`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard; 