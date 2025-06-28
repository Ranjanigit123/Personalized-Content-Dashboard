'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchTrendingByCategory } from '@/store/slices/contentSlice';
import ContentCard from './ContentCard';
import ContentSkeleton from './ContentSkeleton';
import { motion } from 'framer-motion';
import { TrendingUp, Newspaper, Film, Hash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const trendingCategories = [
  { id: 'news', label: 'News', icon: Newspaper, color: 'from-blue-500 to-cyan-500' },
  { id: 'movies', label: 'Movies', icon: Film, color: 'from-red-500 to-pink-500' },
  { id: 'social', label: 'Social', icon: Hash, color: 'from-green-500 to-emerald-500' },
];

const TrendingCategories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trendingByCategory, loading } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    trendingCategories.forEach(category => {
      if (!trendingByCategory[category.id] || trendingByCategory[category.id].length === 0) {
        dispatch(fetchTrendingByCategory(category.id));
      }
    });
  }, [dispatch, trendingByCategory]);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Trending by Category
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover what's popular in each content category
          </p>
        </div>
      </motion.div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          {trendingCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center space-x-2"
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {trendingCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
              <h3 className="text-lg font-semibold">Trending {category.label}</h3>
              <span className="text-sm text-muted-foreground">
                ({trendingByCategory[category.id]?.length || 0} items)
              </span>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ContentSkeleton key={index} />
                ))}
              </div>
            ) : trendingByCategory[category.id]?.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {trendingByCategory[category.id].map((item, index) => (
                  <ContentCard key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <category.icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No trending {category.label.toLowerCase()} available
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check back later for the latest trending content.
                </p>
              </motion.div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TrendingCategories;