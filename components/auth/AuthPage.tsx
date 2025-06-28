'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import LoginForm from './LoginForm';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Heart, Search } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const features = [
    {
      icon: BarChart3,
      title: 'Personalized Dashboard',
      description: 'Get content tailored to your interests and preferences',
    },
    {
      icon: TrendingUp,
      title: 'Trending Content',
      description: 'Stay updated with the latest trending news, movies, and posts',
    },
    {
      icon: Heart,
      title: 'Favorites System',
      description: 'Save and organize your favorite content in one place',
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find content across all categories with intelligent search',
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Branding and Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo and Brand */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start space-x-3 mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ContentHub
                </h1>
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Your Personalized
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Content Dashboard
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Discover, organize, and interact with content from multiple sources. 
                Get news, movie recommendations, and social media posts all in one place.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Credentials</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Use any email and password to access the demo dashboard. 
                All authentication is mocked for demonstration purposes.
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <LoginForm 
              onToggleMode={() => setIsLogin(!isLogin)} 
              isLogin={isLogin} 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;