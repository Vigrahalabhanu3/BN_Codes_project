import React from "react";
import { motion } from "framer-motion";

const skills = [
  "Python",
  "Aptitude",
  "Logical Reasoning",
  "React",
  "HTML/CSS",
  "Tailwind",
];


const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-12 text-center"
    >
     <motion.img
  src="https://res.cloudinary.com/dzu7g2yts/image/upload/v1752486998/IMG-20250420-WA0088_cjndtx.jpg"
  alt="Profile"
  className="w-60 h-60 sm:w-72 sm:h-72 rounded-full mx-auto mb-6 border-4 border-blue-600 shadow-xl object-cover"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
/>

      <motion.h1
        className="text-4xl font-bold mb-4 text-blue-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Hi, I'm <span className="text-blue-600">Bhanu Prasad</span> 👋
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        I'm currently pursuing my studies in <strong>KIET College</strong>.Fellow at <strong>NXTWAVE</strong> I’m
        passionate about <strong>coding</strong>, <strong>logical thinking</strong>, and helping
        others learn in a clear and simple way.
      </motion.p>

      <h2 className="text-2xl font-semibold text-blue-700 mt-10 mb-4">💼 Skills</h2>
      <ul className="flex flex-wrap justify-center gap-3 text-white">
        {skills.map((skill) => (
          <motion.li
            key={skill}
            className="bg-blue-600 px-4 py-2 rounded-full text-sm shadow-md hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            {skill}
          </motion.li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold text-blue-700 mt-10 mb-4">🌐 About This Website</h2>
      <motion.p
        className="text-gray-700 text-base leading-7 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        This platform is built to support students and job seekers by enhancing their skills in
        <strong> Aptitude</strong>, <strong>Reasoning</strong>, and <strong>Python</strong>.
        Whether you're preparing for competitive exams or placement drives, you'll find curated
        content, downloadable PDFs, and practical resources to guide your learning journey.
      </motion.p>
    </motion.div>
  );
};

export default About;
