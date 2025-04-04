"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SizeOption {
  id: string;
  title: string;
  availableForSale: boolean;
  price: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
}

interface SizeSelectorProps {
  sizes: any[];
  onSelect: (selectedId: string) => void;
}

export default function SizeSelector({ sizes, onSelect }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const availableSizes = sizes.filter((size) => size.availableForSale);
  const defaultSize = availableSizes[0]?.id || "";
  const defaultSizeTitle = availableSizes[0]?.title || "";

  console.log(availableSizes); 
  console.log(defaultSize);
  console.log(defaultSizeTitle);

  const handleChange = (selectedId: string) => {
    setSelectedSize(selectedId);
    if (typeof onSelect === "function") {
      onSelect(selectedId); // Ensure this is a function before calling
    } else {
      console.error("onSelect is not a function:", onSelect);
    }
  };

  return (
    <div>
      <label htmlFor="size" className="text-sm font-medium text-gray-700">
        Select Size
      </label>
      <Select value={selectedSize} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          <SelectLabel>Sizes</SelectLabel>
            {sizes.map((size) => {
              const price = size.price?.amount ? `$${parseFloat(size.price?.amount).toFixed(2)}` : '';
              return (
                <SelectItem
                  key={size.id}
                  value={size.id}
                  disabled={!size.availableForSale}
                >
                  {`${size.title} - ${price}`}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
