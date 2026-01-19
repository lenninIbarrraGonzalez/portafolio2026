import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
const createMatchMediaMock = (prefersDark: boolean, prefersLight: boolean) => {
  return jest.fn((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' ? prefersDark : prefersLight,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

// Test component that uses the hook
function ThemeConsumer() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>Toggle</button>
      <button data-testid="set-light-btn" onClick={() => setTheme('light')}>Set Light</button>
      <button data-testid="set-dark-btn" onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    document.documentElement.classList.remove('dark');
    window.matchMedia = createMatchMediaMock(true, false);
  });

  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Child Content</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
  });

  it('has dark theme as default', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Initial state should be dark
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('reads theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Should read from localStorage on mount
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });

  it('detects system preference for light mode', async () => {
    window.matchMedia = createMatchMediaMock(false, true);

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Wait for useEffect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  it('defaults to dark when no system preference and no localStorage', async () => {
    window.matchMedia = createMatchMediaMock(false, false);

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('toggleTheme changes between light and dark', async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Initial state is dark
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

    // Toggle to light
    await act(async () => {
      screen.getByTestId('toggle-btn').click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    // Toggle back to dark
    await act(async () => {
      screen.getByTestId('toggle-btn').click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('setTheme sets specific theme', async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Set to light
    await act(async () => {
      screen.getByTestId('set-light-btn').click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    // Set to dark
    await act(async () => {
      screen.getByTestId('set-dark-btn').click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('persists theme to localStorage on change', async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Wait for initial mount effect
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Toggle theme
    await act(async () => {
      screen.getByTestId('toggle-btn').click();
    });

    // Wait for persistence effect
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', expect.any(String));
  });

  it('adds dark class to document when theme is dark', async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Wait for mount and effect
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from document when theme is light', async () => {
    document.documentElement.classList.add('dark');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Set to light
    await act(async () => {
      screen.getByTestId('set-light-btn').click();
    });

    // Wait for effect
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('useTheme', () => {
  it('throws error when used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ThemeConsumer />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });
});
