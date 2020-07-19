import { NextApiRequest, NextApiResponse } from 'next';
import _get from 'lodash/get';

import { isValidJobRequest } from 'lib/utils';
import apolloClient from 'lib/apollo';
import { ALL_PRODUCTS } from 'lib/apollo/queries';
import { UPDATE_PRODUCT } from 'lib/apollo/mutations';
import * as T from 'lib/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isValidJobRequest(req)) {
    res.status(401).end();
    return;
  }

  const { data } = await apolloClient.query({
    query: ALL_PRODUCTS,
    fetchPolicy: 'no-cache',
  });

  const products: T.Product[] = _get(data, ['allProducts', 'data'], []);

  // Reset views
  for (const product of products) {
    try {
      if (product.views === 0) {
        continue;
      }

      await apolloClient.mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          views: 0,
        },
      });
    } catch (error) {
      console.error(error);
      console.log(JSON.stringify(error, null, 2));
    }
  }

  res.status(200).json({ success: true });
};
