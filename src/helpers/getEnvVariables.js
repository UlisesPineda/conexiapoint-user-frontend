export const getEnvVariables = () => {
    // import.meta.env;
    return {
        // ...import.meta.env,
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_API_KEY: import.meta.env.VITE_API_KEY,
        VITE_AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
        VITE_PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
        VITE_STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
        VITE_MESSAGING_SENDER_ID: import.meta.env.VITE_MESSAGING_SENDER_ID,
        VITE_APP_ID: import.meta.env.VITE_APP_ID,
        VITE_STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        VITE_MAIN_SITE_URL: import.meta.env.VITE_MAIN_SITE_URL,
        VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    };
};