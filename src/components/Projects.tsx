import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiDatabase, FiLayout } from 'react-icons/fi';

const projects = [
  {
    title: 'Student Management System',
    description: 'A comprehensive system to manage student records. Features include adding, updating, deleting, and searching for specific student functionality.',
    techStack: ['C Language', 'File Handling'],
    icon: <FiDatabase className="w-8 h-8 text-primary" />,
    color: 'from-blue-500 to-primary'
  },
  {
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive personal portfolio built to showcase skills and projects. Features smooth animations, dark mode, and a premium UI.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: <FiLayout className="w-8 h-8 text-secondary" />,
    color: 'from-primary to-secondary'
  },
  {
    title: 'Library Management System',
    description: 'An application designed for managing book issues and returns with a user-friendly interface to track inventory effectively.',
    techStack: ['Java', 'Swing', 'JDBC'],
    icon: <FiCode className="w-8 h-8 text-pink-500" />,
    color: 'from-secondary to-pink-500'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${project.color}`}></div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="bg-gray-100 dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-100 mb-3 group-hover:text-primary dark:group-hover:text-pink-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-gray-400 mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-pink-500/10 dark:text-pink-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                  <a href="#" className="text-slate-500 hover:text-primary dark:text-gray-400 dark:hover:text-pink-400 transition-colors" title="View Source">
                    <FiGithub size={20} />
                  </a>
                  <a href="#" className="text-slate-500 hover:text-primary dark:text-gray-400 dark:hover:text-pink-400 transition-colors" title="Live Preview">
                    <FiExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
