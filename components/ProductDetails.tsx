"use client";

import { useState } from "react";
import SizeSelector from "@/components/SizeSelector";
import {QuantitySelector} from "@/components/QuantitySelector";
import { AddToCartButton } from "@/components/AddToCartButton";
import BreadCrumb from "./ux/BreadCrumb";


export default function ProductDetails({ product, sizes }: { product: any; sizes: any[] }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const category = product.collections.edges[0].node.title.toLocaleLowerCase();
  const handleSizeSelect = (selectedId: string) => {
    console.log("Selected size ID:", selectedId);
    setSelectedSize(selectedId); // Make sure state exists in the parent
  };

  return (
    <div className="container">
        <div>
            <BreadCrumb category={category}/>
        </div>
        <div className="flex">
            <div className="w-1/2">
            <img src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.image.alt} />
            </div>
            <div className="w-1/2">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p>{product.description}</p>
                <SizeSelector sizes={sizes} onSelect={handleSizeSelect} />
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                <AddToCartButton variantId={selectedSize} quantity={quantity} />
            </div>
        </div>


    </div>
  );
}
