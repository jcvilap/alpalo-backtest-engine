# Deployment Guide: Vercel

This guide outlines how to deploy the Alpalo Backtest Engine to Vercel. Vercel is the recommended platform for Next.js applications, offering zero-configuration deployment and automatic CI/CD.

## Prerequisites

1.  **Vercel Account**: [Sign up here](https://vercel.com/).
2.  **GitHub Repository**: Ensure your code is pushed to a GitHub repository (e.g., `main` branch).
3.  **Polygon API Key**: You will need your `POLYGON_API_KEY` from `.env.local`.

---

## Steps to Deploy

1.  **Import Project**:
    *   Log in to Vercel.
    *   Click **Add New...** > **Project**.
    *   Select **Continue with GitHub**.
    *   Find and import your repository (`alpalo-backtest-engine`).

2.  **Configure Project**:
    *   **Framework Preset**: Vercel should automatically detect **Next.js**.
    *   **Root Directory**: Leave as `./`.
    *   **Build and Output Settings**: Leave default.

3.  **Environment Variables**:
    *   Expand the **Environment Variables** section.
    *   Add the following variable:
        *   **Key**: `POLYGON_API_KEY`
        *   **Value**: `your_actual_api_key_here` (Copy from your local `.env.local`)
    *   Click **Add**.

4.  **Deploy**:
    *   Click **Deploy**.
    *   Vercel will build your application and assign a production domain (e.g., `alpalo-backtest-engine.vercel.app`).

---

## CI/CD

Vercel automatically sets up CI/CD for you:
*   **Push to main**: Automatically deploys to production.
*   **Pull Requests**: Automatically creates a Preview Deployment for every PR, allowing you to test changes before merging.

## Note on Caching

Since Vercel functions are serverless and have a read-only filesystem (except for `/tmp`), the application has been configured to use `/tmp` for caching data in production. Note that this cache is ephemeral and may be cleared between invocations, but it helps reduce API calls during a single session or warm executions.

