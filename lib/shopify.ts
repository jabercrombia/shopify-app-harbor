import { ShopifyProductsResponse, ProductNode } from "@/types/shopify";


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
  
    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2025-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
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
  
    return json.data.products.edges.map(edge => edge.node);
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
        variants(first: 1) {
            edges {
              node {
                id
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;
  
    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });
  
    const data = await response.json();
    return data.data.product;
  }
  