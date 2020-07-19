import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sitemapLambda = await import('lambdas/sitemap');
  // @ts-ignore
  await sitemapLambda.default(req, res);
};
