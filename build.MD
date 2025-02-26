# Build Guide for n8n-nodes-useapi

## Prerequisites

- Node.js (v14 or later recommended)
- npm, yarn, or pnpm
- n8n installed (either globally or locally)

## Building the Package

1. Clone the repository:
   ```bash
   git clone https://github.com/lvalics/n8n-nodes-useapi.git
   cd n8n-nodes-useapi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Build the package:
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

cp -r dist/* ~/.n8n/custom/

## Development Installation

To use the package during development:

1. Create a global symlink from your package directory:
   ```bash
   npm link
   # or
   yarn link
   # or
   pnpm link --global
   ```

2. Find your n8n installation path:
   ```bash
   # For Linux/Mac
   which n8n
   readlink -f $(which n8n)

   # For Windows
   where n8n

   # For npm global installations
   npm list -g | grep n8n
   ```

3. Link your package to n8n:
   ```bash
   cd ~/.nvm/versions/node/v18.20.7/lib/node_modules/n8n/
   npm link n8n-nodes-useapi
   # or
   yarn link n8n-nodes-useapi
   # or
   pnpm link --global n8n-nodes-useapi
   ```

4. Restart n8n:
   ```bash
   n8n start
   ```

5. For development with auto-restart:
   ```bash
   npm run runn8n
   ```

## Production Installation

1. Package as a tarball:
   ```bash
   npm pack
   ```

2. Install globally or in your n8n installation:
   ```bash
   npm install -g n8n-nodes-useapi-0.1.0.tgz
   # or in n8n directory
   npm install n8n-nodes-useapi-0.1.0.tgz
   ```

## Troubleshooting

- **404 Not Found Error**: Make sure to run `npm link` in your package directory before running `npm link n8n-nodes-useapi` in the n8n directory.

- **Permission Issues**: You may need to use `sudo` with npm commands if you encounter permission errors.

- **Node Not Appearing**: Check if the package is correctly linked:
  ```bash
  ls -la /path/to/n8n/node_modules/n8n-nodes-useapi
  ```

- **Credential Issues**: Ensure your credentials file is properly formatted and registered in package.json under `n8n.credentials`.

- **Restart Required**: Always restart n8n after linking or installing new nodes.
