"use client"; // Required to use React hooks in Next.js

import { useState, useEffect } from "react";
import { addToCart, createCart } from "../lib/shopify";

interface AddToCartButtonProps {
  variantId: string;
}


export default function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const existingCartId = localStorage.getItem("shopify_cart_id");
    if (!existingCartId) {
      createCart().then((id) => {
        localStorage.setItem("shopify_cart_id", id);
        setCartId(id);
      });
    } else {
      setCartId(existingCartId);
    }
  }, []);

  const handleAddToCart = async () => {
    if (!cartId) return;

    setLoading(true);
    await addToCart(cartId, variantId, 1);
    setLoading(false);
    setMessage("✅ Added to cart!");
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
