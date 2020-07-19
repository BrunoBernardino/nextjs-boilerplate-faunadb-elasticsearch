import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import _sampleSize from 'lodash/sampleSize';
import _get from 'lodash/get';
import { useRouter } from 'next/router';

import Layout, { LoadingContext } from 'components/Layout';
import ProductList from 'components/ProductList';
import TextInput from 'components/TextInput';
import { ALL_PRODUCTS } from 'lib/apollo/queries';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';
import * as T from 'lib/types';

import 'styles/index.scss';

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

const MainTitle = styled.h1.attrs({
  className: 'main__title',
})``;

const Title = styled.h3.attrs({
  className: 'main__title',
})``;

const Paragraph = styled.p.attrs({
  className: 'main__description',
})``;

const FeaturedProducts = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const { loading: isLoading, error, data } = useQuery(ALL_PRODUCTS);

  // NOTE: Ideally you'd have a boundary or some way to better log and report these, but that's out of scope for this boilerplate
  if (error) {
    console.error(error);
  }

  const featuredProducts: T.Product[] = useMemo(
    () => _sampleSize(_get(data, ['allProducts', 'data'], []), 3),
    [isLoading],
  );

  const handleSubmitOnEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        router.push(`/products/search?q=${search}`);
      }
    },
    [search],
  );

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading]);

  return (
    <section className="main__section">
      <MainTitle>
        Welcome to a FaunaDB + ElasticSearch Next.js Boilerplate!
      </MainTitle>
      <Paragraph>
        This is a FaunaDB + ElasticSearch boilerplate for Next.js using GitHub
        Actions with curl for the cleanup/reindex crons. With TypeScript,
        SASS/SCSS, Styled Components, Jest, ESLint, Prettier, and deployed with
        Vercel.
      </Paragraph>
      <Title>Search</Title>
      <TextInput
        name="search"
        value={search}
        placeholder="Type a product name, then press enter"
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          setSearch(event.currentTarget.value)
        }
        onKeyDown={handleSubmitOnEnter}
      />
      <Title>Featured Products</Title>
      <ProductList products={featuredProducts} />
    </section>
  );
};

const IndexPage = () => {
  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <FeaturedProducts />
      </div>
    </Layout>
  );
};

export default IndexPage;
