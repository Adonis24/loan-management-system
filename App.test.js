import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './src/screens/WelcomeScreen';

describe('<WelcomeScreen />', () => {
 
  it('renders correctly', () => {
    const tree = renderer.create(<WelcomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});