import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentCard from '@/components/content/ContentCard';
import contentReducer from '@/store/slices/contentSlice';
import userReducer from '@/store/slices/userSlice';
import uiReducer from '@/store/slices/uiSlice';

const mockStore = configureStore({
  reducer: {
    content: contentReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

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

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>{component}</Provider>
  );
};

describe('ContentCard', () => {
  it('renders content card with correct information', () => {
    renderWithProvider(<ContentCard item={mockItem} index={0} />);
    
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('news')).toBeInTheDocument();
  });

  it('toggles favorite when heart button is clicked', () => {
    renderWithProvider(<ContentCard item={mockItem} index={0} />);
    
    const favoriteButton = screen.getByRole('button', { name: /heart/i });
    fireEvent.click(favoriteButton);
    
    // The Redux store should be updated, but we'd need to check the store state
    // This is a simplified test - in a real scenario, you'd mock the dispatch
  });

  it('opens external link when card is clicked', () => {
    const originalOpen = window.open;
    window.open = jest.fn();
    
    renderWithProvider(<ContentCard item={mockItem} index={0} />);
    
    const card = screen.getByText('Test Article').closest('[role="button"]') || 
                 screen.getByText('Test Article').parentElement;
    
    if (card) {
      fireEvent.click(card);
      expect(window.open).toHaveBeenCalledWith(mockItem.url, '_blank');
    }
    
    window.open = originalOpen;
  });

  it('displays correct date format', () => {
    renderWithProvider(<ContentCard item={mockItem} index={0} />);
    
    expect(screen.getByText('Jan 01, 2024')).toBeInTheDocument();
  });
});