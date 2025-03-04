# Mapo Minimal Starter

## Setup

Make sure to install dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

Start the example project

```bash
# pnpm
pnpm example:dev
```

Start the uikit project

```bash
# pnpm
pnpm uikit:dev

# storybook
pnpm uikit:storybook
```

Start the core project

```bash
# pnpm
pnpm core:dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## NB

The uikit layer uses "nuxt": "3.11.2" to maintain compatibility with Storybook, unlike other layers which use "nuxt": "^3.15.4". This is necessary because the latest version of Storybook (8.6) is not compatible with nuxt-storybook@8.3. For more details, refer to the [Nuxt Storybook setup guide](https://storybook.nuxtjs.org/getting-started/setup).
