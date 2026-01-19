import { render, screen } from '@testing-library/react';
import { CallToAction } from '@/components/CallToAction';

// Mock the MiniHeroScene dynamic import
jest.mock('@/components/three/MiniHeroScene', () => ({
  MiniHeroScene: ({ isInView }: { isInView: boolean }) => (
    <div data-testid="mini-hero-scene" data-in-view={isInView}>Mini Scene</div>
  ),
}));

describe('CallToAction', () => {
  it('renders the section', () => {
    render(<CallToAction />);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('renders the section with correct id', () => {
    render(<CallToAction />);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<CallToAction />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the message', () => {
    render(<CallToAction />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<CallToAction />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders button text', () => {
    render(<CallToAction />);
    expect(screen.getByText('button')).toBeInTheDocument();
  });

  it('renders arrow right icon', () => {
    render(<CallToAction />);
    expect(screen.getByTestId('icon-arrowright')).toBeInTheDocument();
  });

  it('button links to LinkedIn', () => {
    render(<CallToAction />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
  });

  it('button opens in new tab', () => {
    render(<CallToAction />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has grid pattern background', () => {
    render(<CallToAction />);
    expect(document.querySelector('.grid-pattern')).toBeInTheDocument();
  });

  it('has animated background blobs', () => {
    render(<CallToAction />);
    const blobs = document.querySelectorAll('.blur-3xl');
    expect(blobs.length).toBeGreaterThan(0);
  });

  it('has responsive padding', () => {
    render(<CallToAction />);
    expect(document.querySelector('.py-8')).toBeInTheDocument();
  });

  it('has rounded card container', () => {
    render(<CallToAction />);
    expect(document.querySelector('.rounded-2xl')).toBeInTheDocument();
  });

  it('renders MiniHeroScene placeholder', () => {
    render(<CallToAction />);
    // The dynamic component renders as a div with data-testid
    expect(document.querySelector('[data-testid="dynamic-component"]')).toBeInTheDocument();
  });

  it('has correct section structure', () => {
    render(<CallToAction />);
    const section = document.querySelector('section#contact');
    expect(section).toBeInTheDocument();
  });

  it('renders content container', () => {
    render(<CallToAction />);
    expect(document.querySelector('.container')).toBeInTheDocument();
  });

  it('renders flex layout for content', () => {
    render(<CallToAction />);
    expect(document.querySelector('.flex-col')).toBeInTheDocument();
  });
});
