'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchCategory, clearSearchResults } from '@/store/slices/contentSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Newspaper, Film, Hash, Globe, Zap, Briefcase, Gamepad2 } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Content', icon: Globe, color: 'bg-gray-500' },
  { id: 'news', label: 'News', icon: Newspaper, color: 'bg-blue-500' },
  { id: 'movies', label: 'Movies', icon: Film, color: 'bg-red-500' },
  { id: 'social', label: 'Social', icon: Hash, color: 'bg-green-500' },
  { id: 'technology', label: 'Technology', icon: Zap, color: 'bg-purple-500' },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'bg-orange-500' },
  { id: 'entertainment', label: 'Entertainment', icon: Gamepad2, color: 'bg-pink-500' },
];

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { searchCategory } = useSelector((state: RootState) => state.content);

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setSearchCategory(categoryId));
    if (categoryId === 'all') {
      dispatch(clearSearchResults());
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Filter by Category
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={searchCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category.id)}
              className={`h-9 px-3 space-x-2 transition-all duration-200 ${
                searchCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0'
                  : 'hover:bg-muted'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-xs font-medium">{category.label}</span>
              {searchCategory === category.id && (
                <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs bg-white/20">
                  Active
                </Badge>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;