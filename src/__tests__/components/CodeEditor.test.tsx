import { render, screen, act } from '@testing-library/react';
import { CodeEditor } from '@/components/CodeEditor';
import en from '@/messages/en.json';

// Override the global next-intl mock to resolve real translations for this component
jest.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => {
    const messages = en as Record<string, unknown>;
    const ns: Record<string, unknown> = namespace
      ? (messages[namespace] as Record<string, unknown>) ?? {}
      : messages;
    const t = (key: string, values?: Record<string, unknown>): string => {
      const parts = key.split('.');
      let value: unknown = ns;
      for (const part of parts) {
        value = (value as Record<string, unknown>)?.[part];
      }
      let str = typeof value === 'string' ? value : key;
      if (values) {
        str = str.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ''));
      }
      return str;
    };
    t.raw = (key: string): unknown => {
      const parts = key.split('.');
      let value: unknown = ns;
      for (const part of parts) {
        value = (value as Record<string, unknown>)?.[part];
      }
      return value;
    };
    return t;
  },
  useLocale: () => 'en',
  useMessages: () => ({}),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('CodeEditor', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the editor container', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('renders title bar with window controls', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByTestId('editor-titlebar')).toBeInTheDocument();
  });

  it('renders traffic light buttons', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByTestId('traffic-light-red')).toBeInTheDocument();
    expect(screen.getByTestId('traffic-light-yellow')).toBeInTheDocument();
    expect(screen.getByTestId('traffic-light-green')).toBeInTheDocument();
  });

  it('renders filename in title bar', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByTestId('editor-titlebar')).toBeInTheDocument();
  });

  it('renders line numbers', () => {
    render(<CodeEditor isInView={true} />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByTestId('line-numbers')).toBeInTheDocument();
  });

  it('renders blinking cursor', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByTestId('code-cursor')).toBeInTheDocument();
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
    expect(screen.getByText('Tips for getting started')).toBeInTheDocument();
  });

  it('renders recent activity section', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByText('Recent activity')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CodeEditor isInView={true} className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('does not animate when not in view', () => {
    render(<CodeEditor isInView={false} />);
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('has dark background color', () => {
    render(<CodeEditor isInView={true} />);
    expect(screen.getByTestId('code-editor-window')).toBeInTheDocument();
  });

  it('cycles through code variations', () => {
    render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('completes typing and restarts', () => {
    render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('cleans up timers on unmount', () => {
    const { unmount } = render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(5000);
    });
  });

  it('types through all segments and completes', () => {
    render(<CodeEditor isInView={true} />);

    for (let i = 0; i < 100; i++) {
      act(() => {
        jest.advanceTimersByTime(35);
      });
    }

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('handles segment transitions during typing', () => {
    render(<CodeEditor isInView={true} />);

    for (let i = 0; i < 200; i++) {
      act(() => {
        jest.advanceTimersByTime(35);
      });
    }

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('restarts animation after completion', () => {
    render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
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

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('stops typing when not in view', () => {
    const { rerender } = render(<CodeEditor isInView={true} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender(<CodeEditor isInView={false} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });
});
