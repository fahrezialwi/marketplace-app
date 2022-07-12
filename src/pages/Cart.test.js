import { render, screen } from '@testing-library/react';
import Cart from './Cart';

test('render list carts', () => {
  render(<Cart />);
  const linkElement = screen.getByText('List Carts');
  expect(linkElement).toBeInTheDocument();
});
