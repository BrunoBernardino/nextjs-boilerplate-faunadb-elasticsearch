import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@elastic/elasticsearch';

import * as T from 'lib/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client({ node: process.env.ELASTICSEARCH_URL });

  const { searchTerm } = req.body;
  const { body } = await client.search({
    index: 'products',
    body: {
      query: {
        match: {
          name: searchTerm,
        },
      },
    },
  });

  const products: T.Product[] = body.hits.hits.map(({ _source }) => ({
    _id: _source.id,
    name: _source.name,
    slug: _source.slug,
    price: _source.price,
    views: _source.views,
  }));

  res.status(200).json({ products });
};
