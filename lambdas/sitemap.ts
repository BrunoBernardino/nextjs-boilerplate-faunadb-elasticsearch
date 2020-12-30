import { SitemapStream, streamToPromise } from 'sitemap';
import _get from 'lodash/get';
import { NowRequest, NowResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

import apolloClient from '../lib/apollo';
import { ALL_PRODUCTS } from '../lib/apollo/queries';
import * as T from '../lib/types';
import pages from './pages.json';

type BuildSitemap = (items: T.Product[]) => Promise<any>;

const hostUrl = process.env.API_URL;

const buildSitemap: BuildSitemap = (items) => {
  const sitemap = new SitemapStream({
    hostname: hostUrl,
  });

  pages.forEach((page) => {
    sitemap.write({
      url: `${hostUrl}${page}`,
      lastmodISO: new Date().toISOString(),
      priority: page === '' ? 1 : 0.7,
    });
  });

  items.forEach((item) => {
    sitemap.write({
      url: `${hostUrl}/products/${item.slug}`,
      lastmodISO: new Date().toISOString(),
      priority: 0.8,
    });
  });

  sitemap.end();

  return streamToPromise(sitemap);
};

// @ts-ignore
export default async (req: NowRequest, res: NowResponse) => {
  const { data } = await apolloClient.query({
    query: ALL_PRODUCTS,
    fetchPolicy: 'no-cache',
  });

  const products: T.Product[] = _get(data, ['allProducts', 'data'], []);

  const sitemap = await buildSitemap(products);

  res.setHeader('content-type', 'application/xml');
  res.status(200).send(sitemap.toString());
};
