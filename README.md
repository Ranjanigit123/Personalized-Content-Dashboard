# Personalized Content Dashboard

A modern, responsive content dashboard built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS. This application aggregates content from multiple sources including news, movies, and social media, providing users with a personalized and interactive experience.

## 🚀 Features

### Core Features
- **Personalized Content Feed**: Customizable content based on user preferences
- **Multi-Source Integration**: News API, TMDB (movies), and mock social media content
- **Interactive Content Cards**: Beautiful cards with hover effects, favorites, and sharing
- **Infinite Scrolling**: Smooth loading of more content as you scroll
- **Advanced Search**: Debounced search across all content types
- **Drag & Drop Reordering**: Rearrange content cards to your preference

### Dashboard Layout
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Sidebar Navigation**: Easy navigation between sections
- **Modern Header**: Search bar, theme toggle, notifications, and user profile
- **Multiple Views**: Feed, Trending, Favorites, and Search results

### Advanced Features
- **Dark Mode**: Toggle between light and dark themes
- **Favorites System**: Mark and organize your favorite content
- **Trending Section**: Discover popular content across categories
- **State Persistence**: User preferences saved across sessions
- **Smooth Animations**: Framer Motion powered animations and transitions

### Technical Excellence
- **Redux Toolkit**: Robust state management with persistence
- **TypeScript**: Full type safety throughout the application
- **Testing Suite**: Unit tests, integration tests, and E2E tests
- **API Integration**: Real-time data fetching with error handling
- **Performance Optimized**: Debounced search, lazy loading, and optimized rendering

## 🛠️ Technology Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **State Management**: Redux Toolkit, Redux Persist
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Testing**: Jest, React Testing Library, Cypress
- **API Integration**: Axios with News API and TMDB API

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- API keys for external services (optional for demo)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personalized-content-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your API keys:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit & Integration Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests
```bash
# Open Cypress interface
npm run cypress:open

# Run headless tests
npm run cypress:run
```

## 📁 Project Structure

```
├── app/                    # Next.js 13 app directory
├── components/            # React components
│   ├── content/          # Content-related components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/              # Reusable UI components
├── store/                # Redux store configuration
│   └── slices/          # Redux slices
├── services/             # API services
├── __tests__/           # Test files
├── cypress/             # E2E tests
└── public/              # Static assets
```

## 🎨 Key Components

### Content Management
- **ContentCard**: Interactive cards with favorites, sharing, and external links
- **ContentFeed**: Main feed with infinite scroll and drag-and-drop
- **TrendingSection**: Displays popular content across categories
- **FavoritesSection**: User's favorited content
- **SearchResults**: Real-time search results with debouncing

### Layout & Navigation
- **DashboardLayout**: Main layout with responsive sidebar
- **Sidebar**: Navigation with user profile and categories
- **Header**: Search bar, theme toggle, and user actions

### State Management
- **contentSlice**: Content data, favorites, search results
- **userSlice**: User preferences and authentication
- **uiSlice**: UI state, theme, sidebar, current view

## 🔧 Configuration

### API Integration
The app integrates with multiple APIs:
- **News API**: Latest news based on categories
- **TMDB API**: Movie recommendations and trending
- **Mock Social**: Simulated social media posts

### User Preferences
Users can customize:
- Content categories (technology, business, entertainment)
- Theme preference (light/dark mode)
- Language settings
- Notification preferences

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

The app is configured for static export and can be deployed to any static hosting service.

## 🧩 Features in Detail

### Drag & Drop Reordering
- Powered by @dnd-kit for smooth interactions
- Reorder content cards in your feed
- State persisted across sessions

### Advanced Search
- Debounced input for performance
- Searches across news, movies, and social content
- Real-time results with loading states

### Favorites System
- Click heart icon to favorite content
- Dedicated favorites section
- Persisted in Redux store

### Dark Mode
- System preference detection
- Smooth transitions between themes
- Persisted user preference

### Responsive Design
- Mobile-first approach
- Adaptive sidebar (overlay on mobile)
- Optimized touch interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [News API](https://newsapi.org/) for news content
- [TMDB](https://www.themoviedb.org/) for movie data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Pexels](https://www.pexels.com/) for stock images