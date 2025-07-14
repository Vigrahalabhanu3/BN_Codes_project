// src/pages/Interview.tsx

import React from 'react';

const Interview = () => {
  const pdfData = [
    {
      title: "DSA: Top 100 Coding Questions",
      url: "https://res.cloudinary.com/dzu7g2yts/image/upload/v1752497076/DSA_top_100_nkl04h.pdf",
    },
    {
      title: "System Design: Basics to Advanced",
      url: "https://res.cloudinary.com/yourcloudname/raw/upload/v1/interview/system-design.pdf",
    },
    {
      title: "HR Round: Common Q&A",
      url: "https://res.cloudinary.com/yourcloudname/raw/upload/v1/interview/hr-questions.pdf",
    },
    {
      title: "Resume Building & Tips",
      url: "https://res.cloudinary.com/dzu7g2yts/image/upload/v1752498478/resume_buliding_steps_zjih1q.pdf",
    },
    {
      title: "Interview Strategy Guide",
      url: "https://res.cloudinary.com/yourcloudname/raw/upload/v1/interview/interview-strategy.pdf",
    },
    {
      title: "DSA: Patterns Cheat Sheet",
      url: "https://res.cloudinary.com/yourcloudname/raw/upload/v1/interview/dsa-patterns.pdf",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-300">
        📚 Interview Preparation PDFs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pdfData.map((pdf, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {pdf.title}
            </h2>

            <div className="w-full h-64 overflow-hidden rounded-lg border">
              <iframe
                src={pdf.url}
                title={pdf.title}
                className="w-full h-full"
              ></iframe>
            </div>

            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              View / Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;
