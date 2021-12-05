export const baseRESTURL =
    process.env.NODE_ENV.toLowerCase() === 'development'
        ? 'https://localhost:5001/api'
        : 'https://time-manager-api.azurewebsites.net/api';

export const baseGQLURL =
    process.env.NODE_ENV.toLowerCase() === 'development'
        ? 'https://localhost:5001/graphql'
        : 'https://time-manager-api.azurewebsites.net/graphql';
