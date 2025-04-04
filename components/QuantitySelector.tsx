"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function QuantitySelector({ quantity, setQuantity }: { quantity: number; setQuantity: (q: number) => void }) {
  const handleChange = (value: string) => {
    setQuantity(parseInt(value, 10)); // Ensure it's converted to a number
  };

  return (
    <div>
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
            Quantity
        </label>
        <Select value={quantity?.toString() || "1"} onValueChange={handleChange}>
        <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Qty" />
        </SelectTrigger>
        <SelectContent>
            {[1, 2, 3, 4, 5].map((q) => (
            <SelectItem key={q} value={q.toString()}>
                {q}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
    
  );
}
