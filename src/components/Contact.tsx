import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Contact Information</h3>
              <p className="text-slate-600 dark:text-gray-400 mb-8">
                Feel free to reach out to me for any questions or opportunities! I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-primary dark:text-pink-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-gray-400">Email</h4>
                    <a href="mailto:hsejal087@gmail.com" className="text-lg font-medium text-slate-800 dark:text-gray-200 hover:text-primary dark:hover:text-pink-400 transition-colors">
                      hsejal087@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-secondary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-gray-400">Phone</h4>
                    <a href="tel:+918805993603" className="text-lg font-medium text-slate-800 dark:text-gray-200 hover:text-secondary transition-colors">
                      +91 8805993603
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-pink-500 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-gray-400">Location</h4>
                    <p className="text-lg font-medium text-slate-800 dark:text-gray-200">
                      Lohegaon, Pune, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form className="glass-card rounded-2xl p-8" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send Me a Message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-pink-500 transition-all text-slate-800 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-pink-500 transition-all text-slate-800 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-pink-500 transition-all text-slate-800 dark:text-white"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-pink-500 transition-all text-slate-800 dark:text-white resize-none"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <FiSend />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
