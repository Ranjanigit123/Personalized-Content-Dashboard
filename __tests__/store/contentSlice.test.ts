import contentReducer, {
  toggleFavorite,
  reorderContent,
  clearSearchResults,
  resetContent,
} from '@/store/slices/contentSlice';

const initialState = {
  items: [],
  favorites: [],
  trending: [],
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  hasMore: true,
  currentPage: 1,
};

const mockItem = {
  id: 'test-1',
  title: 'Test Article',
  description: 'Test description',
  imageUrl: 'https://example.com/image.jpg',
  category: 'technology',
  source: 'news' as const,
  url: 'https://example.com/article',
  publishedAt: '2024-01-01T00:00:00.000Z',
  isFavorite: false,
};

describe('contentSlice', () => {
  it('should handle initial state', () => {
    expect(contentReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleFavorite', () => {
    const stateWithItem = {
      ...initialState,
      items: [mockItem],
    };

    const actual = contentReducer(stateWithItem, toggleFavorite('test-1'));
    
    expect(actual.items[0].isFavorite).toBe(true);
    expect(actual.favorites).toHaveLength(1);
    expect(actual.favorites[0]).toEqual({ ...mockItem, isFavorite: true });
  });

  it('should handle reorderContent', () => {
    const item1 = { ...mockItem, id: 'test-1' };
    const item2 = { ...mockItem, id: 'test-2' };
    const stateWithItems = {
      ...initialState,
      items: [item1, item2],
    };

    const reorderedItems = [item2, item1];
    const actual = contentReducer(stateWithItems, reorderContent(reorderedItems));
    
    expect(actual.items).toEqual(reorderedItems);
  });

  it('should handle clearSearchResults', () => {
    const stateWithResults = {
      ...initialState,
      searchResults: [mockItem],
    };

    const actual = contentReducer(stateWithResults, clearSearchResults());
    
    expect(actual.searchResults).toEqual([]);
  });

  it('should handle resetContent', () => {
    const stateWithContent = {
      ...initialState,
      items: [mockItem],
      currentPage: 3,
      hasMore: false,
    };

    const actual = contentReducer(stateWithContent, resetContent());
    
    expect(actual.items).toEqual([]);
    expect(actual.currentPage).toBe(1);
    expect(actual.hasMore).toBe(true);
  });
});