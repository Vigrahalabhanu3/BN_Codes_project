import React, { createContext, useContext, useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
}

interface RecentView {
  id: string;
  title: string;
  category: string;
  timestamp: string;
}

interface UserStats {
  totalStudyTime: number;
  completedPDFs: number;
  achievements: Achievement[];
  streak: StudyStreak;
  recentViews: RecentView[];
  searchHistory: string[];
}

interface UserContextType {
  userStats: UserStats;
  updateStudyTime: (minutes: number) => void;
  addRecentView: (view: Omit<RecentView, 'timestamp'>) => void;
  addSearchTerm: (term: string) => void;
  checkAndUpdateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first_completion',
    title: 'First Steps',
    description: 'Complete your first PDF',
    icon: '🎯'
  },
  {
    id: 'study_streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '🔥'
  },
  {
    id: 'python_master',
    title: 'Python Master',
    description: 'Complete all Python PDFs',
    icon: '🐍'
  },
  {
    id: 'aptitude_ace',
    title: 'Aptitude Ace',
    description: 'Complete all Aptitude PDFs',
    icon: '🧮'
  },
  {
    id: 'reasoning_expert',
    title: 'Reasoning Expert',
    description: 'Complete all Reasoning PDFs',
    icon: '🧠'
  }
];

const defaultUserStats: UserStats = {
  totalStudyTime: 0,
  completedPDFs: 0,
  achievements: defaultAchievements,
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: new Date().toISOString()
  },
  recentViews: [],
  searchHistory: []
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('userStats');
    return saved ? JSON.parse(saved) : defaultUserStats;
  });

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  const updateStudyTime = (minutes: number) => {
    setUserStats(prev => ({
      ...prev,
      totalStudyTime: prev.totalStudyTime + minutes
    }));
    checkAndUpdateStreak();
  };

  const addRecentView = (view: Omit<RecentView, 'timestamp'>) => {
    setUserStats(prev => ({
      ...prev,
      recentViews: [
        { ...view, timestamp: new Date().toISOString() },
        ...prev.recentViews.filter(v => v.id !== view.id)
      ].slice(0, 10) // Keep only last 10 views
    }));
  };

  const addSearchTerm = (term: string) => {
    setUserStats(prev => ({
      ...prev,
      searchHistory: [
        term,
        ...prev.searchHistory.filter(t => t !== term)
      ].slice(0, 20) // Keep only last 20 searches
    }));
  };

  const checkAndUpdateStreak = () => {
    const today = new Date();
    const lastStudy = new Date(userStats.streak.lastStudyDate);
    const diffDays = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));

    setUserStats(prev => {
      let newStreak = prev.streak.currentStreak;
      if (diffDays === 0) {
        return prev; // Already studied today
      } else if (diffDays === 1) {
        newStreak += 1; // Continue streak
      } else {
        newStreak = 1; // Reset streak
      }

      return {
        ...prev,
        streak: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, prev.streak.longestStreak),
          lastStudyDate: today.toISOString()
        }
      };
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setUserStats(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement =>
        achievement.id === achievementId && !achievement.unlockedAt
          ? { ...achievement, unlockedAt: new Date().toISOString() }
          : achievement
      )
    }));
  };

  return (
    <UserContext.Provider value={{
      userStats,
      updateStudyTime,
      addRecentView,
      addSearchTerm,
      checkAndUpdateStreak,
      unlockAchievement
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 