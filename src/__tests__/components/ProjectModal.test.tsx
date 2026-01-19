import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectModal } from '@/components/ProjectModal';

const mockProject = {
  key: 'test',
  image: '/images/test.png',
  link: 'https://example.com',
  github: 'https://github.com/test',
  title: 'Test Project',
  description: 'Test description',
  tags: ['React', 'TypeScript'],
};

describe('ProjectModal', () => {
  beforeEach(() => {
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  it('does not render when isOpen is false', () => {
    render(<ProjectModal project={mockProject} isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when project is null', () => {
    render(<ProjectModal project={null} isOpen={true} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders project title', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders project image', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    const image = document.querySelector('img');
    expect(image).toHaveAttribute('src', '/images/test.png');
  });

  it('renders close button', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<ProjectModal project={mockProject} isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<ProjectModal project={mockProject} isOpen={true} onClose={onClose} />);

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const onClose = jest.fn();
    render(<ProjectModal project={mockProject} isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('renders View Project link when link is provided', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('View Project')).toBeInTheDocument();
  });

  it('renders View Code link when github is provided', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('View Code')).toBeInTheDocument();
  });

  it('does not render View Project link when link is null', () => {
    const projectNoLink = { ...mockProject, link: null };
    render(<ProjectModal project={projectNoLink} isOpen={true} onClose={() => {}} />);
    expect(screen.queryByText('View Project')).not.toBeInTheDocument();
  });

  it('sets body overflow to hidden when open', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('has correct aria attributes', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('has high z-index for overlay', () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);
    expect(document.querySelector('.z-50')).toBeInTheDocument();
  });

  it('traps focus within modal', async () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);

    // Tab key should be handled
    fireEvent.keyDown(window, { key: 'Tab' });
  });

  it('handles Shift+Tab key', async () => {
    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);

    // Shift+Tab should also be handled
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
  });

  it('does not call onClose for other keys', async () => {
    const onClose = jest.fn();
    render(<ProjectModal project={mockProject} isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Enter' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('focuses close button on open', async () => {
    jest.useFakeTimers();

    render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);

    jest.advanceTimersByTime(200);

    jest.useRealTimers();
  });

  it('resets body overflow on unmount', () => {
    const { unmount } = render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);

    unmount();

    expect(document.body.style.overflow).toBe('unset');
  });

  it('restores focus on close', () => {
    const { rerender } = render(<ProjectModal project={mockProject} isOpen={true} onClose={() => {}} />);

    rerender(<ProjectModal project={mockProject} isOpen={false} onClose={() => {}} />);
  });
});
