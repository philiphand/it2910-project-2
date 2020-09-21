import React from 'react';
import renderer from 'react-test-renderer';
import {Carousel} from '../components/carousel/carousel';

test('renders correctly', () => {
  const component = renderer
    .create(<Carousel></Carousel>);
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot();


});