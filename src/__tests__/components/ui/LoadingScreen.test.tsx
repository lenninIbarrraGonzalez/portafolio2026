import { render, screen, act, waitFor } from '@testing-library/react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

describe('LoadingScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (window.sessionStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? false : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders loading screen initially', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Lennin Ibarra')).toBeInTheDocument();
  });

  it('renders Portfolio subtitle', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('shows initial terminal line', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/Initializing portfolio/)).toBeInTheDocument();
  });

  it('shows progress percentage', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/loaded/)).toBeInTheDocument();
  });

  it('does not render if user has already seen loading', () => {
    (window.sessionStorage.getItem as jest.Mock).mockReturnValue('true');
    const { container } = render(<LoadingScreen />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render with reduced motion preference', () => {
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? true : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { container } = render(<LoadingScreen />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onComplete callback when finished', async () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);

    // Advance timers to complete loading
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    }, { timeout: 5000 });
  });

  it('saves to sessionStorage after completion', async () => {
    render(<LoadingScreen />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    await waitFor(() => {
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith('hasSeenLoading', 'true');
    });
  });

  it('has loading-screen class', () => {
    render(<LoadingScreen />);
    expect(document.querySelector('.loading-screen')).toBeInTheDocument();
  });

  it('renders progress bar container', () => {
    render(<LoadingScreen />);
    const progressBar = document.querySelector('.bg-muted');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders decorative blur elements', () => {
    render(<LoadingScreen />);
    const blurElements = document.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThanOrEqual(2);
  });
});
