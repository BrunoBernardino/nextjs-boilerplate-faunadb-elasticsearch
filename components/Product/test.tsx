import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import expect from 'expect';
import enzymify from 'expect-enzyme';

import Product from './index';

expect.extend(enzymify());

const defaultProps = {
  name: 'Product 1',
  slug: 'product-1',
  price: 15,
  views: 0,
};

describe('Product', () => {
  it('renders the product without errors', () => {
    const wrapper = shallow(<Product {...defaultProps} />);
    expect(wrapper.first().text()).toBe('<Link />');
  });

  it('renders the product as expected', () => {
    const tree = renderer.create(<Product {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
