'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ContentCard from './ContentCard';
import ContentSkeleton from './ContentSkeleton';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchResults: React.FC = () => {
  const { searchResults, searchLoading, searchQuery } = useSelector((state: RootState) => ({
    searchResults: state.content.searchResults,
    searchLoading: state.content.searchLoading,
    searchQuery: state.ui.searchQuery,
  }));

  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
          <Search className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Search Results
          </h2>
          <p className="text-sm text-muted-foreground">
            Results for "{searchQuery}"
          </p>
        </div>
      </motion.div>

      {searchLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ContentSkeleton key={index} />
          ))}
        </div>
      ) : searchResults.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {searchResults.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No results found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or explore other content.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchResults;