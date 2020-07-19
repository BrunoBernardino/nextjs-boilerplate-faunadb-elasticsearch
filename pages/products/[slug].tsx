import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import _get from 'lodash/get';

import Layout from 'components/Layout';
import client from 'lib/apollo';
import { ALL_PRODUCTS, PRODUCT_BY_SLUG } from 'lib/apollo/queries';
import { UPDATE_PRODUCT } from 'lib/apollo/mutations';
import { css } from 'lib/constants';
import * as T from 'lib/types';

import 'styles/index.scss';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: ALL_PRODUCTS,
  });

  const products: T.Product[] = _get(data, ['allProducts', 'data'], []);

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const { data } = await client.query({
    query: PRODUCT_BY_SLUG,
    variables: {
      slug,
    },
    fetchPolicy: 'no-cache',
  });

  const product: T.Product = _get(data, ['findProductBySlug']);

  // Increase view count
  await client.mutate({
    mutation: UPDATE_PRODUCT,
    variables: {
      id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      views: product.views + 1,
    },
  });

  // NOTE: "unstable_revalidate: 1" makes sure that every 1s this page is rebuilt (calling the mutation to update views). If you don't need the mutation, removing this property will make page loads more performant
  return { props: { ...product }, unstable_revalidate: 1 };
};

const Section = styled.section.attrs({
  className: 'main__section',
})`
  background-color: ${css.white};
  padding: 1rem 1.5rem;
  border-radius: 2px;
`;

const Title = styled.h1.attrs({
  className: 'main__title',
})`
  font-size: 2rem;
`;

const Paragraph = styled.p.attrs({
  className: 'main__description',
})``;

interface ProductPageProps extends T.Product {}

const ProductPage = ({ name, price, views }: ProductPageProps) => {
  const layoutProps = {
    title: name,
    description: name,
    keywords: name,
  };

  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <Link href="/products">
          <a>&laquo; All products</a>
        </Link>
        <Section>
          <Title>{name}</Title>
          <Paragraph>
            Price: <strong>${price}</strong>
          </Paragraph>
          <Paragraph>
            Views: <strong>{views}</strong>
          </Paragraph>
        </Section>
      </div>
    </Layout>
  );
};

export default ProductPage;
