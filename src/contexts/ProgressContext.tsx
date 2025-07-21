import React, { createContext, useContext, useState, useEffect } from 'react';

interface Progress {
  python: string[];
  aptitude: string[];
  reasoning: string[];
}

interface ProgressContextType {
  completedPDFs: Progress;
  markAsCompleted: (category: keyof Progress, pdfId: string) => void;
  getProgress: (category: keyof Progress) => number;
}

const defaultProgress: Progress = {
  python: [],
  aptitude: [],
  reasoning: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedPDFs, setCompletedPDFs] = useState<Progress>(() => {
    const saved = localStorage.getItem('completedPDFs');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem('completedPDFs', JSON.stringify(completedPDFs));
  }, [completedPDFs]);

  const markAsCompleted = (category: keyof Progress, pdfId: string) => {
    setCompletedPDFs(prev => {
      const isCompleted = prev[category].includes(pdfId);
      if (isCompleted) {
        return {
          ...prev,
          [category]: prev[category].filter(id => id !== pdfId)
        };
      }
      return {
        ...prev,
        [category]: [...prev[category], pdfId]
      };
    });
  };

  const getProgress = (category: keyof Progress) => {
    const totalPDFs = {
      python: 13, // Update these numbers based on your actual PDF counts
      aptitude: 18,
      reasoning: 6
    };
    
    const completed = completedPDFs[category].length;
    const total = totalPDFs[category];
    return Math.round((completed / total) * 100);
  };

  return (
    <ProgressContext.Provider value={{ completedPDFs, markAsCompleted, getProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 