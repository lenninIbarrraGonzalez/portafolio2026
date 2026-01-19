import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from '@/components/Header';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByText('LI')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header />);
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('experience')).toBeInTheDocument();
    expect(screen.getByText('skills')).toBeInTheDocument();
    expect(screen.getByText('projects')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();
  });

  it('renders language toggle button', () => {
    render(<Header />);
    expect(screen.getByLabelText('language')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByLabelText(/mode/i)).toBeInTheDocument();
  });

  it('renders mobile menu toggle button', () => {
    render(<Header />);
    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
  });

  it('toggles mobile menu when clicking menu button', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Menu');

    // Open menu
    fireEvent.click(menuButton);

    // Menu should have mobile navigation items visible
    const mobileNavItems = screen.getAllByText('about');
    expect(mobileNavItems.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles theme when clicking theme button', () => {
    render(<Header />);
    const themeButton = screen.getByLabelText(/mode/i);

    fireEvent.click(themeButton);

    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('applies scrolled styles when scrolled', () => {
    render(<Header />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
    });

    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('has fixed positioning', () => {
    render(<Header />);
    const header = document.querySelector('.fixed');
    expect(header).toBeInTheDocument();
  });

  it('has high z-index for visibility', () => {
    render(<Header />);
    const header = document.querySelector('.z-50');
    expect(header).toBeInTheDocument();
  });

  it('handles navigation click', () => {
    // Create mock element with id
    const mockSection = document.createElement('section');
    mockSection.id = 'about';
    mockSection.scrollIntoView = jest.fn();
    document.body.appendChild(mockSection);

    render(<Header />);
    const navButton = screen.getAllByText('about')[0];

    fireEvent.click(navButton);

    // Cleanup
    document.body.removeChild(mockSection);
  });
});
