import { render, screen, act, waitFor } from '@testing-library/react';
import { ClientWrapper } from '@/components/ClientWrapper';

// Mock child components
jest.mock('@/components/ui/LoadingScreen', () => ({
  LoadingScreen: ({ onComplete }: { onComplete: () => void }) => {
    // Call onComplete after a short delay to simulate loading
    setTimeout(onComplete, 0);
    return <div data-testid="loading-screen">Loading...</div>;
  },
}));

jest.mock('@/components/ui/CustomCursor', () => ({
  CustomCursor: () => <div data-testid="custom-cursor">Cursor</div>,
}));

jest.mock('@/components/ui/ScrollProgress', () => ({
  ScrollProgress: () => <div data-testid="scroll-progress">Progress</div>,
}));

jest.mock('@/components/ui/SmoothScroll', () => ({
  SmoothScroll: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="smooth-scroll">{children}</div>
  ),
}));

jest.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ClientWrapper', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders LoadingScreen component', () => {
    render(
      <ClientWrapper>
        <div>Content</div>
      </ClientWrapper>
    );
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('renders CustomCursor component', () => {
    render(
      <ClientWrapper>
        <div>Content</div>
      </ClientWrapper>
    );
    expect(screen.getByTestId('custom-cursor')).toBeInTheDocument();
  });

  it('renders ScrollProgress component', () => {
    render(
      <ClientWrapper>
        <div>Content</div>
      </ClientWrapper>
    );
    expect(screen.getByTestId('scroll-progress')).toBeInTheDocument();
  });

  it('renders children after loading completes', async () => {
    render(
      <ClientWrapper>
        <div data-testid="child-content">Child Content</div>
      </ClientWrapper>
    );

    // Advance timers to complete loading
    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(screen.getByTestId('smooth-scroll')).toBeInTheDocument();
    });
  });

  it('wraps children in SmoothScroll after loading', async () => {
    render(
      <ClientWrapper>
        <div data-testid="child-content">Child Content</div>
      </ClientWrapper>
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      const smoothScroll = screen.getByTestId('smooth-scroll');
      expect(smoothScroll).toBeInTheDocument();
    });
  });

  it('renders multiple children correctly', async () => {
    render(
      <ClientWrapper>
        <div data-testid="child-1">First</div>
        <div data-testid="child-2">Second</div>
      </ClientWrapper>
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(screen.getByTestId('smooth-scroll')).toBeInTheDocument();
    });
  });
});
