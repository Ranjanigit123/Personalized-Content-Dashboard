'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AuthPage from '@/components/auth/AuthPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ContentFeed from '@/components/content/ContentFeed';
import MoviesFeed from '@/components/content/MoviesFeed';
import SocialFeed from '@/components/content/SocialFeed';
import TrendingSection from '@/components/content/TrendingSection';
import TrendingCategories from '@/components/content/TrendingCategories';
import FavoritesSection from '@/components/content/FavoritesSection';
import SearchResults from '@/components/content/SearchResults';
import AdvancedSearch from '@/components/content/AdvancedSearch';

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { currentView, searchQuery } = useSelector((state: RootState) => state.ui);

  // Show authentication page if user is not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderCurrentView = () => {
    if (searchQuery.trim()) {
      return (
        <div className="space-y-8">
          <AdvancedSearch />
          <SearchResults />
        </div>
      );
    }

    switch (currentView) {
      case 'trending':
        return (
          <div className="space-y-8">
            <TrendingSection />
            <TrendingCategories />
          </div>
        );
      case 'favorites':
        return <FavoritesSection />;
      case 'movies':
        return <MoviesFeed />;
      case 'social':
        return <SocialFeed />;
      case 'feed':
      default:
        return <ContentFeed />;
    }
  };

  return (
    <DashboardLayout>
      {renderCurrentView()}
    </DashboardLayout>
  );
}