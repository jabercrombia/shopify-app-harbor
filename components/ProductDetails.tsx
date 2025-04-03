"use client";

import { useState } from "react";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "@/components/QuantitySelector";
import BreadCrumb from "./ux/BreadCrumb";
interface ProductDetailsProps {
  product: {
    title: string;
    description: string;
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          availableForSale: boolean;
          price: { amount: string };
        };
      }[];
    };
    collections: {
        edges: {
            node: {
              id: string;
              title: string;
            };
        }[];
    }
    media: {
      edges: {
        node: {
          image: {
            url: string;
            alt: string;
          };
        };
      }[];
    };
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0].node.id);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1); // Default to 1 quantity
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const handleSizeChange = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  const handleAddToCart = async () => {
    try {
      // Create a new checkout session
      const checkout = await createCheckout();
      const updatedCheckout = await addToCart(checkout.id, selectedVariant, selectedQuantity);
      setCheckoutUrl(updatedCheckout.webUrl); // Store the checkout URL for redirection
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const category = product.collections.edges[0].node.title.toLocaleLowerCase();

  return (
    <div className="flex">
        <div className="w-1/2">
            <BreadCrumb category={category}/>
            <img src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.image.alt} />
        </div>
        <div className="w-1/2">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p>{product.description}</p>


            <SizeSelector
                sizes={product.variants.edges.map(({ node }) => ({
                id: node.id,
                title: node.title,
                availableForSale: node.availableForSale,
                price: node.price.amount,
                }))}
                onSelect={handleSizeChange}
            />
            <p>Quantity: </p>
            <QuantitySelector onChange={handleQuantityChange} 
                minQuantity={1} 
                maxQuantity={5}
            />



        </div>
      
    </div>
  );
}
