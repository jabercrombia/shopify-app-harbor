import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { variantId, quantity } = await req.json();

    if (!variantId) {
      return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
    }

    const mutation = `
      mutation addToCart($variantId: ID!, $quantity: Int!) {
        cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) {
          cart {
            id
            lines(first: 5) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = { variantId, quantity };
    const data = await shopifyFetch(mutation, variables);

    if (!data.cartCreate?.cart) {
      throw new Error("Shopify cart creation failed.");
    }

    return NextResponse.json({ cart: data.cartCreate.cart });
  } catch (error: any) {
    console.error("Cart API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
