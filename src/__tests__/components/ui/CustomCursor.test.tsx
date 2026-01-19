import { render, fireEvent, act, screen } from '@testing-library/react';
import { CustomCursor } from '@/components/ui/CustomCursor';

describe('CustomCursor', () => {
  const originalOntouchstart = Object.getOwnPropertyDescriptor(window, 'ontouchstart');

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset matchMedia to return desktop by default
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query.includes('max-width: 768px') ? false : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    // Ensure no touch support - delete the property entirely
    // @ts-expect-error - deleting for test purposes
    delete window.ontouchstart;
  });

  afterEach(() => {
    // Restore original state
    if (originalOntouchstart) {
      Object.defineProperty(window, 'ontouchstart', originalOntouchstart);
    }
  });

  it('renders cursor elements on desktop', () => {
    render(<CustomCursor />);
    const cursors = document.querySelectorAll('.pointer-events-none');
    expect(cursors.length).toBeGreaterThanOrEqual(2);
  });

  it('returns null on mobile devices', () => {
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query.includes('max-width: 768px') ? true : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null on touch devices', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: () => {},
      configurable: true,
    });

    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
  });

  it('tracks mouse movement', () => {
    render(<CustomCursor />);

    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });
    });

    // Cursor should be visible after mouse move
    const cursors = document.querySelectorAll('.pointer-events-none');
    expect(cursors.length).toBeGreaterThanOrEqual(2);
  });

  it('handles mouse enter on document body', () => {
    render(<CustomCursor />);

    act(() => {
      fireEvent.mouseEnter(document.body);
    });

    expect(document.querySelector('.pointer-events-none')).toBeInTheDocument();
  });

  it('handles mouse leave on document body', () => {
    render(<CustomCursor />);

    act(() => {
      fireEvent.mouseLeave(document.body);
    });

    expect(document.querySelector('.pointer-events-none')).toBeInTheDocument();
  });

  it('handles hover on interactive elements', () => {
    // Create an interactive element
    const button = document.createElement('button');
    button.textContent = 'Test Button';
    document.body.appendChild(button);

    render(<CustomCursor />);

    act(() => {
      fireEvent.mouseEnter(button);
    });

    act(() => {
      fireEvent.mouseLeave(button);
    });

    document.body.removeChild(button);
  });

  it('handles hover on images', () => {
    // Create an image element
    const img = document.createElement('img');
    img.src = 'test.jpg';
    document.body.appendChild(img);

    render(<CustomCursor />);

    act(() => {
      fireEvent.mouseEnter(img);
    });

    act(() => {
      fireEvent.mouseLeave(img);
    });

    document.body.removeChild(img);
  });

  it('handles window resize events', () => {
    render(<CustomCursor />);

    act(() => {
      fireEvent.resize(window);
    });

    expect(document.querySelector('.pointer-events-none')).toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<CustomCursor />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    removeEventListenerSpy.mockRestore();
  });

  it('has high z-index for visibility', () => {
    render(<CustomCursor />);
    const element = document.querySelector('.z-\\[9999\\]');
    expect(element).toBeInTheDocument();
  });

  it('has rounded-full class for circular cursor', () => {
    render(<CustomCursor />);
    const roundedElements = document.querySelectorAll('.rounded-full');
    expect(roundedElements.length).toBeGreaterThanOrEqual(1);
  });
});
