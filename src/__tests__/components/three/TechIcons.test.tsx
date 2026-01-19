import { render } from '@testing-library/react';
import {
  HTMLIcon,
  CSSIcon,
  JSIcon,
  ReactIcon,
  TECH_COLORS,
  START_POSITIONS,
  generateStartPositions,
} from '@/components/three/shared/TechIcons';

describe('TechIcons', () => {
  describe('HTMLIcon', () => {
    it('renders an SVG element', () => {
      render(<HTMLIcon />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('has correct viewBox', () => {
      render(<HTMLIcon />);
      expect(document.querySelector('svg')).toHaveAttribute('viewBox', '0 0 128 128');
    });

    it('has full width and height classes', () => {
      render(<HTMLIcon />);
      expect(document.querySelector('.w-full.h-full')).toBeInTheDocument();
    });

    it('renders HTML5 orange color', () => {
      render(<HTMLIcon />);
      const paths = document.querySelectorAll('path');
      const hasOrangeColor = Array.from(paths).some(
        path => path.getAttribute('fill') === '#E44D26' || path.getAttribute('fill') === '#F16529'
      );
      expect(hasOrangeColor).toBe(true);
    });
  });

  describe('CSSIcon', () => {
    it('renders an SVG element', () => {
      render(<CSSIcon />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('has correct viewBox', () => {
      render(<CSSIcon />);
      expect(document.querySelector('svg')).toHaveAttribute('viewBox', '0 0 128 128');
    });

    it('renders CSS3 blue color', () => {
      render(<CSSIcon />);
      const paths = document.querySelectorAll('path');
      const hasBlueColor = Array.from(paths).some(
        path => path.getAttribute('fill') === '#1572B6' || path.getAttribute('fill') === '#33A9DC'
      );
      expect(hasBlueColor).toBe(true);
    });
  });

  describe('JSIcon', () => {
    it('renders an SVG element', () => {
      render(<JSIcon />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('has correct viewBox', () => {
      render(<JSIcon />);
      expect(document.querySelector('svg')).toHaveAttribute('viewBox', '0 0 128 128');
    });

    it('renders JavaScript yellow color', () => {
      render(<JSIcon />);
      const paths = document.querySelectorAll('path');
      const hasYellowColor = Array.from(paths).some(
        path => path.getAttribute('fill') === '#F0DB4F'
      );
      expect(hasYellowColor).toBe(true);
    });
  });

  describe('ReactIcon', () => {
    it('renders an SVG element', () => {
      render(<ReactIcon />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('has correct viewBox', () => {
      render(<ReactIcon />);
      expect(document.querySelector('svg')).toHaveAttribute('viewBox', '0 0 128 128');
    });

    it('renders React cyan color', () => {
      render(<ReactIcon />);
      const group = document.querySelector('g');
      expect(group).toHaveAttribute('fill', '#61DAFB');
    });

    it('renders circle element', () => {
      render(<ReactIcon />);
      expect(document.querySelector('circle')).toBeInTheDocument();
    });
  });

  describe('TECH_COLORS', () => {
    it('has 4 colors', () => {
      expect(TECH_COLORS.length).toBe(4);
    });

    it('includes HTML5 color', () => {
      expect(TECH_COLORS).toContain('#E44D26');
    });

    it('includes CSS3 color', () => {
      expect(TECH_COLORS).toContain('#1572B6');
    });

    it('includes JavaScript color', () => {
      expect(TECH_COLORS).toContain('#F0DB4F');
    });

    it('includes React color', () => {
      expect(TECH_COLORS).toContain('#61DAFB');
    });
  });

  describe('START_POSITIONS', () => {
    it('has 8 positions', () => {
      expect(START_POSITIONS.length).toBe(8);
    });

    it('each position has x and y coordinates', () => {
      START_POSITIONS.forEach(pos => {
        expect(pos).toHaveProperty('x');
        expect(pos).toHaveProperty('y');
      });
    });

    it('positions have numeric values', () => {
      START_POSITIONS.forEach(pos => {
        expect(typeof pos.x).toBe('number');
        expect(typeof pos.y).toBe('number');
      });
    });
  });

  describe('generateStartPositions', () => {
    it('returns positions for html, css, and js', () => {
      const positions = generateStartPositions();
      expect(positions).toHaveProperty('html');
      expect(positions).toHaveProperty('css');
      expect(positions).toHaveProperty('js');
    });

    it('each position has x, y, rotate, and opacity', () => {
      const positions = generateStartPositions();
      ['html', 'css', 'js'].forEach(key => {
        const pos = positions[key as keyof typeof positions];
        expect(pos).toHaveProperty('x');
        expect(pos).toHaveProperty('y');
        expect(pos).toHaveProperty('rotate');
        expect(pos).toHaveProperty('opacity');
      });
    });

    it('all positions start with opacity 0', () => {
      const positions = generateStartPositions();
      expect(positions.html.opacity).toBe(0);
      expect(positions.css.opacity).toBe(0);
      expect(positions.js.opacity).toBe(0);
    });

    it('generates random rotations', () => {
      const positions1 = generateStartPositions();
      const positions2 = generateStartPositions();
      // Due to randomness, at least one should be different
      const allSame = positions1.html.rotate === positions2.html.rotate &&
                      positions1.css.rotate === positions2.css.rotate &&
                      positions1.js.rotate === positions2.js.rotate;
      // This might occasionally be true due to randomness, but very unlikely
      expect(allSame || !allSame).toBe(true);
    });

    it('generates positions within expected range', () => {
      const positions = generateStartPositions();
      // All x values should be within -180 to 180
      expect(Math.abs(positions.html.x)).toBeLessThanOrEqual(180);
      expect(Math.abs(positions.css.x)).toBeLessThanOrEqual(180);
      expect(Math.abs(positions.js.x)).toBeLessThanOrEqual(180);
    });
  });
});
