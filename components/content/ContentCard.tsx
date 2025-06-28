'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '@/store/slices/contentSlice';
import { ContentItem } from '@/store/slices/contentSlice';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Heart, ExternalLink, Calendar, Eye, Share2 } from 'lucide-react';
import { format } from 'date-fns';

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(item.id));
  };

  const handleOpenLink = () => {
    if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'news': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'movies': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'social': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={handleOpenLink}
    >
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Overlay buttons */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={handleToggleFavorite}
              >
                <Heart 
                  className={`w-4 h-4 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </Button>
            </motion.div>
          </div>

          {/* Source badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`text-xs font-medium ${getSourceColor(item.source)}`}>
              {item.source}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-3">
              {item.description}
            </p>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(item.publishedAt), 'MMM dd, yyyy')}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{Math.floor(Math.random() * 1000 + 100)} views</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
            
            {item.url && (
              <Button
                size="sm"
                variant="ghost"
                className="text-xs h-7 px-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Read More
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ContentCard;