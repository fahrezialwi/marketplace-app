import { render, screen } from '@testing-library/react';
import Home from './Home';

test('render marketplace app', () => {
  render(<Home />);
  const linkElement = screen.getByText('Marketplace App');
  expect(linkElement).toBeInTheDocument();
});

// test('render button carts', () => {
//   render(<App />);
//   const linkElement = screen.getByText('Carts');
//   expect(linkElement).toBeInTheDocument();
// });

// test('render button search', () => {
//   render(<App />);
//   const linkElement = screen.getByText('Search');
//   expect(linkElement).toBeInTheDocument();
// });

