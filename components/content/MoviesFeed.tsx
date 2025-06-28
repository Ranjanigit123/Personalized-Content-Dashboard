'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchMovieContent } from '@/store/slices/contentSlice';
import ContentCard from './ContentCard';
import ContentSkeleton from './ContentSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Star, Calendar, TrendingUp, Filter, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const MoviesFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movieContent, loading } = useSelector((state: RootState) => state.content);
  const [filter, setFilter] = useState('popular');
  const [genre, setGenre] = useState('all');

  useEffect(() => {
    dispatch(fetchMovieContent({ filter, genre }));
  }, [dispatch, filter, genre]);

  const movieStats = {
    totalMovies: movieContent.length,
    avgRating: movieContent.length > 0 ? 
      (movieContent.reduce((acc, movie) => acc + (movie.rating || 8.5), 0) / movieContent.length).toFixed(1) : '8.5',
    newReleases: movieContent.filter(movie => 
      new Date(movie.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
            <Film className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Movies & Entertainment
            </h2>
            <p className="text-muted-foreground">
              Discover the latest movies, reviews, and entertainment content
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="top_rated">Top Rated</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="now_playing">Now Playing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="drama">Drama</SelectItem>
              <SelectItem value="horror">Horror</SelectItem>
              <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              <SelectItem value="romance">Romance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Movies</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{movieStats.totalMovies}</p>
              </div>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Film className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{movieStats.avgRating}</p>
              </div>
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">New Releases</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{movieStats.newReleases}</p>
              </div>
              <div className="p-2 bg-green-500 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filter Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
          {filter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
        {genre !== 'all' && (
          <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </Badge>
        )}
      </motion.div>

      {/* Movies Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ContentSkeleton key={index} />
          ))}
        </div>
      ) : movieContent.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {movieContent.map((movie, index) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative">
                  <ContentCard item={movie} index={index} />
                  
                  {/* Movie-specific overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{movie.rating || '8.5'}</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white h-8 px-3"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No movies found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or check back later for new content.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MoviesFeed;