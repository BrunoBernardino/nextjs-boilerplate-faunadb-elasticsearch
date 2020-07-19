import React from 'react';
import styled from 'styled-components';

import Product from 'components/Product';
import * as T from 'lib/types';

type ProductListProps = {
  products: T.Product[];
  className?: string;
};

const StyledProductList = styled.section`
  margin: 1em auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const ProductList = (props: ProductListProps) => {
  const { products, className } = props;

  return (
    <StyledProductList className={className}>
      {products.map((product) => (
        <Product key={product.slug} {...product} />
      ))}
    </StyledProductList>
  );
};

ProductList.defaultProps = {
  className: '',
};

export default ProductList;
