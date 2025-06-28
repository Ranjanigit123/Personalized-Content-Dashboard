'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { searchContentAdvanced, clearSearchResults } from '@/store/slices/contentSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Calendar, Tag, Globe } from 'lucide-react';
import { useDebounce } from 'use-debounce';

const AdvancedSearch: React.FC = () => {
  const dispatch = useDispatch();
  const { searchResults, searchLoading } = useSelector((state: RootState) => state.content);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    category: 'all',
    source: 'all',
    dateRange: 'all',
    sortBy: 'relevance',
  });

  const [debouncedQuery] = useDebounce(searchFilters.query, 500);

  React.useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchContentAdvanced(searchFilters));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedQuery, searchFilters, dispatch]);

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchFilters({
      query: '',
      category: 'all',
      source: 'all',
      dateRange: 'all',
      sortBy: 'relevance',
    });
    dispatch(clearSearchResults());
  };

  const activeFiltersCount = Object.values(searchFilters).filter(value => value !== 'all' && value !== 'relevance' && value !== '').length;

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                  Advanced Search
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Search across all content types with advanced filters
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-2 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for news, movies, social posts..."
              value={searchFilters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="pl-10 pr-4 h-12 text-base"
            />
            {searchLoading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
              </motion.div>
            )}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border"
              >
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>Category</span>
                  </Label>
                  <Select value={searchFilters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>Source</span>
                  </Label>
                  <Select value={searchFilters.source} onValueChange={(value) => handleFilterChange('source', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="movies">Movies</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Date Range</span>
                  </Label>
                  <Select value={searchFilters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sort By</Label>
                  <Select value={searchFilters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters & Clear */}
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between pt-2 border-t border-border"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(searchFilters).map(([key, value]) => {
                    if (value !== 'all' && value !== 'relevance' && value !== '') {
                      return (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {key}: {value}
                        </Badge>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </motion.div>
          )}

          {/* Search Results Summary */}
          {searchFilters.query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              {searchLoading ? (
                'Searching...'
              ) : (
                `Found ${searchResults.length} results for "${searchFilters.query}"`
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedSearch;