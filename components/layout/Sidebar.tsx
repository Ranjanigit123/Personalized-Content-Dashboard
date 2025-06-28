'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCurrentView } from '@/store/slices/uiSlice';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import {
  Home,
  TrendingUp,
  Heart,
  Settings,
  User,
  Newspaper,
  Film,
  Hash,
  BarChart3,
} from 'lucide-react';

const navigationItems = [
  { id: 'feed', label: 'Personalized Feed', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'favorites', label: 'Favorites', icon: Heart },
];

const categoryItems = [
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'movies', label: 'Movies', icon: Film },
  { id: 'social', label: 'Social', icon: Hash },
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { currentView } = useSelector((state: RootState) => state.ui);
  const { profile } = useSelector((state: RootState) => state.user);

  const handleNavigation = (view: string) => {
    dispatch(setCurrentView(view as any));
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ContentHub
          </h1>
        </motion.div>
      </div>

      {/* User Profile */}
      {profile && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Dashboard
          </h3>
          {navigationItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={currentView === item.id ? 'default' : 'ghost'}
                className="w-full justify-start space-x-3 h-10"
                onClick={() => handleNavigation(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Categories
          </h3>
          {categoryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={currentView === item.id ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start space-x-3 h-9 text-sm"
                onClick={() => handleNavigation(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 h-10"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;