import React, { useContext, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAsync } from 'react-use';
import _get from 'lodash/get';

import Layout, { LoadingContext } from 'components/Layout';
import ProductList from 'components/ProductList';
import TextInput from 'components/TextInput';
import api from 'lib/api';
import * as T from 'lib/types';

import 'styles/index.scss';

const Title = styled.h1.attrs({
  className: 'main__title',
})``;

const Paragraph = styled.p.attrs({
  className: 'main__description',
})``;

type SearchResultsProps = {
  searchTerm: string;
};

const SearchResults = ({ searchTerm }: SearchResultsProps) => {
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const {
    loading: isLoading,
    error,
    value: matchingProducts,
  } = useAsync(async () => {
    const response = await api.post('search', { json: { searchTerm } });
    const result = await response.json();
    const products: T.Product[] = _get(result, ['products'], []);
    return products;
  }, [searchTerm]);

  // NOTE: Ideally you'd have a boundary or some way to better log and report these, but that's out of scope for this boilerplate
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading]);

  return (
    <section className="main__section">
      <Paragraph>
        This is a list of all the products matching "{searchTerm}".
      </Paragraph>
      {(matchingProducts || []).length === 0 && !isLoading ? (
        <Paragraph>No matching products found...</Paragraph>
      ) : (
        <ProductList products={matchingProducts || []} />
      )}
    </section>
  );
};

const SearchPage = () => {
  const router = useRouter();

  const searchTerm = _get(router, ['query', 'q'], '');

  const [search, setSearch] = useState(searchTerm);

  const handleSubmitOnEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        router.push(`/products/search?q=${search}`);
      }
    },
    [search],
  );

  const layoutProps = {
    title: `Products Search - ${searchTerm}`,
    description: `Products Search - ${searchTerm}`,
    keywords: `products, search, ${searchTerm}`,
  };

  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <Title>Search Products - {searchTerm}</Title>
        <TextInput
          name="search"
          value={search}
          placeholder="Type a product name, then press enter"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setSearch(event.currentTarget.value)
          }
          onKeyDown={handleSubmitOnEnter}
        />
        <SearchResults
          searchTerm={
            typeof searchTerm === 'string' ? searchTerm : searchTerm.join(' ')
          }
        />
      </div>
    </Layout>
  );
};

export default SearchPage;
