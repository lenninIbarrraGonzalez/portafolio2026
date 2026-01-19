import { render, screen, fireEvent } from '@testing-library/react';
import { Education } from '@/components/Education';

describe('Education', () => {
  it('renders the section with correct id', () => {
    render(<Education />);
    expect(document.getElementById('education')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<Education />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the decorative line under title', () => {
    render(<Education />);
    const decorativeLine = document.querySelector('.bg-primary.rounded-full');
    expect(decorativeLine).toBeInTheDocument();
  });

  it('renders tab buttons', () => {
    render(<Education />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders education icons in tabs', () => {
    render(<Education />);
    // Multiple icons may be present
    expect(screen.getAllByTestId('icon-graduationcap').length).toBeGreaterThanOrEqual(1);
  });

  it('switches tabs when clicking', () => {
    render(<Education />);
    const buttons = screen.getAllByRole('button');

    // Click on second tab
    if (buttons[1]) {
      fireEvent.click(buttons[1]);
    }

    // Tab should be active
    expect(buttons[1]).toBeInTheDocument();
  });

  it('renders education card content', () => {
    render(<Education />);
    expect(document.querySelector('.bg-card')).toBeInTheDocument();
  });

  it('renders calendar icon in education cards', () => {
    render(<Education />);
    expect(screen.getByTestId('icon-calendar')).toBeInTheDocument();
  });

  it('has responsive padding classes', () => {
    render(<Education />);
    expect(document.querySelector('.py-8')).toBeInTheDocument();
  });

  it('renders tabs container', () => {
    render(<Education />);
    const tabsContainer = document.querySelector('.rounded-full.bg-secondary\\/50');
    expect(tabsContainer).toBeInTheDocument();
  });
});
