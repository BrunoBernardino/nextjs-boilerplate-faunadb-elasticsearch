import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@elastic/elasticsearch';
import _get from 'lodash/get';

import { isValidJobRequest } from 'lib/utils';
import apolloClient from 'lib/apollo';
import { ALL_PRODUCTS } from 'lib/apollo/queries';
import * as T from 'lib/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isValidJobRequest(req)) {
    res.status(401).end();
    return;
  }

  const { data } = await apolloClient.query({
    query: ALL_PRODUCTS,
  });

  const products: T.Product[] = _get(data, ['allProducts', 'data'], []);

  const elasticSearchClient = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  try {
    await elasticSearchClient.indices.create({
      index: 'products',
    });
  } catch (error) {
    // All good, index already existed
  }

  for (const product of products) {
    try {
      await elasticSearchClient.index({
        index: 'products',
        body: {
          id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          views: product.views,
        },
      });
    } catch (error) {
      console.error(error);
      console.log(JSON.stringify(error, null, 2));
    }
  }

  res.status(200).json({ success: true });
};
