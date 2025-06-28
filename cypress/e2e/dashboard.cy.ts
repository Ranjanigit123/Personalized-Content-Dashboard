describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the dashboard', () => {
    cy.contains('ContentHub').should('be.visible');
    cy.contains('Your Personalized Feed').should('be.visible');
  });

  it('should navigate between sections', () => {
    // Click on Trending
    cy.contains('Trending').click();
    cy.contains('Trending Now').should('be.visible');

    // Click on Favorites
    cy.contains('Favorites').click();
    cy.contains('Your Favorites').should('be.visible');

    // Go back to Feed
    cy.contains('Personalized Feed').click();
    cy.contains('Your Personalized Feed').should('be.visible');
  });

  it('should perform search functionality', () => {
    // Type in search box
    cy.get('input[placeholder="Search content..."]').type('technology');
    
    // Wait for debounced search
    cy.wait(1000);
    
    // Check if search results appear
    cy.contains('Search Results').should('be.visible');
  });

  it('should toggle dark mode', () => {
    // Get the current theme
    cy.get('html').then(($html) => {
      const isDark = $html.hasClass('dark');
      
      // Click dark mode toggle
      cy.get('button').contains('svg').click();
      
      // Verify theme changed
      cy.get('html').should(isDark ? 'not.have.class' : 'have.class', 'dark');
    });
  });

  it('should toggle sidebar', () => {
    // Click sidebar toggle
    cy.get('button').first().click();
    
    // Verify sidebar state changed (this would depend on your specific implementation)
    cy.get('[data-testid="sidebar"]').should('not.be.visible');
  });

  it('should add items to favorites', () => {
    // Wait for content to load
    cy.wait(2000);
    
    // Find and click a heart button
    cy.get('[data-testid="favorite-button"]').first().click();
    
    // Navigate to favorites
    cy.contains('Favorites').click();
    
    // Verify item appears in favorites
    cy.get('[data-testid="content-card"]').should('have.length.at.least', 1);
  });
});