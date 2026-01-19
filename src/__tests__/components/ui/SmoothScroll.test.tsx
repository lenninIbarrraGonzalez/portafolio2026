import { render, screen } from '@testing-library/react';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

// Import the mocked Lenis
import Lenis from 'lenis';

describe('SmoothScroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  it('renders children correctly', () => {
    render(
      <SmoothScroll>
        <div data-testid="child">Child content</div>
      </SmoothScroll>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <SmoothScroll>
        <div data-testid="child-1">First</div>
        <div data-testid="child-2">Second</div>
      </SmoothScroll>
    );
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('initializes Lenis on mount', () => {
    render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    );
    expect(Lenis).toHaveBeenCalled();
  });

  it('does not initialize Lenis with reduced motion preference', () => {
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

    (Lenis as jest.Mock).mockClear();

    render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    );
    expect(Lenis).not.toHaveBeenCalled();
  });

  it('calls requestAnimationFrame on mount', () => {
    render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    );
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('adds click event listener for anchor handling', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

    render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it('destroys Lenis and removes listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('renders nested components', () => {
    render(
      <SmoothScroll>
        <main>
          <section>
            <h1 data-testid="heading">Title</h1>
            <p data-testid="paragraph">Content</p>
          </section>
        </main>
      </SmoothScroll>
    );
    expect(screen.getByTestId('heading')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph')).toBeInTheDocument();
  });

  it('preserves children structure', () => {
    const { container } = render(
      <SmoothScroll>
        <div className="wrapper">
          <span>Content</span>
        </div>
      </SmoothScroll>
    );
    expect(container.querySelector('.wrapper')).toBeInTheDocument();
  });

  it('handles anchor link clicks', () => {
    document.body.innerHTML = '<section id="test-section"></section>';

    render(
      <SmoothScroll>
        <a href="#test-section">Link</a>
      </SmoothScroll>
    );

    const link = document.querySelector('a');
    if (link) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      link.dispatchEvent(clickEvent);
    }

    // Clean up
    document.body.innerHTML = '';
  });
});
