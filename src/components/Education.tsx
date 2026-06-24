import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';

const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-pink-500/10 flex items-center justify-center flex-shrink-0">
              <FiAward className="w-10 h-10 text-primary dark:text-pink-400" />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Diploma in Computer Science Engineering
              </h3>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-600 dark:text-gray-400 mb-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 justify-center">
                  <FiMapPin className="text-primary dark:text-pink-400" />
                  <span>Pune, Maharashtra</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <FiCalendar className="text-secondary" />
                  <span>Present</span>
                </div>
              </div>
              
              <div className="inline-block bg-gradient-to-r from-primary to-secondary p-[2px] rounded-lg">
                <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-lg h-full">
                  <span className="text-slate-700 dark:text-gray-300 font-medium">Current Percentage: </span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    81.53%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
