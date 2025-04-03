import { getProductByHandle } from "@/lib/shopify";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);

  return <ProductDetails product={product} />;
}
