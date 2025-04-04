"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
export function AddToCartButton({ variantId, quantity }: { variantId: string; quantity: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async () => {
    if (!variantId) {
      setError("Error: No variant selected.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add to cart.");
      }

      console.log("Added to cart:", data);
    } catch (err: any) {
      console.error("Add to Cart Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleAddToCart}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
