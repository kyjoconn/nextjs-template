# Getting Started

First, install volta which will allow you to use pinned versions of node/npm https://docs.volta.sh/guide/getting-started.

```
curl https://get.volta.sh | bash
```

Second, install dependencies to your local environment:

```bash
npm install
```

# Demo

To see the effects of getServerSideProps/getStaticProps:

```
npm run build && npm run start
```

visit "localhost:3000/get-server-side-props" and you will notice a new user
is returned each time.

visit "localhost:3000/get-static-props" and you will notice if you refresh a few times
that the user list is only regenerated every 10 seconds.

# Local Dev

All that is required to start the app for development is:

```bash
npm run dev
```

or with docker:

```
make build-dev
docker-compose up
```

# Project Structure

```
├── public --> contains static assets
│   └── images
│       ├── ...
├── src --> each top level folder represents a feature, except shared/pages/styles
│   ├── account --> each feature contains components/hooks/etc unique to its feature
│   |   ├── components
│   |   ├── hooks
│   |   ├── layouts
│   |   ├── context
│   |   └── types
|   ├── profile
│   |   ├── components
│   |   ├── ...
│   ├── shared --> contains components/hooks/etc common to multiple features
│   |   ├── components
│   |   ├── hooks
│   |   ├── layouts
│   |   ├── context
│   |   └── types
│   |   └── styles
│   ├── pages --> contains outer-most page implementations, and controls routing
│   │   ├── account
│   │   ├── admin
|   |   |── ...
├── Dockerfile --> used to build image for local dev/staging/prod
├── Makefile --> contains useful commands
├── README.md --> THIS
├── docker-compose.yml --> can be used to run the app as a docker container
├── ecosystem.next.config.js --> configuration for pm2
├── jest.config.js --> jest (unit test configuration)
├── jest.setup.js --> jest (unit test configuration)
├── next-env.d.ts --> artifact of npx create-next-app
├── next.config.js --> general configuration for Next.js and webpack
├── node_modules --> where installed dependencies live
├── package.json --> dependency map
├── tsconfig.json --> typescript config
└── yarn.lock --> record of exact dependency installs
```


# Contributing

#### Git Workflow

* Always start your feature by branching from main

* Rebase onto main often to deal with conflicts early

* When your feature is ready, open a PR on github and add reviewers

* Github actions will run and show a red X next to your commit if it fails a check (linting/testing/building)

* Always “squash and merge” once you are happy with your PR

####

#### Typescript

* Pretty much gated by ESLint but...type all the things! `//ts-ignore` should be used sparingly

* Use generics when possible to reduce redundancy

```
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

const getItem = (): APIResponse<Item> => {...}

// is better than

export interface ItemResponse {
  data: Item;
  success: boolean;
  message: string;
}

export interface OtherResponse {
  data: Other;
  success: boolean;
  message: string;
}

...

```

* Avoid nested ternary statements

* Be consistent with use of either `async/await` or `promise.then()`, try not to mix them

* use `yarn lint:ts:fix` to automatically fix any linting issues

#### Next.js

* Keep top-level page implementations thin. Should mostly exist to serve for routing, and holding top level state.

* Keep `_app.page.tsx` thin. This is the entrypoint into the app and should only contain things common to every single page.

* Use page [layouts](https://nextjs.org/docs/basic-features/layouts) when multiple pages share the same fixed components (e.g. header/footer)

* Let pages be built statically when possible. Pages that don't need a server-side check before being rendered should not use `getServerSideProps` so that they can be served statically, and cached.

#### React

* Implement prop types in the component they belong to.

* Keep components small. If a component growing very large, look to break it up into smaller components. [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

* Use SWR for client-side data fetching. This handles things like retries/error states/loading states/caching for you. 

* Use context to share state across many components. This should only be used when prop drilling is not sufficient, so as to avoid the triangle of doom e.g.

```
<I18nProvider>
  <DataProvider>
    <ActiveDialogProvider>
      <PublicFetchProvider>
        <AuthProvider>
          ...
        </AuthProvider>
      </PublicFetchProvider>
    </ActiveDialogProvider>
  </DataProvider>
</I18nProvider>
```

#### CSS

* If an element does not require custom styling, use the available helper classes from your design system of choice (tailwind etc)

```
<div className=”m-auto pb text-small”>
   ...
</div>
```

* Avoid selecting an element by type

```
/* bad */

main p {
  color: red;
}
```

* Try not to set the margin or width on a component itself. Components should be self sufficient without any understanding of their surroundings. Instead set margin and width in the parent component.

# Testing

To run tests:

```
npm run test
```

NextJS uses Jest by default for unit testing. Jest is great for creating fast, non-flaky tests. The downside is your tests do not run in an actual browser, so in some circumstances behaviour could be different.

Try to select components by their Accessibility role e.g. `textbox`. This is a good early indicator if your pages are accessible to screenreaders etc.

# Generate component scaffold

To generate the boilerplate for a new component, you can use:

```
npm run generate ./path/to/MyNewComponent
```

Which will create 4 files (index.ts, MyNewComponent.tsx, MyNewComponent.module.scss, MyNewComponent.test.tsx)



