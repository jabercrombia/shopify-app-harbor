// app/actions/shopify.ts
"use server";

import { shopifyFetch } from "@/lib/shopify";

export async function addToCart(variantId: string, quantity: number) {
  const mutation = `
    mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {
      checkoutCreate(input: { lineItems: $lineItems }) {
        checkout {
          id
          webUrl
        }
      }
    }
  `;

  const variables = {
    lineItems: [{ variantId, quantity }],
  };

  try {
    const response = await shopifyFetch(mutation, variables);
    return response.checkoutCreate.checkout.webUrl; // Shopify checkout URL
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return null;
  }
}
