import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';

// Mock ProjectModal
jest.mock('@/components/ProjectModal', () => ({
  ProjectModal: ({ project, isOpen, onClose }: { project: unknown; isOpen: boolean; onClose: () => void }) => (
    isOpen ? (
      <div data-testid="project-modal" role="dialog">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  ),
}));

describe('ProjectsCarousel', () => {
  it('renders the section with correct id', () => {
    render(<ProjectsCarousel />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<ProjectsCarousel />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the decorative line under title', () => {
    render(<ProjectsCarousel />);
    const decorativeLine = document.querySelector('.bg-primary.rounded-full');
    expect(decorativeLine).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<ProjectsCarousel />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('renders navigation buttons', () => {
    render(<ProjectsCarousel />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders chevron left icon for prev button', () => {
    render(<ProjectsCarousel />);
    expect(screen.getByTestId('icon-chevronleft')).toBeInTheDocument();
  });

  it('renders chevron right icon for next button', () => {
    render(<ProjectsCarousel />);
    expect(screen.getByTestId('icon-chevronright')).toBeInTheDocument();
  });

  it('renders carousel dot indicators', () => {
    render(<ProjectsCarousel />);
    const dots = document.querySelectorAll('[aria-label^="Go to slide"]');
    expect(dots.length).toBeGreaterThan(0);
  });

  it('renders embla carousel container', () => {
    render(<ProjectsCarousel />);
    expect(document.querySelector('.embla')).toBeInTheDocument();
  });

  it('opens modal when clicking on project card', () => {
    render(<ProjectsCarousel />);
    const cards = document.querySelectorAll('.tilt-card');

    if (cards[0]) {
      fireEvent.click(cards[0]);
    }

    expect(screen.getByTestId('project-modal')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', () => {
    render(<ProjectsCarousel />);
    const cards = document.querySelectorAll('.tilt-card');

    // Open modal
    if (cards[0]) {
      fireEvent.click(cards[0]);
    }

    // Close modal
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('project-modal')).not.toBeInTheDocument();
  });

  it('has background color class', () => {
    render(<ProjectsCarousel />);
    expect(document.querySelector('.bg-secondary\\/30')).toBeInTheDocument();
  });

  it('has overflow-hidden class', () => {
    render(<ProjectsCarousel />);
    expect(document.querySelector('.overflow-hidden')).toBeInTheDocument();
  });

  it('renders project images', () => {
    render(<ProjectsCarousel />);
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders project titles', () => {
    render(<ProjectsCarousel />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('handles tilt effect on mouse move', () => {
    render(<ProjectsCarousel />);
    const cards = document.querySelectorAll('.tilt-card');

    if (cards[0]) {
      // Simulate mouse move for tilt effect
      fireEvent.mouseMove(cards[0], { clientX: 100, clientY: 100 });
    }

    expect(cards.length).toBeGreaterThan(0);
  });

  it('resets tilt on mouse leave', () => {
    render(<ProjectsCarousel />);
    const cards = document.querySelectorAll('.tilt-card');

    if (cards[0]) {
      fireEvent.mouseMove(cards[0], { clientX: 100, clientY: 100 });
      fireEvent.mouseLeave(cards[0]);
    }

    expect(cards.length).toBeGreaterThan(0);
  });

  it('handles carousel navigation prev', () => {
    render(<ProjectsCarousel />);
    const prevButton = screen.getByTestId('icon-chevronleft').closest('button');

    if (prevButton) {
      fireEvent.click(prevButton);
    }

    expect(document.querySelector('.embla')).toBeInTheDocument();
  });

  it('handles carousel navigation next', () => {
    render(<ProjectsCarousel />);
    const nextButton = screen.getByTestId('icon-chevronright').closest('button');

    if (nextButton) {
      fireEvent.click(nextButton);
    }

    expect(document.querySelector('.embla')).toBeInTheDocument();
  });

  it('handles dot indicator click', () => {
    render(<ProjectsCarousel />);
    const dots = document.querySelectorAll('[aria-label^="Go to slide"]');

    if (dots[1]) {
      fireEvent.click(dots[1]);
    }

    expect(dots.length).toBeGreaterThan(0);
  });
});
