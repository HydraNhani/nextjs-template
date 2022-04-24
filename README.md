# NextJS starter template

This is a [Next.js](https://nextjs.org/) template bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 1. Installation

## Initialize NextJS project

### First, initialize the NextJS project (with NPM):

```bash
npx create-next-app nextjs-template --use-npm --typescript
```


## Manual dependency installation

### Install dependencies:

#### Install only the dependencies you need:

```bash
npm install <package_name>
```

#### Install all of the dependencies:
```bash
npm install graphql
```
```bash
npm install react@17.0.2 react-dom@17.0.2 @apollo/client @headlessui/react @heroicons/react @mantine/core @mantine/hooks @mantine/next @mantine/notifications @prisma/client @reduxjs/toolkit @tailwindcss/forms apollo-server-micro class-validator firebase framer-motion graphql@15.8.0 graphql-fields graphql-scalars omit react-error-boundary react-firebase-hooks react-firebaseui react-redux redux reflect-metadata sass sharp tailwind-merge tslib type-graphql cookies-next tabler-icons-react
```

[`@apollo/client`](https://www.apollographql.com/docs/react/) - A fully-featured caching GraphQL client. (required for GraphQL)

[`@headlessui/react`](https://headlessui.dev/) - A set of completely unstyled, fully accessible UI components for React, designed to integrate beautifully with Tailwind CSS.

[`@heroicons/react`](https://heroicons.com/) - A set of 450+ free MIT-licensed high-quality SVG icons for you to use in your web projects.

[`Mantine`](https://mantine.dev/) - A fully featured React components library

[`@prisma/client`](https://www.prisma.io/docs/concepts/components/prisma-client) - Prisma Client is an auto-generated, type-safe and modern JavaScript/TypeScript ORM for Node.js that's tailored to your data. Supports MySQL, PostgreSQL, MariaDB, SQLite databases. (required for database integration)

[`@reduxjs/toolkit`](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development (required for Redux)

[`@tailwindcss/forms`](https://github.com/tailwindlabs/tailwindcss-forms#readme) - A plugin that provides a basic reset for form styles that makes form elements easy to override with utilities. (required for Tailwind styled forms)

[`apollo-server-micro`](https://github.com/apollographql/apollo-server#readme) - Production-ready Node.js GraphQL server for Micro (required for GraphQL)

[`class-validator`](https://github.com/typestack/class-validator#readme) - Decorator-based property validation for classes. (required for TypeGraphQL)

[`firebase`](https://firebase.google.com) - Firebase JavaScript library for web and Node.js (required for Authentication)

[`framer-motion`](https://framer.com/motion) - A simple and powerful React animation library 

[`graphql`](https://graphql.org/) - A Query Language and Runtime which can target any service. 

[`graphql-fields`](https://github.com/robrichard/graphql-fields#readme) - Turns GraphQLResolveInfo into a map of the requested fields (required for TypeGraphQL Prisma integration)

[`graphql-scalars`](https://github.com/Urigo/graphql-scalars#readme) - A collection of scalar types not included in base GraphQL. (required for TypeGraphQL Prisma integration)

[`omit`](https://github.com/DamonOehlman/omit) - Efficient ommission of object data based on keys, values and evaluator functions (required for Util)

[`react-error-boundary`](https://github.com/bvaughn/react-error-boundary#readme) - Simple reusable React error boundary component (required for React Error Handling)

[`react-firebase-hooks`](https://github.com/csfrequency/react-firebase-hooks) - React Hooks for Firebase (required for Firebase)

[`react-firebaseui`](https://github.com/firebase/firebaseui-web-react#readme) - React wrapper for firebaseui: Javascript library for customizable UI on top of Firebase SDK (required for Firebase UI)

[`react-redux`](https://react-redux.js.org/) - Official React bindings for Redux (required for Redux)

[`react-toastify`](https://fkhadra.github.io/react-toastify/introduction/) - React notification made easy

[`redux`](https://redux.js.org/) - Predictable state container for JavaScript apps (required for state management)

[`reflect-metadata`](https://rbuckton.github.io/reflect-metadata/) - Polyfill for Metadata Reflection API (required for TypeGraphQL)

[`sass`](https://sass-lang.com/) - most mature, stable, and powerful professional grade CSS extension language in the world

[`sharp`](https://sharp.pixelplumbing.com/) - High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, GIF, AVIF and TIFF images

[`tailwind-merge`](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes without style conflicts

[`tslib`](https://www.typescriptlang.org/) - Runtime library for TypeScript helper functions (required for TypeGraphQL Prisma integration)

[`type-graphql`](https://typegraphql.com/) - Create GraphQL schema and resolvers with TypeScript, using classes and decorators! (required for GraphQL)

## Automatic dependency installation
### Install all dependencies:

```bash
npm install
```

## Install development dependencies

### Install all development dependencies:

```bash
npm install -D @types/graphql-fields @types/node @types/omit @types/react@17.0.2 @types/react-dom@17.0.2 autoprefixer eslint eslint-config-next postcss prisma tailwindcss typegraphql-prisma typescript
```

# Prisma Setup

Read this guide to setup Prisma with MongoDB:

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb

Run the following command everytime editing schema.prisma:

```bash
npx prisma generate
```

## Prisma Configuration

In `types.d.ts` in the root directory prisma is declared in the global namespace for the context of GraphQL

See at `./graphql/context.ts` and `./lib/prisma.ts`

# Types

Add all your typings into the `types.d.ts` file in the root directory.

# Tailwind CSS Setup

Read this guide to setup Tailwind CSS:

https://tailwindcss.com/docs/guides/nextjs

# Firebase Setup

Read this guide to setup Firebase:

https://firebase.google.com/docs

Go to `./lib/firebase.ts` and modify the `firebaseConfig` object

# Todos

There is also a file called `TODOS.md` in the root directory where you can add todos for your project.

# Default settings

`next.config.js` - top level await is enabled by default; ignore build errors with TypeScript

`tailwind.config.js` - `darkMode` is set to `class`

`.eslintrc.json` - `react/display-name` and `react-hooks/rules-of-hooks` just throw warnings instead of errors (for the custom hook in `./lib/hooks.tsx`)

`.graphqlrc.json` - schema directory is `./graphql/schema.graphql` (generated by TypeGraphQL)

`./graphql/index.ts` - output directory of `schema.graphql` is the `./graphql` folder

`./graphql/context.ts` - context is configured with prisma by default

`./actions/index.ts` - configured Redux store with two default mode and layout slicers

# Enviroment variables

### You have to configure the following environment variables:

`APOLLO_CLIENT_URL` - The URL of the GraphQL API endpoint

`DATABASE_URL` - The MongoDB uri 

### Also configure these constants in `./constants/index.ts`

`APPLICATION_NAME` - The website name

`APPLICATION_DESCRIPTION` - Some fallback description of the website

# Tab Settings

### You have to configure the tabs the user can access in the `./src/components/Layout/index.tsx` file

## Types

Go to `types.d.ts` and add the enviroment variable name to the `NodeJS` namespace in the following syntax:

`<ENV_VARIABLE_NAME>: string;`

`EXAMPLE: string;`

# Styling

## Font Style

Edit the font style by going to `./src/styles/globals.scss` and edit the `font-family` property of the body selector

Also go to `./src/pages/_app.tsx` and go to the `MantineProvider` and edit the `theme` object

`SOME_FONT_FAMILY_HERE` is the default value

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
