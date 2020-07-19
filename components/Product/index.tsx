import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { css } from 'lib/constants';
import * as T from 'lib/types';

interface ProductProps extends T.Product {}

const StyledProduct = styled.article`
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${css.white};
  border-radius: 2px;
  flex: 1 1 30%;
  transition: all 80ms ease-in;

  a {
    min-width: 200px;
    padding: 1rem 1.5rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &:hover,
  &:focus,
  &:active {
    background-color: ${css.purple};
  }
`;

const Title = styled.h3.attrs({
  className: 'main__title',
})``;

const Paragraph = styled.p.attrs({
  className: 'main__description',
})``;

const Product = (props: ProductProps) => {
  const { name, slug, price, views } = props;

  return (
    <StyledProduct>
      <Link href={`/products/${slug}`}>
        <a>
          <Title>{name}</Title>
          <Paragraph>
            Price: <strong>${price}</strong>
          </Paragraph>
          <Paragraph>
            Views: <strong>{views}</strong>
          </Paragraph>
        </a>
      </Link>
    </StyledProduct>
  );
};

export default Product;
