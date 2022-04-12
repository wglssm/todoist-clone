import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

beforeEach(cleanup);

//mock the firebase
jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

describe('<Checkbox />', () => {
  describe('Success', () => {
    it('renders the task checkbox', () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId('checkbox-action')).toBeTruthy();
    });
    it('renders the task checkbox amd accepts a click', () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.click(queryByTestId('checkbox-action'));
    });
    it('renders the task checkbox amd accepts key down', () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('checkbox-action'));
    });
  });
});
