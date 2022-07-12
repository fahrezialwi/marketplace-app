import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

test('render marketplace app', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Marketplace App');
  expect(linkElement).toBeInTheDocument();
});

test('render button carts', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Carts');
  expect(linkElement).toBeInTheDocument();
});

test('render button search', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Search');
  expect(linkElement).toBeInTheDocument();
});