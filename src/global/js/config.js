export const baseRESTURL =
    process.env.NODE_ENV.toLowerCase() === 'development'
        ? 'https://localhost:5001/api'
        : null;

export const baseGQLURL =
    process.env.NODE_ENV.toLowerCase() === 'development'
        ? 'https://localhost:5001/graphql'
        : null;

export const baseURLWSS =
    process.env.NODE_ENV.toLowerCase() === 'development'
        ? 'wss://localhost:5001/graphql'
        : null;
