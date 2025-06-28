'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { toggleSidebar, toggleDarkMode, setSearchQuery } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/userSlice';
import { searchContent, clearSearchResults } from '@/store/slices/contentSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDebounce } from 'use-debounce';
import { motion } from 'framer-motion';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  User,
  Settings,
  LogOut,
  Heart,
  TrendingUp,
} from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode, searchQuery } = useSelector((state: RootState) => state.ui);
  const { searchLoading } = useSelector((state: RootState) => state.content);
  const { profile } = useSelector((state: RootState) => state.user);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      dispatch(searchContent(debouncedSearchQuery));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedSearchQuery, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-card border-b border-border shadow-sm backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
            className="hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Quick navigation on larger screens */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </Button>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search across all content..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 w-full bg-muted/50 border-0 focus:bg-background transition-colors"
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
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleDarkMode())}
              className="relative hover:bg-muted transition-colors"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.div>
            </Button>
          </motion.div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="relative hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
          </motion.div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar} alt={profile?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {profile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;