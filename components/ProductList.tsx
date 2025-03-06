import ProductCard from "@/components/ProductCard";
import { ProductNode } from "@/types/shopify";

interface ProductListProps {
  products: ProductNode[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
