import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup);

describe('<AppComponent />', () => {
  it('should render the app component', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
  });
  it('should render the application dark mode', () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();
  });
});
