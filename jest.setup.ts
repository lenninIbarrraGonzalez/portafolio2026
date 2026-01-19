import '@testing-library/jest-dom';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string, values?: Record<string, unknown>) => {
      if (values) {
        let result = key;
        Object.entries(values).forEach(([k, v]) => {
          result = result.replace(`{${k}}`, String(v));
        });
        return result;
      }
      return key;
    };
    // Add raw method for accessing raw array values
    t.raw = (key: string) => {
      // Return mock arrays for known keys
      if (key.includes('roles')) return ['Frontend Developer', 'React Engineer'];
      if (key.includes('tags')) return ['React', 'TypeScript', 'Next.js'];
      if (key.includes('highlights')) return ['Highlight 1', 'Highlight 2'];
      return [];
    };
    return t;
  },
  useLocale: () => 'es',
  useMessages: () => ({}),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock @/i18n/navigation
jest.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    const React = require('react');
    return React.createElement('a', { href, ...props }, children);
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  redirect: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');

  const createMotionComponent = (tag: string) => {
    return React.forwardRef(({ children, initial, animate, exit, variants, whileHover, whileTap, whileInView, transition, ...props }: Record<string, unknown>, ref: unknown) => {
      return React.createElement(tag, { ...props, ref }, children);
    });
  };

  return {
    motion: {
      div: createMotionComponent('div'),
      span: createMotionComponent('span'),
      p: createMotionComponent('p'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      h4: createMotionComponent('h4'),
      a: createMotionComponent('a'),
      button: createMotionComponent('button'),
      section: createMotionComponent('section'),
      article: createMotionComponent('article'),
      header: createMotionComponent('header'),
      footer: createMotionComponent('footer'),
      nav: createMotionComponent('nav'),
      ul: createMotionComponent('ul'),
      li: createMotionComponent('li'),
      img: createMotionComponent('img'),
      svg: createMotionComponent('svg'),
      path: createMotionComponent('path'),
      form: createMotionComponent('form'),
      input: createMotionComponent('input'),
      textarea: createMotionComponent('textarea'),
      label: createMotionComponent('label'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useInView: () => true,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: jest.fn(),
      onChange: jest.fn(),
    }),
    useSpring: (value: number) => ({
      get: () => value,
      set: jest.fn(),
    }),
    useTransform: (_value: unknown, _input: unknown, output: number[]) => ({
      get: () => output[0],
    }),
    useScroll: () => ({
      scrollY: { get: () => 0 },
      scrollYProgress: { get: () => 0 },
    }),
    useReducedMotion: () => false,
  };
});

// Mock lenis
jest.mock('lenis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    destroy: jest.fn(),
    raf: jest.fn(),
    scrollTo: jest.fn(),
    stop: jest.fn(),
    start: jest.fn(),
  }));
});

// Mock @react-three/fiber
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'three-canvas' }, children);
  },
  useFrame: jest.fn(),
  useThree: () => ({
    size: { width: 800, height: 600 },
    camera: {},
    gl: {},
    scene: {},
  }),
  extend: jest.fn(),
}));

// Mock @react-three/drei
jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  PerspectiveCamera: () => null,
  Environment: () => null,
  Float: ({ children }: { children: React.ReactNode }) => children,
  Html: ({ children }: { children: React.ReactNode }) => {
    const React = require('react');
    return React.createElement('div', null, children);
  },
  Text: () => null,
  useTexture: () => ({}),
  Sphere: () => null,
  Box: () => null,
  Torus: () => null,
  MeshDistortMaterial: () => null,
  Trail: ({ children }: { children: React.ReactNode }) => children,
  Line: () => null,
}));

// Mock embla-carousel-react
jest.mock('embla-carousel-react', () => {
  return jest.fn().mockReturnValue([
    jest.fn(), // ref
    {
      scrollPrev: jest.fn(),
      scrollNext: jest.fn(),
      scrollTo: jest.fn(),
      canScrollPrev: jest.fn().mockReturnValue(true),
      canScrollNext: jest.fn().mockReturnValue(true),
      on: jest.fn(),
      off: jest.fn(),
      selectedScrollSnap: jest.fn().mockReturnValue(0),
      scrollSnapList: jest.fn().mockReturnValue([0, 1, 2]),
    },
  ]);
});

// Mock embla-carousel-autoplay
jest.mock('embla-carousel-autoplay', () => {
  return jest.fn().mockReturnValue({
    name: 'autoplay',
    options: {},
  });
});

// Mock typewriter-effect
jest.mock('typewriter-effect', () => {
  return function MockTypewriter({ options }: { options?: { strings?: string[] } }) {
    const React = require('react');
    const strings = options?.strings || [];
    return React.createElement('span', { 'data-testid': 'typewriter' }, strings[0] || '');
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const React = require('react');
  const createIcon = (name: string) => {
    return function MockIcon(props: Record<string, unknown>) {
      return React.createElement('svg', { 'data-testid': `icon-${name.toLowerCase()}`, ...props });
    };
  };

  return {
    Menu: createIcon('Menu'),
    X: createIcon('X'),
    Sun: createIcon('Sun'),
    Moon: createIcon('Moon'),
    Globe: createIcon('Globe'),
    MapPin: createIcon('MapPin'),
    Briefcase: createIcon('Briefcase'),
    Code: createIcon('Code'),
    Building: createIcon('Building'),
    Mail: createIcon('Mail'),
    Phone: createIcon('Phone'),
    Linkedin: createIcon('Linkedin'),
    Github: createIcon('Github'),
    Twitter: createIcon('Twitter'),
    ExternalLink: createIcon('ExternalLink'),
    ChevronLeft: createIcon('ChevronLeft'),
    ChevronRight: createIcon('ChevronRight'),
    ChevronUp: createIcon('ChevronUp'),
    ChevronDown: createIcon('ChevronDown'),
    ArrowRight: createIcon('ArrowRight'),
    ArrowUpRight: createIcon('ArrowUpRight'),
    ArrowDown: createIcon('ArrowDown'),
    Download: createIcon('Download'),
    Send: createIcon('Send'),
    Calendar: createIcon('Calendar'),
    Clock: createIcon('Clock'),
    GraduationCap: createIcon('GraduationCap'),
    BookOpen: createIcon('BookOpen'),
    Award: createIcon('Award'),
    Star: createIcon('Star'),
    Heart: createIcon('Heart'),
    Coffee: createIcon('Coffee'),
    Quote: createIcon('Quote'),
    Play: createIcon('Play'),
    Pause: createIcon('Pause'),
    Check: createIcon('Check'),
    Copy: createIcon('Copy'),
    Terminal: createIcon('Terminal'),
    Folder: createIcon('Folder'),
    File: createIcon('File'),
    FileCode: createIcon('FileCode'),
    Link: createIcon('Link'),
    Hash: createIcon('Hash'),
    User: createIcon('User'),
    Users: createIcon('Users'),
    Settings: createIcon('Settings'),
    Search: createIcon('Search'),
    Filter: createIcon('Filter'),
    Layers: createIcon('Layers'),
    Layout: createIcon('Layout'),
    Grid: createIcon('Grid'),
    List: createIcon('List'),
    Eye: createIcon('Eye'),
    EyeOff: createIcon('EyeOff'),
    Maximize: createIcon('Maximize'),
    Minimize: createIcon('Minimize'),
    ArrowUp: createIcon('ArrowUp'),
    RotateCw: createIcon('RotateCw'),
    Trophy: createIcon('Trophy'),
  };
});

// Mock react-icons
jest.mock('react-icons/si', () => {
  const React = require('react');
  const createIcon = (name: string) => {
    return function MockIcon(props: Record<string, unknown>) {
      return React.createElement('svg', { 'data-testid': `si-icon-${name.toLowerCase()}`, ...props });
    };
  };

  return new Proxy({}, {
    get: (_, prop) => createIcon(String(prop)),
  });
});

jest.mock('react-icons/fa', () => {
  const React = require('react');
  const createIcon = (name: string) => {
    return function MockIcon(props: Record<string, unknown>) {
      return React.createElement('svg', { 'data-testid': `fa-icon-${name.toLowerCase()}`, ...props });
    };
  };

  return new Proxy({}, {
    get: (_, prop) => createIcon(String(prop)),
  });
});

// Browser API mocks
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback) {
    // Immediately call callback with mock entries
    setTimeout(() => {
      callback([
        {
          isIntersecting: true,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: 1,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          target: document.createElement('div'),
          time: Date.now(),
        },
      ], this);
    }, 0);
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn().mockReturnValue([]);
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  constructor() {}
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  return setTimeout(callback, 0);
});

global.cancelAnimationFrame = jest.fn((id) => {
  clearTimeout(id);
});

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock @/config/social
jest.mock('@/config/social', () => {
  const React = require('react');
  const createIcon = (name: string) => {
    return function MockIcon(props: Record<string, unknown>) {
      return React.createElement('svg', { 'data-testid': `social-icon-${name.toLowerCase()}`, ...props });
    };
  };

  return {
    PERSONAL_INFO: {
      name: 'Lennin Ibarra',
      email: 'test@example.com',
      phone: '+573154415599',
      location: 'Bogotá, Colombia',
      website: 'https://example.com',
      cvPath: '/docs/cv.pdf',
    },
    HERO_SOCIAL_LINKS: [
      { icon: createIcon('Github'), href: 'https://github.com/test', label: 'GitHub' },
      { icon: createIcon('Linkedin'), href: 'https://linkedin.com/test', label: 'LinkedIn' },
    ],
    CONTACT_SOCIAL_LINKS: [
      { icon: createIcon('Github'), href: 'https://github.com/test', label: 'GitHub' },
      { icon: createIcon('Mail'), href: 'mailto:test@example.com', label: 'Email' },
    ],
    LINKEDIN_URL: 'https://linkedin.com/test',
    WhatsAppIcon: createIcon('WhatsApp'),
  };
});

// Mock next/image
jest.mock('next/image', () => {
  const React = require('react');
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { src, alt, ...props });
  };
});

// Mock next/dynamic
jest.mock('next/dynamic', () => {
  return function mockDynamic(
    _importFn: () => Promise<{ default: React.ComponentType }>,
    _options?: { ssr?: boolean }
  ) {
    const React = require('react');
    // Return a simple functional component that renders a placeholder
    return function DynamicComponent(props: Record<string, unknown>) {
      return React.createElement('div', { 'data-testid': 'dynamic-component', ...props });
    };
  };
});

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
  (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
  (window.sessionStorage.getItem as jest.Mock).mockReturnValue(null);
});
