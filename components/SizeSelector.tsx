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
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  onSelect: (variantId: string) => void;
}

export default function SizeSelector({ sizes, onSelect }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.id || "");

  const handleChange = (selectedId: string) => {
    setSelectedSize(selectedId);
    onSelect(selectedId);
  };

  return (
    <div>
      <label className="block mt-4 text-lg font-semibold">Select Size:</label>
      <Select value={selectedSize} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sizes</SelectLabel>
            {sizes.map((size) => (
              <SelectItem key={size.id} value={size.id} disabled={!size.availableForSale}>
                {size.title} - ${size.price}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
