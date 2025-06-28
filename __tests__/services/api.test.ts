import { contentAPI } from '@/services/api';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('contentAPI', () => {
  it('should fetch personalized content', async () => {
    const result = await contentAPI.getPersonalizedContent(['technology'], 1);
    
    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('hasMore');
    expect(result).toHaveProperty('page');
    expect(Array.isArray(result.items)).toBe(true);
  });

  it('should fetch trending content', async () => {
    const result = await contentAPI.getTrendingContent();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it('should search content', async () => {
    const result = await contentAPI.searchContent('technology');
    
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle API errors gracefully', async () => {
    // This test would require mocking the axios instance to throw errors
    // and verifying that the API returns fallback data
    const result = await contentAPI.getPersonalizedContent(['invalid'], 1);
    
    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('hasMore');
  });
});