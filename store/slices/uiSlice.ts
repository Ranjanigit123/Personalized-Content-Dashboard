import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  currentView: 'feed' | 'trending' | 'favorites' | 'search'| 'movies' | 'social';
  searchQuery: string;
}

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
  currentView: 'feed',
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<UIState['currentView']>) => {
      state.currentView = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { 
  toggleDarkMode, 
  setDarkMode, 
  toggleSidebar, 
  setSidebarOpen, 
  setCurrentView, 
  setSearchQuery 
} = uiSlice.actions;
export default uiSlice.reducer;