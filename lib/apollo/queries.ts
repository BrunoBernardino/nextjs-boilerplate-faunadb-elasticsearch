import { gql } from '@apollo/client';

export const ALL_PRODUCTS = gql`
  query GetAllProducts {
    allProducts {
      data {
        _id
        name
        price
        slug
        views
      }
    }
  }
`;

export const PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    findProductBySlug(slug: $slug) {
      _id
      name
      price
      slug
      views
    }
  }
`;
