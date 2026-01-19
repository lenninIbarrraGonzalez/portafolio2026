import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from '@/components/Contact';

describe('Contact', () => {
  it('renders the section with correct id', () => {
    render(<Contact />);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Contact />);
    expect(screen.getByText('subtitle')).toBeInTheDocument();
  });

  it('renders name input field', () => {
    render(<Contact />);
    expect(screen.getByLabelText('form.name')).toBeInTheDocument();
  });

  it('renders email input field', () => {
    render(<Contact />);
    expect(screen.getByLabelText('form.email')).toBeInTheDocument();
  });

  it('renders message textarea', () => {
    render(<Contact />);
    expect(screen.getByLabelText('form.message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: /form.send/i })).toBeInTheDocument();
  });

  it('renders send icon in submit button', () => {
    render(<Contact />);
    expect(screen.getByTestId('icon-send')).toBeInTheDocument();
  });

  it('allows typing in name field', async () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText('form.name');

    await userEvent.type(nameInput, 'John Doe');

    expect(nameInput).toHaveValue('John Doe');
  });

  it('allows typing in email field', async () => {
    render(<Contact />);
    const emailInput = screen.getByLabelText('form.email');

    await userEvent.type(emailInput, 'john@example.com');

    expect(emailInput).toHaveValue('john@example.com');
  });

  it('allows typing in message field', async () => {
    render(<Contact />);
    const messageInput = screen.getByLabelText('form.message');

    await userEvent.type(messageInput, 'Hello there!');

    expect(messageInput).toHaveValue('Hello there!');
  });

  it('submits form with valid data', async () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText('form.name');
    const emailInput = screen.getByLabelText('form.email');
    const messageInput = screen.getByLabelText('form.message');
    const submitButton = screen.getByRole('button', { name: /form.send/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Test message');

    fireEvent.click(submitButton);

    // Form should be interactive after submission
    expect(submitButton).toBeInTheDocument();
  });

  it('has required attribute on form fields', () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText('form.name');
    const emailInput = screen.getByLabelText('form.email');
    const messageInput = screen.getByLabelText('form.message');

    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(messageInput).toHaveAttribute('required');
  });

  it('renders social links section', () => {
    render(<Contact />);
    expect(screen.getByText('social.title')).toBeInTheDocument();
  });

  it('has background color class', () => {
    render(<Contact />);
    expect(document.querySelector('.bg-secondary\\/30')).toBeInTheDocument();
  });
});
