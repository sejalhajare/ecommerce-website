import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full"></div>
            
            <p className="text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
              I am a Computer Science diploma student with a strong interest in software development, web technologies, and problem-solving.
            </p>
            <p className="text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
              I enjoy learning new technologies and building creative digital solutions. I am dedicated, hardworking, and always eager to improve my technical skills.
            </p>
            <p className="text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed relative z-10">
              My journey in tech is driven by curiosity and a desire to create software that makes a difference. When I'm not coding, you can find me exploring the latest tech trends and refining my skills.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-slate-800 dark:text-gray-200 font-medium">Location:</span>
                <span className="text-slate-600 dark:text-gray-400">Pune, India</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-slate-800 dark:text-gray-200 font-medium">Email:</span>
                <span className="text-slate-600 dark:text-gray-400">hsejal087@gmail.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
