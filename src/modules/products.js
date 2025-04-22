import { shopify } from "../config.js";
import { getShopifySession } from "../utils/getShopifySession.js";

export const getProducts = async (req) => {
  const shopifyClient = new shopify.clients.Graphql({
    session: getShopifySession(req)
  });

  return await shopifyClient.query({
    data: `{
      products(first: 250) {
        edges {
          node {
            title
            id
            productType
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }`,
  });
}
