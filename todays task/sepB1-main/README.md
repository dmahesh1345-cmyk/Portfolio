# Smart Kitchen

A responsive restaurant frontend for Smart, a seasonal neighborhood kitchen in Hyderabad, Telangana. Browse the menu, filter dishes, read kitchen notes, and manage table reservations.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deploy to Netlify

The included `netlify.toml` builds the Vite app and publishes `dist`. Connect this project directory to a Netlify site, or run `npm run build` and deploy the generated `dist` directory. The `public/_redirects` file supports direct loads of nested React Router pages.

## React topics

The app demonstrates components and props, state and effects, refs and context, reducer-based menu filters, a custom recipe API hook, React Router with nested menu routes and URL parameters, Redux Toolkit reservation CRUD, form validation, list rendering, and responsive layouts.