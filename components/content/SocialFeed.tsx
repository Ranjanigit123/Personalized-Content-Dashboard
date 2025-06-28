'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchSocialContent } from '@/store/slices/contentSlice';
import ContentCard from './ContentCard';
import ContentSkeleton from './ContentSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Heart, MessageCircle, Share2, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { AppDispatch } from '@/store'; // Add this import at the top with others

const SocialFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { socialContent, loading } = useSelector((state: RootState) => state.content);
  const [platform, setPlatform] = useState('all');
  const [contentType, setContentType] = useState('all');

  useEffect(() => {
    dispatch(fetchSocialContent({ platform, contentType }));
  }, [dispatch, platform, contentType]);

  const socialStats = {
    totalPosts: socialContent.length,
    totalEngagement: socialContent.reduce((acc, post) => acc + (post.engagement || 0), 0),
    avgLikes: socialContent.length > 0 ? 
      Math.round(socialContent.reduce((acc, post) => acc + (post.likes || 0), 0) / socialContent.length) : 0,
  };

  const trendingHashtags = [
    '#TechNews', '#AI', '#WebDev', '#React', '#NextJS', 
    '#TypeScript', '#Design', '#UX', '#Innovation', '#Startup'
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl">
            <Hash className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              Social Media Feed
            </h2>
            <p className="text-muted-foreground">
              Stay connected with the latest social media trends and conversations
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>

          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="posts">Posts</SelectItem>
              <SelectItem value="stories">Stories</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
              <SelectItem value="photos">Photos</SelectItem>
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
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Posts</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{socialStats.totalPosts}</p>
              </div>
              <div className="p-2 bg-purple-500 rounded-lg">
                <Hash className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-700 dark:text-pink-300">Engagement</p>
                <p className="text-2xl font-bold text-pink-900 dark:text-pink-100">{socialStats.totalEngagement.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-pink-500 rounded-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-cyan-200 dark:border-cyan-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Avg Likes</p>
                <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">{socialStats.avgLikes}</p>
              </div>
              <div className="p-2 bg-cyan-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trending Hashtags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-orange-500" />
          <h3 className="text-lg font-semibold">Trending Hashtags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingHashtags.map((hashtag, index) => (
            <motion.div
              key={hashtag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 dark:from-green-900 dark:to-teal-900 dark:text-green-300 hover:from-green-200 hover:to-teal-200 cursor-pointer transition-colors"
              >
                {hashtag}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <ContentSkeleton key={index} />
          ))}
        </div>
      ) : socialContent.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {socialContent.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative">
                  <ContentCard item={post} index={index} />
                  
                  {/* Social-specific overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes || Math.floor(Math.random() * 1000)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{Math.floor(Math.random() * 100)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">{Math.floor(Math.random() * 50)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={`https://images.pexels.com/photos/${1000 + index}/pexels-photo-${1000 + index}.jpeg?auto=compress&cs=tinysrgb&w=100`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <Badge variant="secondary" className="text-xs bg-white/20">
                            {post.platform || 'Social'}
                          </Badge>
                        </div>
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
          <Hash className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No social posts found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or check back later for new content.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SocialFeed;