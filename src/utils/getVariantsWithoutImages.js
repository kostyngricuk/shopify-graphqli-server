export const getVariantsWithoutImages = (products) => {
  return products.edges.reduce((acc, productEdge) => {
    const variants = productEdge.node.variants.edges;

    const noImageVariants = variants
      .filter(variantEdge => variantEdge.node.image === null)
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
