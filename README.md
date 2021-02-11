# FaunaDB + ElasticSearch Next.js Boilerplate

[![](https://github.com/BrunoBernardino/nextjs-boilerplate-faunadb-elasticsearch/workflows/Run%20Tests/badge.svg)](https://github.com/BrunoBernardino/nextjs-boilerplate-faunadb-elasticsearch/actions?workflow=Run+Tests)

[FaunaDB](https://fauna.com/) + [ElasticSearch](https://www.elastic.co/) boilerplate for [Next.js](https://nextjs.org) using GitHub Actions for the cleanup/reindex cron. With [TypeScript](https://www.typescriptlang.org), [SASS/SCSS](https://sass-lang.com), [Styled Components](https://styled-components.com), [Jest](https://jestjs.io), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and deployed to AWS with [Serverless](https://serverless.com).

Also supports imports with absolute paths.

All pages are statically generated, meaning they'll be built via server for the first time they're requested (akin to SSR), but the subsequent requests will be as if a pre-rendered static page, incredibly fast (while still being updated after the initial load). This is good for SEO and also for showing up-to-date pages to clients quickly.

The only page that somewhat breaks this pattern is the individual product page, which uses `revalidate: 1` in `getStaticProps` in order to effectively force a server build every time a page is loaded (technically they're cached for 1 second), so that the view count mutation can happen.

The file with the GraphQL Schema to be imported into FaunaDB is at `lib/schema.qgl`.

The ElasticSearch in the demo is powered by [Bonsai](https://bonsai.io).

Demo at [faunadb-elasticsearch-nextjs-boilerplate.onbrn.com](https://faunadb-elasticsearch-nextjs-boilerplate.onbrn.com).

See more boilerplates at [nextjs-boilerplates.onbrn.com](https://nextjs-boilerplates.onbrn.com).

## Development

```bash
make install # installs dependencies
make start # starts the app
make pretty # prettifies the code
make test # runs linting and tests
make test/update # runs tests, updating snapshots
make deploy # deploys to faunadb-elasticsearch-nextjs-boilerplate.onbrn.com (requires `serverless` to be installed globally)
```

**NOTE:** If you're looking for the previous version which deployed to Vercel, [this was the latest commit with it](https://github.com/BrunoBernardino/nextjs-boilerplate-faunadb-elasticsearch/tree/e173b590cdf716c28931c04770bcb962ff136e45).

## TODOs

Here are some things you will likely want to change before "publishing" this, or after cloning it:

- [ ] Analytics code (`usefathom.com`) and `theme-color` in `pages/_document.tsx`
- [ ] Name, repository, author, and version in `package.json`
- [ ] Values in `lib/constants.ts` and `styles/__variables.scss`
- [ ] Service name, domain, and env values in `serverless.yml`
- [ ] Values in `.env.sample`
- [ ] Title, description, and links in this `README.md` file
- [ ] URL in `public/robots.txt`
- [ ] URL, env var in `.github/workflows/job-*.yml` files
- [ ] [Create a secret for `JOB_API_KEY` in your repo](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository)
- [ ] URL/headers in `lib/apollo/index.ts`
- [ ] data/logic in `lib/apollo/*.ts`
- [ ] schema in `lib/schema.gql`
- [ ] types in `lib/types.ts`
- [ ] data/logic in `api/jobs/*.ts`
- [ ] data/logic in `api/v0/search.ts`
- [ ] data/logic in `api/products/*.tsx`
- [ ] data/logic in `scripts/build-pages.js`
- [ ] data/logic in `pages/sitemap.xml.ts`
