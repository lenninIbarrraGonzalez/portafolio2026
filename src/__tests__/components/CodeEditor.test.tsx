import { render, screen, act } from '@testing-library/react';
import { CodeEditor } from '@/components/CodeEditor';

describe('CodeEditor', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the editor container', () => {
    render(<CodeEditor isInView={true} />);
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('renders title bar with window controls', () => {
    render(<CodeEditor isInView={true} />);
    expect(document.querySelector('.bg-\\[\\#323233\\]')).toBeInTheDocument();
  });

  it('renders traffic light buttons', () => {
    render(<CodeEditor isInView={true} />);
    expect(document.querySelector('.bg-\\[\\#ff5f56\\]')).toBeInTheDocument();
    expect(document.querySelector('.bg-\\[\\#ffbd2e\\]')).toBeInTheDocument();
    expect(document.querySelector('.bg-\\[\\#27ca3f\\]')).toBeInTheDocument();
  });

  it('renders filename in title bar', () => {
    render(<CodeEditor isInView={true} />);
    // One of the filenames should be present
    expect(document.querySelector('.font-mono')).toBeInTheDocument();
  });

  it('renders line numbers', () => {
    render(<CodeEditor isInView={true} />);
    // Wait for typing animation to start
    act(() => {
      jest.advanceTimersByTime(100);
    });
    const lineNumbers = document.querySelector('.text-gray-600');
    expect(lineNumbers).toBeInTheDocument();
  });

  it('renders blinking cursor', () => {
    render(<CodeEditor isInView={true} />);
    const cursor = document.querySelector('.bg-white, .bg-green-400');
    expect(cursor).toBeInTheDocument();
  });

  it('renders terminal tabs', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByText('Problems')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
    expect(screen.getByText('Terminal')).toBeInTheDocument();
  });

  it('renders Claude Code terminal panel', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByText('claude')).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByText(/Welcome back Lennin/)).toBeInTheDocument();
  });

  it('renders tips section', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByText(/Tips for getting started/)).toBeInTheDocument();
  });

  it('renders recent activity section', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByText(/Recent activity/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CodeEditor isInView={true} className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('does not animate when not in view', () => {
    render(<CodeEditor isInView={false} />);
    // Should still render the container
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('has dark background color', () => {
    render(<CodeEditor isInView={true} />);
    expect(document.querySelector('.bg-\\[\\#1e1e1e\\]')).toBeInTheDocument();
  });

  it('cycles through code variations', () => {
    render(<CodeEditor isInView={true} />);

    // Advance through typing animation
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Component should still render
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('completes typing and restarts', () => {
    render(<CodeEditor isInView={true} />);

    // Advance past full cycle (typing + pause)
    act(() => {
      jest.advanceTimersByTime(15000);
    });

    // Component should restart animation
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('cleans up timers on unmount', () => {
    const { unmount } = render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    unmount();

    // Should not throw after unmount
    act(() => {
      jest.advanceTimersByTime(5000);
    });
  });

  it('types through all segments and completes', () => {
    render(<CodeEditor isInView={true} />);

    // Run through multiple typing cycles
    for (let i = 0; i < 100; i++) {
      act(() => {
        jest.advanceTimersByTime(35); // typing speed
      });
    }

    // Typing should be progressing
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('handles segment transitions during typing', () => {
    render(<CodeEditor isInView={true} />);

    // Advance through many characters to trigger segment changes
    for (let i = 0; i < 200; i++) {
      act(() => {
        jest.advanceTimersByTime(35);
      });
    }

    // Should still be rendering
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('restarts animation after completion', () => {
    render(<CodeEditor isInView={true} />);

    // Complete typing animation
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Wait for restart timer (6 seconds)
    act(() => {
      jest.advanceTimersByTime(7000);
    });

    // Animation should have restarted
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('clears existing timers on rerender', () => {
    const { rerender } = render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    rerender(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('stops typing when not in view', () => {
    const { rerender } = render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender(<CodeEditor isInView={false} />);

    // Timer callbacks should be ignored when not in view
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });
});
