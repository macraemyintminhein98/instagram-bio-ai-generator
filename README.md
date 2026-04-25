# BioGenie - AI Instagram Bio Generator

BioGenie is an AI-powered web application designed to help small business owners, influencers, and individuals create engaging Instagram bios. Users input their interests, profession, and desired mood, and the app generates a creative bio instantly.

## Features

*   **AI-Powered Generation:** Leverages large language models (via serverless functions) to craft unique bios.
*   **Customizable Styles:** Choose from professional, funny, inspirational, quirky, or minimalist tones.
*   **Simple Interface:** Intuitive design for quick and easy bio creation.
*   **Secure Payments:** Integrated with Stripe Checkout for seamless one-time purchases.

## How It Works

1.  **User Input:** Enter details like interests, profession, and preferred mood.
2.  **Payment:** Complete a secure $2.99 payment via Stripe.
3.  **AI Generation:** Our backend processes your request and calls a language model.
4.  **Bio Display:** Receive a fresh, custom Instagram bio ready to copy.

## Setup (Developer)

1.  **Clone this repository.**
2.  **Set up your Vercel project:** Host the `index.html` frontend.
3.  **Create a Vercel Serverless Function:** Develop an API endpoint (`/api/create-checkout-session` and another for bio generation post-payment webhook) to handle:
    *   Receiving user input.
    *   Interacting with the Stripe API to create Checkout Sessions.
    *   Calling an LLM API (e.g., OpenAI GPT-3.5-turbo).
    *   Returning generated bios.
4.  **Stripe Integration:** Configure Stripe webhooks to detect successful payments and trigger bio generation.
5.  **Environment Variables:** Set up `STRIPE_SECRET_KEY`, `STRIPE_PUBLIC_KEY`, and `OPENAI_API_KEY` (or equivalent LLM API key) securely in Vercel.

## Technologies

*   **Frontend:** HTML, CSS, JavaScript (Vercel)
*   **Backend:** Serverless Functions (Vercel Edge Functions or AWS Lambda/Azure Functions)
*   **AI:** OpenAI GPT-3.5-turbo (or similar LLM API)
*   **Payments:** Stripe Checkout
