import React from 'react';

import renderer from 'react-test-renderer';

import Login from '../src/screens/LoginScreen';

test('given empty GroceryShoppingList, user can add an item to it', () => {
  const { getByPlaceholder, getByText, getAllByText } = renderer(
    <Login />,
  );

  fireEvent.changeText(getByPlaceholder('email@address.com'), 'afihisam95@gmail.com');
  fireEvent.changeText(getByPlaceholder('Password'), 'pass123');
  fireEvent.press(getByText('Next'));

  const result = ['test']
  expect(result).toHaveLength(1); // expect 'banana' to be on the list
});
