import { render, screen } from '@testing-library/react';
import App from './App';

test('Test App', () => {
  render(<App />);
  const textElement = screen.getByText(/Videogames/i);
  const button = screen.getByDisplayValue(/Enter/i)
  expect(textElement).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
