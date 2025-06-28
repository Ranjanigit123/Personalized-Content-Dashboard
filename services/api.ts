import axios from 'axios';
import { ContentItem } from '@/store/slices/contentSlice';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo-key';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'demo-key';

// Create axios instances
const newsAPI = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    apiKey: NEWS_API_KEY,
  },
});

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Enhanced mock movie data
const mockMovieData: ContentItem[] = [
  {
    id: 'movie-1',
    title: 'The Quantum Paradox',
    description: 'A mind-bending sci-fi thriller that explores the mysteries of quantum physics and parallel universes.',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'entertainment',
    source: 'movies',
    publishedAt: new Date().toISOString(),
    isFavorite: false,
    rating: 8.7,
  },
  {
    id: 'movie-2',
    title: 'Ocean\'s Deep',
    description: 'An underwater adventure that reveals the secrets hidden in the deepest parts of our oceans.',
    imageUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'entertainment',
    source: 'movies',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    isFavorite: false,
    rating: 8.2,
  },
  {
    id: 'movie-3',
    title: 'Digital Revolution',
    description: 'A documentary exploring how technology is reshaping our world and society.',
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'documentary',
    source: 'movies',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    isFavorite: false,
    rating: 9.1,
  },
  {
    id: 'movie-4',
    title: 'The Last Frontier',
    description: 'Space exploration meets human drama in this epic tale of humanity\'s journey to Mars.',
    imageUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'sci-fi',
    source: 'movies',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    isFavorite: false,
    rating: 8.9,
  },
  {
    id: 'movie-5',
    title: 'Urban Legends',
    description: 'A thrilling horror movie that brings urban legends to life in terrifying ways.',
    imageUrl: 'https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'horror',
    source: 'movies',
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    isFavorite: false,
    rating: 7.8,
  },
  {
    id: 'movie-6',
    title: 'Love in Paris',
    description: 'A romantic comedy set in the beautiful streets of Paris, following two unlikely lovers.',
    imageUrl: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'romance',
    source: 'movies',
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    isFavorite: false,
    rating: 8.4,
  },
  {
    id: 'movie-7',
    title: 'Action Hero Chronicles',
    description: 'An explosive action movie with incredible stunts and non-stop thrills.',
    imageUrl: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'action',
    source: 'movies',
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    isFavorite: false,
    rating: 8.0,
  },
  {
    id: 'movie-8',
    title: 'Comedy Central',
    description: 'A hilarious comedy that will keep you laughing from start to finish.',
    imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'comedy',
    source: 'movies',
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    isFavorite: false,
    rating: 7.5,
  },
];

// Enhanced mock social media data
const mockSocialData: ContentItem[] = [
  {
    id: 'social-1',
    title: 'Amazing sunset from my balcony! 🌅',
    description: 'Just captured this beautiful moment. Nature never fails to amaze us with its incredible colors and peaceful vibes. #sunset #nature #photography',
    imageUrl: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lifestyle',
    source: 'social',
    publishedAt: new Date().toISOString(),
    isFavorite: false,
    likes: 1247,
    engagement: 1580,
    platform: 'Instagram',
  },
  {
    id: 'social-2',
    title: 'New AI breakthrough in healthcare! 🚀',
    description: 'Researchers have developed a new AI system that can detect diseases early with 95% accuracy. This could revolutionize medical diagnosis. #AI #healthcare #innovation',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'technology',
    source: 'social',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    isFavorite: false,
    likes: 892,
    engagement: 1205,
    platform: 'Twitter',
  },
  {
    id: 'social-3',
    title: 'Coffee art masterpiece ☕',
    description: 'Local barista creates stunning latte art that looks too good to drink. The attention to detail is incredible! #coffee #art #latte',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lifestyle',
    source: 'social',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    isFavorite: false,
    likes: 634,
    engagement: 789,
    platform: 'Instagram',
  },
  {
    id: 'social-4',
    title: 'Space exploration milestone achieved! 🚀',
    description: 'NASA successfully launches new mission to Mars with advanced rover technology. This marks a new era in space exploration. #space #NASA #Mars',
    imageUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'technology',
    source: 'social',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    isFavorite: false,
    likes: 2156,
    engagement: 3420,
    platform: 'Twitter',
  },
  {
    id: 'social-5',
    title: 'Sustainable fashion revolution 🌱',
    description: 'New eco-friendly clothing brand uses 100% recycled materials. Fashion industry takes a step towards sustainability. #sustainability #fashion #eco',
    imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'business',
    source: 'social',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    isFavorite: false,
    likes: 445,
    engagement: 678,
    platform: 'LinkedIn',
  },
  {
    id: 'social-6',
    title: 'Weekend hiking adventure! 🏔️',
    description: 'Conquered the highest peak in the region today. The view from the top was absolutely breathtaking! #hiking #adventure #mountains',
    imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lifestyle',
    source: 'social',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    isFavorite: false,
    likes: 789,
    engagement: 1023,
    platform: 'Instagram',
  },
  {
    id: 'social-7',
    title: 'Tech conference highlights 💻',
    description: 'Amazing insights from today\'s tech conference. The future of web development looks incredibly exciting! #webdev #tech #conference',
    imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'technology',
    source: 'social',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    isFavorite: false,
    likes: 567,
    engagement: 834,
    platform: 'LinkedIn',
  },
  {
    id: 'social-8',
    title: 'Homemade pasta perfection! 🍝',
    description: 'Spent the afternoon making fresh pasta from scratch. Nothing beats the taste of homemade Italian cuisine! #cooking #pasta #italian',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lifestyle',
    source: 'social',
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    isFavorite: false,
    likes: 423,
    engagement: 567,
    platform: 'Instagram',
  },
  {
    id: 'social-9',
    title: 'Movie night recommendations! 🎬',
    description: 'Just watched some amazing movies this weekend. Here are my top picks for your next movie night! #movies #entertainment #recommendations',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'entertainment',
    source: 'social',
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    isFavorite: false,
    likes: 892,
    engagement: 1156,
    platform: 'Twitter',
  },
  {
    id: 'social-10',
    title: 'Social media marketing tips 📱',
    description: 'Sharing some effective social media strategies that helped grow my business. These tips really work! #socialmedia #marketing #business',
    imageUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'business',
    source: 'social',
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    isFavorite: false,
    likes: 678,
    engagement: 945,
    platform: 'LinkedIn',
  },
];

// Enhanced mock social posts
const mockSocialPosts: ContentItem[] = [
  {
    id: 'social-1',
    title: 'Amazing sunset from my balcony! 🌅',
    description: 'Just captured this beautiful moment. Nature never fails to amaze us with its incredible colors and peaceful vibes.',
    imageUrl: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lifestyle',
    source: 'social',
    publishedAt: new Date().toISOString(),
    isFavorite: false,
  },
  {
    id: 'social-2',
    title: 'New AI breakthrough in healthcare! 🚀',
    description: 'Researchers have developed a new AI system that can detect diseases early with 95% accuracy. This could revolutionize medical diagnosis.',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'technology',
    source: 'social',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    isFavorite: false,
  },
  {
    id: 'social-3',
    title: 'Coffee art masterpiece ☕',
    description: 'Local barista creates stunning latte art that looks too good to drink. The attention to detail is incredible!',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lifestyle',
    source: 'social',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    isFavorite: false,
  },
  {
    id: 'social-4',
    title: 'Space exploration milestone achieved! 🚀',
    description: 'NASA successfully launches new mission to Mars with advanced rover technology. This marks a new era in space exploration.',
    imageUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'technology',
    source: 'social',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    isFavorite: false,
  },
  {
    id: 'social-5',
    title: 'Sustainable fashion revolution 🌱',
    description: 'New eco-friendly clothing brand uses 100% recycled materials. Fashion industry takes a step towards sustainability.',
    imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'business',
    source: 'social',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    isFavorite: false,
  },
];

// Mock trending data by category
const mockTrendingData = {
  news: [
    {
      id: 'trending-news-1',
      title: 'Global Climate Summit Reaches Historic Agreement',
      description: 'World leaders unite on ambitious climate action plan with concrete targets for 2030.',
      imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'environment',
      source: 'news' as const,
      publishedAt: new Date().toISOString(),
      isFavorite: false,
    },
    {
      id: 'trending-news-2',
      title: 'Breakthrough in Quantum Computing Achieved',
      description: 'Scientists demonstrate quantum supremacy with new 1000-qubit processor.',
      imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'technology',
      source: 'news' as const,
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      isFavorite: false,
    },
  ],
  movies: mockMovieData.slice(0, 3),
  social: mockSocialPosts.slice(0, 3),
};

interface SearchFilters {
  query: string;
  category: string;
  source: string;
  dateRange: string;
  sortBy: string;
}

export const contentAPI = {
  async getPersonalizedContent(categories: string[], page: number = 1) {
    try {
      const promises = [];
      
      // Fetch news
      if (categories.includes('technology') || categories.includes('business') || categories.includes('entertainment')) {
        const newsCategories = categories.filter(cat => ['technology', 'business', 'entertainment'].includes(cat));
        const newsPromise = newsAPI.get('/top-headlines', {
          params: {
            category: newsCategories[0] || 'general',
            pageSize: 10,
            page,
          },
        });
        promises.push(newsPromise);
      }

      // Fetch movies
      const moviesPromise = tmdbAPI.get('/movie/popular', {
        params: {
          page,
        },
      });
      promises.push(moviesPromise);

      const [newsResponse, moviesResponse] = await Promise.allSettled(promises);
      
      const items: ContentItem[] = [];

      // Process news data
      if (newsResponse.status === 'fulfilled' && newsResponse.value.data.articles) {
        const newsItems = newsResponse.value.data.articles
          .filter((article: any) => article.title && article.urlToImage)
          .map((article: any) => ({
            id: `news-${article.url}`,
            title: article.title,
            description: article.description || '',
            imageUrl: article.urlToImage,
            category: 'news',
            source: 'news' as const,
            url: article.url,
            publishedAt: article.publishedAt,
            isFavorite: false,
          }));
        items.push(...newsItems);
      }

      // Process movies data
      if (moviesResponse.status === 'fulfilled' && moviesResponse.value.data.results) {
        const movieItems = moviesResponse.value.data.results
          .filter((movie: any) => movie.poster_path)
          .slice(0, 8)
          .map((movie: any) => ({
            id: `movie-${movie.id}`,
            title: movie.title,
            description: movie.overview,
            imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            category: 'entertainment',
            source: 'movies' as const,
            publishedAt: movie.release_date,
            isFavorite: false,
            rating: movie.vote_average,
          }));
        items.push(...movieItems);
      }

      // Add mock social posts
      if (page === 1) {
        items.push(...mockSocialPosts);
      }

      // Shuffle items for better variety
      const shuffled = items.sort(() => Math.random() - 0.5);

      return {
        items: shuffled,
        hasMore: page < 3, // Simulate pagination
        page,
      };
    } catch (error) {
      console.error('Error fetching personalized content:', error);
      return {
        items: mockSocialPosts,
        hasMore: false,
        page: 1,
      };
    }
  },

  async getMovieContent(filter: string, genre: string) {
    try {
      let endpoint = '/movie/popular';
      
      switch (filter) {
        case 'trending':
          endpoint = '/trending/movie/day';
          break;
        case 'top_rated':
          endpoint = '/movie/top_rated';
          break;
        case 'upcoming':
          endpoint = '/movie/upcoming';
          break;
        case 'now_playing':
          endpoint = '/movie/now_playing';
          break;
        default:
          endpoint = '/movie/popular';
      }

      const response = await tmdbAPI.get(endpoint, {
        params: {
          page: 1,
        },
      });

      if (response.data.results) {
        let movies = response.data.results
          .filter((movie: any) => movie.poster_path)
          .map((movie: any) => ({
            id: `movie-${movie.id}`,
            title: movie.title,
            description: movie.overview,
            imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            category: 'entertainment',
            source: 'movies' as const,
            publishedAt: movie.release_date,
            isFavorite: false,
            rating: movie.vote_average,
          }));

        // Filter by genre if specified
        if (genre !== 'all') {
          // For demo purposes, we'll use mock filtering
          movies = movies.filter(() => Math.random() > 0.3);
        }

        return movies;
      }

      return mockMovieData;
    } catch (error) {
      console.error('Error fetching movie content:', error);
      return mockMovieData;
    }
  },

  async getSocialContent(platform: string, contentType: string) {
    try {
      // For demo purposes, return mock data with filtering
      let content = [...mockSocialData];

      if (platform !== 'all') {
        content = content.filter(post => 
          post.platform?.toLowerCase() === platform.toLowerCase()
        );
      }

      if (contentType !== 'all') {
        // Mock filtering by content type
        content = content.filter(() => Math.random() > 0.2);
      }

      return content;
    } catch (error) {
      console.error('Error fetching social content:', error);
      return mockSocialData;
    }
  },

  async getTrendingContent() {
    try {
      const [newsResponse, moviesResponse] = await Promise.allSettled([
        newsAPI.get('/top-headlines', {
          params: {
            category: 'general',
            pageSize: 5,
          },
        }),
        tmdbAPI.get('/trending/movie/day'),
      ]);

      const items: ContentItem[] = [];

      if (newsResponse.status === 'fulfilled' && newsResponse.value.data.articles) {
        const trendingNews = newsResponse.value.data.articles
          .filter((article: any) => article.title && article.urlToImage)
          .slice(0, 3)
          .map((article: any) => ({
            id: `trending-news-${article.url}`,
            title: article.title,
            description: article.description || '',
            imageUrl: article.urlToImage,
            category: 'news',
            source: 'news' as const,
            url: article.url,
            publishedAt: article.publishedAt,
            isFavorite: false,
          }));
        items.push(...trendingNews);
      }

      if (moviesResponse.status === 'fulfilled' && moviesResponse.value.data.results) {
        const trendingMovies = moviesResponse.value.data.results
          .filter((movie: any) => movie.poster_path)
          .slice(0, 3)
          .map((movie: any) => ({
            id: `trending-movie-${movie.id}`,
            title: movie.title,
            description: movie.overview,
            imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            category: 'entertainment',
            source: 'movies' as const,
            publishedAt: movie.release_date,
            isFavorite: false,
            rating: movie.vote_average,
          }));
        items.push(...trendingMovies);
      }

      // Add some social trending content
      items.push(...mockSocialPosts.slice(0, 2));

      return items;
    } catch (error) {
      console.error('Error fetching trending content:', error);
      return [...mockTrendingData.news, ...mockTrendingData.movies, ...mockTrendingData.social];
    }
  },

  async getTrendingByCategory(category: string) {
    try {
      // Return mock data for demo purposes
      if (mockTrendingData[category as keyof typeof mockTrendingData]) {
        return mockTrendingData[category as keyof typeof mockTrendingData];
      }

      // For real implementation, you would make API calls based on category
      switch (category) {
        case 'news':
          const newsResponse = await newsAPI.get('/top-headlines', {
            params: {
              category: 'general',
              pageSize: 6,
            },
          });
          
          if (newsResponse.data.articles) {
            return newsResponse.data.articles
              .filter((article: any) => article.title && article.urlToImage)
              .map((article: any) => ({
                id: `trending-news-${article.url}`,
                title: article.title,
                description: article.description || '',
                imageUrl: article.urlToImage,
                category: 'news',
                source: 'news' as const,
                url: article.url,
                publishedAt: article.publishedAt,
                isFavorite: false,
              }));
          }
          break;

        case 'movies':
          const moviesResponse = await tmdbAPI.get('/trending/movie/day');
          
          if (moviesResponse.data.results) {
            return moviesResponse.data.results
              .filter((movie: any) => movie.poster_path)
              .slice(0, 6)
              .map((movie: any) => ({
                id: `trending-movie-${movie.id}`,
                title: movie.title,
                description: movie.overview,
                imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                category: 'entertainment',
                source: 'movies' as const,
                publishedAt: movie.release_date,
                isFavorite: false,
                rating: movie.vote_average,
              }));
          }
          break;

        case 'social':
          return mockSocialPosts.slice(0, 6);

        default:
          return [];
      }
    } catch (error) {
      console.error(`Error fetching trending ${category}:`, error);
      return mockTrendingData[category as keyof typeof mockTrendingData] || [];
    }
  },

  async searchContent(query: string) {
    try {
      const lowerQuery = query.toLowerCase();
      const items: ContentItem[] = [];

      // Search in movies (both API and mock data)
      if (lowerQuery.includes('movie') || lowerQuery.includes('film') || lowerQuery.includes('cinema')) {
        // Add all movie content when searching for "movies"
        items.push(...mockMovieData);
      } else {
        // Search movie titles and descriptions
        const movieMatches = mockMovieData.filter(movie =>
          movie.title.toLowerCase().includes(lowerQuery) ||
          movie.description.toLowerCase().includes(lowerQuery) ||
          movie.category.toLowerCase().includes(lowerQuery)
        );
        items.push(...movieMatches);
      }

      // Search in social content
      if (lowerQuery.includes('social') || lowerQuery.includes('post') || lowerQuery.includes('tweet')) {
        // Add all social content when searching for "social"
        items.push(...mockSocialData);
      } else {
        // Search social titles and descriptions
        const socialMatches = mockSocialData.filter(post =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.category.toLowerCase().includes(lowerQuery) ||
          (post.platform && post.platform.toLowerCase().includes(lowerQuery))
        );
        items.push(...socialMatches);
      }

      // Search in news (try API first, then fallback)
      try {
        const newsResponse = await newsAPI.get('/everything', {
          params: {
            q: query,
            pageSize: 10,
            sortBy: 'relevancy',
          },
        });

        if (newsResponse.data.articles) {
          const newsItems = newsResponse.data.articles
            .filter((article: any) => article.title && article.urlToImage)
            .map((article: any) => ({
              id: `search-news-${article.url}`,
              title: article.title,
              description: article.description || '',
              imageUrl: article.urlToImage,
              category: 'news',
              source: 'news' as const,
              url: article.url,
              publishedAt: article.publishedAt,
              isFavorite: false,
            }));
          items.push(...newsItems);
        }
      } catch (newsError) {
        console.log('News API search failed, using mock data');
        // Fallback to mock news data
        const mockNewsData = [
          {
            id: 'news-1',
            title: 'Breaking: Technology News Update',
            description: 'Latest developments in the tech industry that are shaping our future.',
            imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'technology',
            source: 'news' as const,
            publishedAt: new Date().toISOString(),
            isFavorite: false,
          },
        ];
        
        if (lowerQuery.includes('news') || lowerQuery.includes('tech')) {
          items.push(...mockNewsData);
        }
      }

      // Try TMDB movie search
      try {
        const moviesResponse = await tmdbAPI.get('/search/movie', {
          params: {
            query,
          },
        });

        if (moviesResponse.data.results) {
          const movieItems = moviesResponse.data.results
            .filter((movie: any) => movie.poster_path)
            .slice(0, 5) // Limit to avoid too many results
            .map((movie: any) => ({
              id: `search-movie-${movie.id}`,
              title: movie.title,
              description: movie.overview,
              imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              category: 'entertainment',
              source: 'movies' as const,
              publishedAt: movie.release_date,
              isFavorite: false,
              rating: movie.vote_average,
            }));
          items.push(...movieItems);
        }
      } catch (movieError) {
        console.log('TMDB search failed, using mock data');
      }

      // Remove duplicates based on ID
      const uniqueItems = items.filter((item, index, self) => 
        index === self.findIndex(t => t.id === item.id)
      );

      return uniqueItems;
    } catch (error) {
      console.error('Error searching content:', error);
      // Return some default search results
      return [
        ...mockMovieData.slice(0, 3),
        ...mockSocialData.slice(0, 3)
      ];
    }
  },

  async searchContentAdvanced(filters: SearchFilters) {
    try {
      // For demo purposes, we'll use the basic search and then filter results
      let results = await this.searchContent(filters.query);

      // Apply category filter
      if (filters.category !== 'all') {
        results = results.filter(item => 
          item.category === filters.category || item.source === filters.category
        );
      }

      // Apply source filter
      if (filters.source !== 'all') {
        results = results.filter(item => item.source === filters.source);
      }

      // Apply date range filter
      if (filters.dateRange !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (filters.dateRange) {
          case 'today':
            filterDate.setDate(now.getDate() - 1);
            break;
          case 'week':
            filterDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            filterDate.setMonth(now.getMonth() - 1);
            break;
          case 'year':
            filterDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        results = results.filter(item => 
          new Date(item.publishedAt) >= filterDate
        );
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'date':
          results.sort((a, b) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
          break;
        case 'popularity':
          // For demo, we'll randomize as a proxy for popularity
          results.sort(() => Math.random() - 0.5);
          break;
        case 'relevance':
        default:
          // Keep original order (already sorted by relevance from API)
          break;
      }

      return results;
    } catch (error) {
      console.error('Error in advanced search:', error);
      return [];
    }
  },
};