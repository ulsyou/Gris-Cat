# How to Start the Frontend

## Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** or **npm** package manager
- **Backend server** running (see `../shopit-backend/START.md`)

## Step-by-Step Setup

### 1. Install Dependencies

Navigate to the `shopit-frontend` directory and install dependencies:

```powershell
cd shopit-frontend
yarn install
# or
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `shopit-frontend` directory (at the root, same level as `package.json`):

```env
# Backend API URL
VITE_BACKEND_DOMAIN="http://localhost:3000/api"

# Stripe (Optional - only if using Stripe payment)
# VITE_STRIPE_PRUBLIC_KEY="pk_test_your_stripe_public_key"
```

**Required Environment Variables:**
- `VITE_BACKEND_DOMAIN` - Backend API base URL (default: `http://localhost:3000/api`)

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be accessible in the frontend code.

### 3. Install Missing Dependencies

If you encounter errors about missing packages, install them:

**Install framer-motion (required by Chakra UI):**
```powershell
yarn add framer-motion@^6.5.1
```

**Update TypeScript (if needed for react-hook-form errors):**
```powershell
yarn add -D typescript@5.0.4
```

### 4. Start the Development Server

**Important:** Use `yarn dev` (not `yarn start`)

```powershell
yarn dev
# or
npm run dev
```

The frontend will start on `http://localhost:5173` (or the next available port).

### 5. Access the Application

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000/api` (make sure backend is running)

## Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn serve` - Preview production build
- `yarn lint` - Run ESLint and Prettier
- `yarn type-check` - Run TypeScript type checking

## Troubleshooting

### Common Issues

1. **"Cannot connect to backend" error**
   - Make sure the backend server is running on port 3000
   - Verify `VITE_BACKEND_DOMAIN` in your `.env` file matches your backend URL
   - Check CORS settings in backend if you see CORS errors

2. **Environment variables not working**
   - Make sure variables are prefixed with `VITE_`
   - Restart the dev server after changing `.env` file
   - Check that `.env` is in the root of `shopit-frontend` directory

3. **Port already in use**
   - Vite will automatically try the next available port
   - Or specify a different port: `yarn dev --port 3000`

4. **Module not found errors**
   - Run `yarn install` to ensure all dependencies are installed
   - Delete `node_modules` and `yarn.lock`, then run `yarn install` again

## Development Tips

- The project uses **Vite** for fast hot module replacement (HMR)
- **React Query** is used for server state management
- **Zustand** is used for client/UI state management
- Check the browser console for API errors
- Use React DevTools for debugging components

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page components/routes
- `src/services/` - API client and services
- `src/hooks/` - Custom React hooks
- `src/store/` - State management (Zustand stores)

