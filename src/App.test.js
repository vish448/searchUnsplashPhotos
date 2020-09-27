import React from 'react';
import { render , screen } from '@testing-library/react';
import App from './App';


/*test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

test('App logo element with logo alt text', () => {
  render(<App />);
  const logoElement = screen.getByAltText('logo');
  expect(logoElement).toBeInTheDocument();
});