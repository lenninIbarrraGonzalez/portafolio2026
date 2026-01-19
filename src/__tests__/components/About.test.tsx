import { render, screen } from '@testing-library/react';
import { About } from '@/components/About';

describe('About', () => {
  it('renders the section with correct id', () => {
    render(<About />);
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    render(<About />);
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('renders experience badge with years', () => {
    render(<About />);
    expect(screen.getByText(/experience/)).toBeInTheDocument();
  });

  it('renders location badge', () => {
    render(<About />);
    expect(screen.getByText('location')).toBeInTheDocument();
  });

  it('renders all three highlight cards', () => {
    render(<About />);
    expect(screen.getByText('highlights.projects')).toBeInTheDocument();
    expect(screen.getByText('highlights.companies')).toBeInTheDocument();
    expect(screen.getByText('highlights.technologies')).toBeInTheDocument();
  });

  it('renders icons for highlights', () => {
    render(<About />);
    expect(screen.getByTestId('icon-code')).toBeInTheDocument();
    expect(screen.getByTestId('icon-building')).toBeInTheDocument();
    // Briefcase appears twice (experience badge and highlights)
    expect(screen.getAllByTestId('icon-briefcase').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the decorative line under title', () => {
    render(<About />);
    const decorativeLine = document.querySelector('.bg-primary.rounded-full');
    expect(decorativeLine).toBeInTheDocument();
  });

  it('has responsive container classes', () => {
    render(<About />);
    expect(document.querySelector('.container')).toBeInTheDocument();
  });
});
