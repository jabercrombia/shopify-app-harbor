import React from 'react';
import Link from 'next/link'
interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  imageSrc: string;
  handle: string; // Added handle property
}

interface CollectionData {
  id: string;
  title: string;
  descriptionHtml: string;
  products: Product[];
}

interface CollectionPageProps {
  collection: CollectionData;
}

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  const { handle } = params;

  const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const SHOPIFY_GRAPHQL_API = `https://${process.env.SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2024-01/graphql.json`; // Replace with your store URL

  // GraphQL query to fetch collection and products by handle
  const query = `
    query getCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        descriptionHtml
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              descriptionHtml
              images(first: 1) {
                edges {
                  node {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // Fetch collection data from Shopify
  const response = await fetch(SHOPIFY_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN, // Your Storefront Access Token
    },
    body: JSON.stringify({
      query,
      variables: { handle },
    }),
  });

  const { data } = await response.json();

  // If no collection is found, show a "Collection Not Found" message
  if (!data.collectionByHandle) {
    return <p>Collection not found.</p>;
  }

  // Prepare collection data to display
  const collection = {
    id: data.collectionByHandle.id,
    title: data.collectionByHandle.title,
    descriptionHtml: data.collectionByHandle.descriptionHtml,
    products: data.collectionByHandle.products.edges.map((edge: any) => ({
      id: edge.node.id,
      handle: edge.node.handle,
      title: edge.node.title,
      descriptionHtml: edge.node.descriptionHtml,
      imageSrc: edge.node.images.edges[0]?.node.src || '',
    })),
  };

  return (
    <div className='container mx-auto'>
      <h1>{collection.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }} />
      
      <div>
        <div className="product-list flex">
          {collection.products.map((product: Product) => (
            <div key={product.id} className="product w-1/4 mx-[10px]">
                    <Link href={`/product/${product.handle}`}>
              {product.imageSrc && <img src={product.imageSrc} alt={product.title} />}
              <h3>{product.title}</h3>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
