import Link from "next/link";
import { ProductNode } from "@/types/shopify";

interface ProductCardProps {
  product: ProductNode;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="p-[10px]">
      <Link href={`/product/${product.handle}`}>
        <img src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.image.altText}/>
        <h4>{product.title}</h4>
        <p>${parseInt(product.variants.edges[0].node?.priceV2?.amount, 10)}</p>
      </Link>
    </div>
  );
}
