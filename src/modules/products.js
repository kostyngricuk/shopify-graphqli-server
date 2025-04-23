import { getGraphqlClient } from "../config.js";

export const getProducts = async (req) => {
  const session = req.session.shopifySession;
  const graphqlClient = getGraphqlClient(session);

  const GET_PRODUCTS_QUERY = `{
    products(first: 250) {
      edges {
        node {
          id
          title
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
  }`;

  return await graphqlClient.request(GET_PRODUCTS_QUERY, {
    variables: {
      first: 250
    },
  });
}

export const getVariantsWithoutImages = async (req) => {
  const response = await getProducts(req);

  const excludedProductType = req.query.excludedProductType;

  const products = response.data.products;

  return products.edges.reduce((acc, productEdge) => {
    const variants = productEdge.node.variants.edges;

    const noImageVariants = variants
      .filter(variantEdge => variantEdge.node.image === null && productEdge.node.productType !== excludedProductType)
      .map(variantEdge => ({
        variantId: variantEdge.node.id,
        variantTitle: variantEdge.node.title,
        productId: productEdge.node.id,
        productType: productEdge.node.productType,
        productTitle: productEdge.node.title
      }));

    return acc.concat(noImageVariants);
  }, []);
}
