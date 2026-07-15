import { render, screen } from '@testing-library/react';
import { ClientWrapper } from '@/components/ClientWrapper';

// Mock child components. LoadingScreen is now a self-managing overlay: it no
// longer gates the page behind an onComplete callback.
jest.mock('@/components/ui/LoadingScreen', () => ({
  LoadingScreen: () => <div data-testid="loading-screen">Loading...</div>,
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

  it('renders children immediately, not gated behind the loading screen', () => {
    render(
      <ClientWrapper>
        <div data-testid="child-content">Child Content</div>
      </ClientWrapper>
    );

    expect(screen.getByTestId('smooth-scroll')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('wraps children in SmoothScroll', () => {
    render(
      <ClientWrapper>
        <div data-testid="child-content">Child Content</div>
      </ClientWrapper>
    );

    const smoothScroll = screen.getByTestId('smooth-scroll');
    expect(smoothScroll).toBeInTheDocument();
    expect(smoothScroll).toContainElement(screen.getByTestId('child-content'));
  });

  it('renders multiple children correctly', () => {
    render(
      <ClientWrapper>
        <div data-testid="child-1">First</div>
        <div data-testid="child-2">Second</div>
      </ClientWrapper>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});
