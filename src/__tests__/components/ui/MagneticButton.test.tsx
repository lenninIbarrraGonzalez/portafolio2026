import { render, screen, fireEvent } from '@testing-library/react';
import { MagneticButton } from '@/components/ui/MagneticButton';

describe('MagneticButton', () => {
  it('renders children correctly', () => {
    render(<MagneticButton>Click me</MagneticButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as button by default', () => {
    render(<MagneticButton>Button</MagneticButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders as anchor when as="a"', () => {
    render(
      <MagneticButton as="a" href="https://example.com">
        Link
      </MagneticButton>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MagneticButton className="custom-class">Button</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<MagneticButton onClick={handleClick}>Click me</MagneticButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets href attribute for anchor', () => {
    render(
      <MagneticButton as="a" href="https://example.com">
        Link
      </MagneticButton>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('sets target attribute for anchor', () => {
    render(
      <MagneticButton as="a" href="https://example.com" target="_blank">
        Link
      </MagneticButton>
    );
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('sets rel attribute for anchor', () => {
    render(
      <MagneticButton as="a" href="https://example.com" rel="noopener noreferrer">
        Link
      </MagneticButton>
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('sets aria-label attribute', () => {
    render(<MagneticButton aria-label="Test label">Button</MagneticButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test label');
  });

  it('handles mouse enter event', () => {
    render(<MagneticButton>Button</MagneticButton>);
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    // Component should handle event without error
    expect(button).toBeInTheDocument();
  });

  it('handles mouse move event', () => {
    render(<MagneticButton>Button</MagneticButton>);
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    fireEvent.mouseMove(button, { clientX: 100, clientY: 100 });
    // Component should handle event without error
    expect(button).toBeInTheDocument();
  });

  it('handles mouse leave event', () => {
    render(<MagneticButton>Button</MagneticButton>);
    const button = screen.getByRole('button');

    fireEvent.mouseLeave(button);
    // Component should handle event without error
    expect(button).toBeInTheDocument();
  });

  it('renders with download attribute for anchor', () => {
    render(
      <MagneticButton as="a" href="/file.pdf" download>
        Download
      </MagneticButton>
    );
    expect(screen.getByRole('link')).toHaveAttribute('download');
  });

  it('renders complex children', () => {
    render(
      <MagneticButton>
        <span data-testid="icon">Icon</span>
        <span>Text</span>
      </MagneticButton>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
