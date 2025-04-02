import { getProducts } from "@/lib/shopify";
import ProductList from "@/components/ProductList"

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <h1>Shopify Products</h1>
      <div className="container mx-auto">
        <ProductList products={products} />
      </div>
    </div>
  );
}
