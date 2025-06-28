'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchTrendingContent } from '@/store/slices/contentSlice';
import ContentCard from './ContentCard';
import ContentSkeleton from './ContentSkeleton';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const TrendingSection: React.FC = () => {
  const dispatch = useDispatch();
  const { trending, loading } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    if (trending.length === 0) {
      dispatch(fetchTrendingContent());
    }
  }, [dispatch, trending.length]);

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
            Trending Now
          </h2>
          <p className="text-sm text-muted-foreground">
            Most popular content across all categories
          </p>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ContentSkeleton key={index} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {trending.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      )}

      {!loading && trending.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No trending content available
          </h3>
          <p className="text-sm text-muted-foreground">
            Check back later for the latest trending content.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TrendingSection;