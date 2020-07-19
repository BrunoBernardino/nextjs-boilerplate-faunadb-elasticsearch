import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import _get from 'lodash/get';

import Layout, { LoadingContext } from 'components/Layout';
import ProductList from 'components/ProductList';
import { ALL_PRODUCTS } from 'lib/apollo/queries';
import * as T from 'lib/types';

import 'styles/index.scss';

const Title = styled.h1.attrs({
  className: 'main__title',
})``;

const Paragraph = styled.p.attrs({
  className: 'main__description',
})``;

const AllProducts = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const { loading: isLoading, error, data } = useQuery(ALL_PRODUCTS);

  // NOTE: Ideally you'd have a boundary or some way to better log and report these, but that's out of scope for this boilerplate
  if (error) {
    console.error(error);
  }

  const products: T.Product[] = _get(data, ['allProducts', 'data'], []);

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading]);

  return (
    <section className="main__section">
      <Title>All Products</Title>
      <Paragraph>This is a list of all the products.</Paragraph>
      <ProductList products={products} />
    </section>
  );
};

const ProductsPage = () => {
  const layoutProps = {
    title: 'Products',
    description: 'Products',
    keywords: 'products',
  };

  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <AllProducts />
      </div>
    </Layout>
  );
};

export default ProductsPage;
