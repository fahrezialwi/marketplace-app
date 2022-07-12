import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from './Cart';

test('render list carts', () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('List Carts');
  expect(linkElement).toBeInTheDocument();
});

test('render product name', () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Product Name');
  expect(linkElement).toBeInTheDocument();
});

test('render price', () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Price');
  expect(linkElement).toBeInTheDocument();
});

test('render quantity', () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Quantity');
  expect(linkElement).toBeInTheDocument();
});

test('render total price', () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Total Price');
  expect(linkElement).toBeInTheDocument();
});

test('render action', () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('Action');
  expect(linkElement).toBeInTheDocument();
});