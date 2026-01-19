import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />);
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('renders copyright text with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('renders Lennin Ibarra name', () => {
    render(<Footer />);
    expect(screen.getByText(/Lennin Ibarra/)).toBeInTheDocument();
  });

  it('renders rights text', () => {
    render(<Footer />);
    expect(screen.getByText(/rights/)).toBeInTheDocument();
  });

  it('renders madeWith text', () => {
    render(<Footer />);
    expect(screen.getByText(/madeWith/)).toBeInTheDocument();
  });

  it('renders heart icon', () => {
    render(<Footer />);
    expect(screen.getByTestId('icon-heart')).toBeInTheDocument();
  });

  it('renders coffee icon', () => {
    render(<Footer />);
    expect(screen.getByTestId('icon-coffee')).toBeInTheDocument();
  });

  it('has border-t class for top border', () => {
    render(<Footer />);
    expect(document.querySelector('.border-t')).toBeInTheDocument();
  });

  it('has responsive flex container', () => {
    render(<Footer />);
    expect(document.querySelector('.flex')).toBeInTheDocument();
  });
});
