import { gql } from '@apollo/client';

// FaunaDB doesn't easily allow partial mutations, so we need to send the whole object over instead of just the views
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String!
    $slug: String!
    $price: Int!
    $views: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, slug: $slug, price: $price, views: $views }
    ) {
      views
    }
  }
`;
