import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { Award, BarChart2, Clock, Eye, Flame } from 'lucide-react';
import AchievementsPanel from '../components/AchievementsPanel';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const UserProfile = () => {
  const { userStats } = useUser();

  const StatCard = ({ icon, label, value, color }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center space-x-4"
    >
      <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/30`}>
        {icon}
      </div>
      <div>
        <div className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>{value}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </motion.div>
  );

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
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Your Profile & Stats
        </motion.h1>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" variants={pageVariants}>
          <StatCard
            icon={<Clock className="h-6 w-6 text-blue-500" />}
            label="Total Study Time"
            value={`${userStats.totalStudyTime} min`}
            color="blue"
          />
          <StatCard
            icon={<Flame className="h-6 w-6 text-red-500" />}
            label="Current Streak"
            value={`${userStats.streak.currentStreak} days`}
            color="red"
          />
          <StatCard
            icon={<Award className="h-6 w-6 text-yellow-500" />}
            label="Longest Streak"
            value={`${userStats.streak.longestStreak} days`}
            color="yellow"
          />
          <StatCard
            icon={<BarChart2 className="h-6 w-6 text-green-500" />}
            label="PDFs Completed"
            value={userStats.completedPDFs}
            color="green"
          />
        </motion.div>

        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <AchievementsPanel />
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-3">
              {userStats.recentViews.length > 0 ? (
                userStats.recentViews.map(view => (
                  <div key={view.id} className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{view.title}</p>
                      <p className="text-sm text-gray-500">{view.category}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent activity yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile; 