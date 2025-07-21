import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const AchievementsPanel: React.FC = () => {
  const { userStats } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Achievements
        </h3>
        <Award className="h-6 w-6 text-yellow-500" />
      </div>

      <div className="space-y-4">
        {userStats.achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            variants={itemVariants}
            className={`p-4 rounded-lg border ${
              achievement.unlockedAt
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <h4 className={`font-semibold ${
                  achievement.unlockedAt
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-400'
                }`}>
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-500">
                  {achievement.description}
                </p>
                {achievement.unlockedAt && (
                  <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                    Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsPanel; 