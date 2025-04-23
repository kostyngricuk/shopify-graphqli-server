import '@shopify/shopify-api/adapters/node';
import { ApiVersion, shopifyApi } from '@shopify/shopify-api';

import { HOST_NAME, PORT } from './constants.js';

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: ['read_products'],
  hostName: `${HOST_NAME}:${PORT}`,
  apiVersion: ApiVersion.April24,
  future: {
    lineItemBilling: true,
    customerAddressDefaultFix: true,
    unstable_managedPricingSupport: true
  },
});

export const getGraphqlClient = (session) => {
  return new shopify.clients.Graphql({
    session,
  });
}