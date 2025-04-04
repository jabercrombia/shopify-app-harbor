import { shopifyFetch } from "@/lib/shopify";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }: { params: { handle?: string } }) {
  if (!params.handle) {
    return <div>Error: No product handle provided.</div>;
  }

  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        title
        description
        collections(first: 5) {
          edges {
            node {
              id
              title
            }
          }
        }
        media(first: 5) {
          edges {
            node {
            ... on MediaImage {
                image {
                  url (transform: {maxWidth: 800, maxHeight: 800})
                  altText
                }
              }
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const variables = { handle: params.handle };
  const data = await shopifyFetch(query, variables);

  if (!data?.productByHandle) {
    return <div>Error: Product not found.</div>;
  }

  const product = data.productByHandle;
  const sizes = product.variants.edges.map((edge: any) => edge.node);

  return <ProductDetails product={product} sizes={sizes} />;
}
