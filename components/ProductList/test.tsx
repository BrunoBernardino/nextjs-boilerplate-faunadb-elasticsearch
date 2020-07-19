import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import expect from 'expect';
import enzymify from 'expect-enzyme';

import ProductList from './index';

expect.extend(enzymify());

const defaultProps = {
  products: [
    {
      name: 'Product 1',
      slug: 'product-1',
      price: 15,
      views: 0,
    },
  ],
};

describe('ProductList', () => {
  it('renders the list without errors', () => {
    const wrapper = shallow(<ProductList {...defaultProps} />);
    expect(wrapper.first().text()).toBe('<Product />');
  });

  it('renders the list as expected', () => {
    const tree = renderer.create(<ProductList {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
