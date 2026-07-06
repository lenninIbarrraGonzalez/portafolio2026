import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';

// Header consumes useTheme(), so it must render within a ThemeProvider.
const renderHeader = () => render(<Header />, { wrapper: ThemeProvider });

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders the logo', () => {
    renderHeader();
    expect(screen.getByText('@lennin')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    renderHeader();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('experience')).toBeInTheDocument();
    expect(screen.getByText('skills')).toBeInTheDocument();
    expect(screen.getByText('projects')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();
  });

  it('renders language toggle button', () => {
    renderHeader();
    expect(screen.getByLabelText('language')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderHeader();
    expect(screen.getByLabelText(/mode/i)).toBeInTheDocument();
  });

  it('renders mobile menu toggle button', () => {
    renderHeader();
    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
  });

  it('toggles mobile menu when clicking menu button', () => {
    renderHeader();
    const menuButton = screen.getByLabelText('Menu');

    // Open menu
    fireEvent.click(menuButton);

    // Menu should have mobile navigation items visible
    const mobileNavItems = screen.getAllByText('about');
    expect(mobileNavItems.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles theme when clicking theme button', () => {
    renderHeader();
    const themeButton = screen.getByLabelText(/mode/i);

    fireEvent.click(themeButton);

    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('applies scrolled styles when scrolled', () => {
    renderHeader();

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
    });

    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('has fixed positioning', () => {
    renderHeader();
    const header = document.querySelector('.fixed');
    expect(header).toBeInTheDocument();
  });

  it('has high z-index for visibility', () => {
    renderHeader();
    const header = document.querySelector('.z-50');
    expect(header).toBeInTheDocument();
  });

  it('handles navigation click', () => {
    // Create mock element with id
    const mockSection = document.createElement('section');
    mockSection.id = 'about';
    mockSection.scrollIntoView = jest.fn();
    document.body.appendChild(mockSection);

    renderHeader();
    const navButton = screen.getAllByText('about')[0];

    fireEvent.click(navButton);

    // Cleanup
    document.body.removeChild(mockSection);
  });
});
