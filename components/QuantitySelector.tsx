import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
interface QuantitySelectorProps {
  onChange: (quantity: number) => void;
  minQuantity: number;
  maxQuantity: number;
}

export default function QuantitySelector({ onChange, minQuantity, maxQuantity }: QuantitySelectorProps) {
  const [selectedQuantity, setSelectedQuantity] = React.useState<number>(minQuantity);

  const handleChange = (value: string) => {
    const quantity = parseInt(value, 10);
    setSelectedQuantity(quantity);
    onChange(quantity); // Notify parent component about the change
  };

  // Generate an array for quantity options
  const quantityOptions = Array.from({ length: maxQuantity - minQuantity + 1 }, (_, index) => minQuantity + index);

  return (
    <Select value={selectedQuantity.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Size" />
        </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quantity</SelectLabel>
          {quantityOptions.map((quantity) => (
            <SelectItem key={quantity} value={quantity.toString()}>
              {quantity}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
