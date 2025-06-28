'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removeFavorite } from '@/store/slices/contentSlice';
import ContentCard from './ContentCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Filter, SortAsc } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FavoritesSection: React.FC = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.content);
  const [sortBy, setSortBy] = React.useState('recent');
  const [filterBy, setFilterBy] = React.useState('all');

  const handleRemoveFavorite = (itemId: string) => {
    dispatch(removeFavorite(itemId));
  };

  // Filter favorites
  const filteredFavorites = React.useMemo(() => {
    let filtered = [...favorites];

    if (filterBy !== 'all') {
      filtered = filtered.filter(item => item.source === filterBy);
    }

    // Sort favorites
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return filtered;
  }, [favorites, sortBy, filterBy]);

  const favoritesByCategory = React.useMemo(() => {
    const grouped = filteredFavorites.reduce((acc, item) => {
      const category = item.source;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, typeof favorites>);
    
    return grouped;
  }, [filteredFavorites]);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Your Favorites
            </h2>
            <p className="text-sm text-muted-foreground">
              {favorites.length} items saved • Organize and manage your favorite content
            </p>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="movies">Movies</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                  <SelectItem value="category">By Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </motion.div>

      {favorites.length > 0 ? (
        <div className="space-y-8">
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {Object.entries(favoritesByCategory).map(([category, items]) => (
              <div key={category} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground capitalize">{category}</p>
                    <p className="text-2xl font-bold">{items.length}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    category === 'news' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                    category === 'movies' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                    'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                  }`}>
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Favorites Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredFavorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <ContentCard item={item} index={index} />
                  
                  {/* Remove from favorites button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0 bg-red-500/90 hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(item.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900 dark:to-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-3">
            No favorites yet
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Start exploring content and mark your favorites by clicking the heart icon on any content card. 
            Your saved items will appear here for easy access.
          </p>
          <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white">
            Explore Content
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FavoritesSection;