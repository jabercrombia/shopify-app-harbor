import { ShopifyProductsResponse, ProductNode } from "@/types/shopify";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function getProducts(): Promise<ProductNode[]> {
    const query = `
    {
        products(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                    description
                    variants(first: 1) {
                    edges {
                        node {
                        id
                        availableForSale
                        priceV2 {
                            amount
                            currencyCode
                        }
                        }
                    }
                    }
                    media(first: 5) {
                    edges {
                        node {
                        ... on MediaImage {
                            id
                            image {
                            url (transform: {maxWidth: 300, maxHeight: 200, crop: CENTER})
                            altText
                            }
                        }
                        }
                    }
                    }
                }
            }
        }
    }

    `;
  
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2025-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN || "",
      },
      body: JSON.stringify({ query }),
    });
  
    const json = await response.json();
  
    // ✅ Debugging: Log API Response
    console.log("Shopify API Response:", JSON.stringify(json, null, 2));
  
    if (!json || !json.data || !json.data.products) {
      console.error("Error: Unexpected API response structure", json);
      return [];
    }

    return json.data.products.edges.map((edge: { node: ProductNode }) => edge.node);
  }



  export async function getAllProductHandles(): Promise<ProductNode[]> {
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN || "",
      },
      body: JSON.stringify({
        query: `
          {
            products(first: 10) {
              edges {
                node {
                  handle
                }
              }
            }
          }
        `,
      }),
    });
  
    const json = await response.json();
    return json.data.products.edges.map((edge: any) => edge.node.handle);
  }
  
// lib/shopify.ts
export async function getProductByHandle(handle: string) {
  const query = `
    query {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        priceRange {
            minVariantPrice {
            amount
            currencyCode
          }
        }
        collections(first: 5) {  # Fetch collections the product belongs to
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
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              price {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(SHOPIFY_ACCESS_TOKEN
          ? { "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN }
          : {}),
      },
      body: JSON.stringify({ query }),
    }
  );
  const json = await response.json();
  return json.data.product;
}

// navigation
export async function getNavigation(): Promise<{ id: string; title: string; handle: string }[]> {
  const query = `
    query {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  }).then(res => res.text());
  const jsonData = JSON.parse(response); 
  const nav = jsonData.data.collections.edges.map((str: { node: string }) => str.node);
  return nav;
}