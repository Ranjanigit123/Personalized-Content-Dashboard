import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { contentAPI } from '@/services/api';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  source: 'news' | 'movies' | 'social';
  url?: string;
  publishedAt: string;
  isFavorite: boolean;
  rating?: number;
  likes?: number;
  engagement?: number;
  platform?: string;
}

interface SearchFilters {
  query: string;
  category: string;
  source: string;
  dateRange: string;
  sortBy: string;
}

interface ContentState {
  items: ContentItem[];
  movieContent: ContentItem[];
  socialContent: ContentItem[];
  favorites: ContentItem[];
  trending: ContentItem[];
  trendingByCategory: Record<string, ContentItem[]>;
  loading: boolean;
  error: string | null;
  searchResults: ContentItem[];
  searchLoading: boolean;
  searchCategory: string;
  hasMore: boolean;
  currentPage: number;
}

const initialState: ContentState = {
  items: [],
  movieContent: [],
  socialContent: [],
  favorites: [],
  trending: [],
  trendingByCategory: {},
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  searchCategory: 'all',
  hasMore: true,
  currentPage: 1,
};

// Async thunks
export const fetchPersonalizedContent = createAsyncThunk(
  'content/fetchPersonalized',
  async (params: { categories: string[]; page: number }) => {
    const response = await contentAPI.getPersonalizedContent(params.categories, params.page);
    return response;
  }
);

export const fetchMovieContent = createAsyncThunk(
  'content/fetchMovies',
  async (params: { filter: string; genre: string }) => {
    const response = await contentAPI.getMovieContent(params.filter, params.genre);
    return response;
  }
);

export const fetchSocialContent = createAsyncThunk(
  'content/fetchSocial',
  async (params: { platform: string; contentType: string }) => {
    const response = await contentAPI.getSocialContent(params.platform, params.contentType);
    return response;
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'content/fetchTrending',
  async () => {
    const response = await contentAPI.getTrendingContent();
    return response;
  }
);

export const fetchTrendingByCategory = createAsyncThunk(
  'content/fetchTrendingByCategory',
  async (category: string) => {
    const response = await contentAPI.getTrendingByCategory(category);
    return { category, items: response };
  }
);

export const searchContent = createAsyncThunk(
  'content/search',
  async (query: string) => {
    const response = await contentAPI.searchContent(query);
    return response;
  }
);

export const searchContentAdvanced = createAsyncThunk(
  'content/searchAdvanced',
  async (filters: SearchFilters) => {
    const response = await contentAPI.searchContentAdvanced(filters);
    return response;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      
      // Find item in all possible arrays
      const findAndToggleItem = (items: ContentItem[]) => {
        const item = items.find(item => item.id === itemId);
        if (item) {
          item.isFavorite = !item.isFavorite;
          return item;
        }
        return null;
      };

      const item = findAndToggleItem(state.items) || 
                   findAndToggleItem(state.movieContent) ||
                   findAndToggleItem(state.socialContent) ||
                   findAndToggleItem(state.trending) ||
                   findAndToggleItem(state.searchResults) ||
                   Object.values(state.trendingByCategory).flat().find(item => {
                     if (item.id === itemId) {
                       item.isFavorite = !item.isFavorite;
                       return item;
                     }
                     return null;
                   });

      if (item) {
        if (item.isFavorite) {
          // Add to favorites if not already there
          const existingFavorite = state.favorites.find(fav => fav.id === itemId);
          if (!existingFavorite) {
            state.favorites.push({ ...item });
          }
        } else {
          // Remove from favorites
          state.favorites = state.favorites.filter(fav => fav.id !== itemId);
        }
      }
    },
    reorderContent: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.searchCategory = action.payload;
    },
    resetContent: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.favorites = state.favorites.filter(fav => fav.id !== itemId);
      
      // Also update the item's favorite status in other arrays
      const updateItemFavoriteStatus = (items: ContentItem[]) => {
        const item = items.find(item => item.id === itemId);
        if (item) {
          item.isFavorite = false;
        }
      };

      updateItemFavoriteStatus(state.items);
      updateItemFavoriteStatus(state.movieContent);
      updateItemFavoriteStatus(state.socialContent);
      updateItemFavoriteStatus(state.trending);
      updateItemFavoriteStatus(state.searchResults);
      Object.values(state.trendingByCategory).forEach(updateItemFavoriteStatus);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch personalized content
      .addCase(fetchPersonalizedContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalizedContent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.items = action.payload.items;
        } else {
          state.items.push(...action.payload.items);
        }
        state.hasMore = action.payload.hasMore;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchPersonalizedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      })
      // Fetch movie content
      .addCase(fetchMovieContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieContent.fulfilled, (state, action) => {
        state.loading = false;
        state.movieContent = action.payload;
      })
      .addCase(fetchMovieContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie content';
      })
      // Fetch social content
      .addCase(fetchSocialContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSocialContent.fulfilled, (state, action) => {
        state.loading = false;
        state.socialContent = action.payload;
      })
      .addCase(fetchSocialContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch social content';
      })
      // Fetch trending content
      .addCase(fetchTrendingContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trending content';
      })
      // Fetch trending by category
      .addCase(fetchTrendingByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingByCategory[action.payload.category] = action.payload.items;
      })
      .addCase(fetchTrendingByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trending content by category';
      })
      // Search content
      .addCase(searchContent.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.error.message || 'Search failed';
      })
      // Advanced search
      .addCase(searchContentAdvanced.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchContentAdvanced.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchContentAdvanced.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.error.message || 'Advanced search failed';
      });
  },
});

export const { 
  toggleFavorite, 
  reorderContent, 
  clearSearchResults, 
  setSearchCategory,
  resetContent,
  removeFavorite 
} = contentSlice.actions;
export default contentSlice.reducer;