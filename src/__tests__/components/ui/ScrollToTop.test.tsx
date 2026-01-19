import { render, screen, fireEvent, act } from '@testing-library/react';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 3000, writable: true });
  });

  it('does not render button initially', () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows button when scrolled past threshold', () => {
    render(<ScrollToTop />);

    // Scroll past 35% threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('hides button when scrolled back up', () => {
    render(<ScrollToTop />);

    // First scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole('button')).toBeInTheDocument();

    // Then scroll back up
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Scroll to top');
  });

  it('calls window.scrollTo when clicked', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    fireEvent.click(screen.getByRole('button'));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('has fixed positioning', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole('button')).toHaveClass('fixed');
  });

  it('is positioned at bottom right', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bottom-8');
    expect(button).toHaveClass('right-8');
  });

  it('has proper z-index', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole('button')).toHaveClass('z-50');
  });

  it('renders arrow icon', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500, writable: true });
      fireEvent.scroll(window);
    });

    // The mock creates svg with data-testid
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollToTop />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
