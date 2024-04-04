# interview-cathay-united-bank

This is an interview project, the answer is inside of the `/pages/test` directory
and `/test/1` will be the first .pdf question then `/test/2` will be the second .pdf question

## Frontend Configuration

Below is the directory structure for the frontend part of the project:

```plaintext
├── __tests__/                   # For containing the Jest unit test
│   ├── pages/                   # Pages test
│   ├── components/              # Components test
├── cypress/                     # For containing the Cypress test e2e or component
│   ├── components/              # Components test
│   ├── downloads/               # Store files that are downloaded during test runs
│   ├── e2e/                     # For e2e test
│   ├── support/                 # Extend cypress capabilities
│   ├── videos/                  # E2e test video
│   ├── tsconfig.json            # Cypress ts config
├── public/                      # Static files like favicon, etc.
├── src/
│   ├── assets/                  # Static assets
│   │   ├── icons/               # SVG icons
│   ├── components/              # Reusable components
│   │   └── CustomMuiElement/    # Customized MUI elements
│   │       ├── ButtonSets/      # Collection of button components
│   │       ├── Calendar/        # Collection of calendar components
│   │       ├──── DateElements/  # Contain all the calendar elements
│   │       ├──── method.ts/     # Utility functions and helpers
│   │       ├──── index.tsx/     # Export entire calendar
│   ├── configs/                 # Configuration files and constants
│   ├── hooks/                   # Custom React hooks
│   ├── layouts/                 # Layout components
│   │   └── MainLayout/          # Main layout wrapper for the app
│   ├── pages/                   # Page components and API routes
│   │   ├── api/                 # Server-side API routes and database queries
│   │   ├── test/                # contain the answer of the .pdf test
│   ├── providers/               # Context providers
│   ├── styles/                  # Global styles and SCSS modules
│   │   └── globals.module.scss  # SCSS overrides for MUI components
│   ├── themes/                  # Theme configuration for MUI
│   └── utils/                   # Global Utility functions and helpers
├── .dockerignore
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .lintstagedrc.js             # Lint-staged configuration for running linters on staged file
├── .prettierignore
├── .prettierrc
├── .stylelintrc.json            # Configure rules for linting CSS or SCSS
├── yarnrc.yml
├── cypress.config.ts            # Configuration for cypress
├── cypress.d.ts                 # Definition for the types of cypress
├── Dockerfile                   # You can use this file to create a server-side application in docker container
├── global.d.ts                  # Global type definitions
├── jest.config.ts               # Configuration for jest
├── jest.setup.js                # the setup before running jest
├── next.config.js               # Next.js configuration
├── nodemon.json                 # For defining the custom server node behavior
├── package.json
├── robots.txt                   # For defining the web crawler behavior
├── server.ts                    # This is custom node web server setup
├── tsconfig-server.json         # This is custom node web ts config
├── tsconfig.json
├── vercel.json                  # Configuration for Deploying to vercel
└──
```

### Install dependencies

```bash
yarn install
```

### Start development server

```bash
yarn dev:local
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

### Start custom development server

```bash
yarn dev:custom:server
```

For utilizing the `server.ts` node server

### Build for production

```bash
yarn build
```

### Start preview server after build

```bash
yarn start
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

### Start preview server after build

```bash
yarn start:docker
```

Open [http://localhost:3005](http://localhost:3005) Build the docker image and launch a container

### Run release

Follow the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) in your repository. And when you're ready to release, run below scripts.

```bash
yarn release
```

### Prettier

```bash
yarn prettier
```

### Lint

```bash
yarn lint
```

### Cypress

```bash
yarn cypress:open
```

Open cypress web applcation

```bash
yarn cypress:run
```

Cypress component test

```bash
yarn cypress:e2e
```

### Jest

```bash
yarn test
```

```bash
yarn test:watch
```

### Commit Rules

- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **test**: A test code change in `cypress` or `__tests__` directory
- **refactor**: A code change that neither fixes a bug nor adds refactor the code
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

### Start and dev difference

next dev starts the Next.js application in development mode with hot-reloading, detailed error reporting, and more debugging capabilities. next start runs the application in production mode, optimized for performance and efficiency

### Website link

https://interview-cathay-united-bank.vercel.app/
