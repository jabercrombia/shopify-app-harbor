// app/products/[handle]/page.tsx
import { use } from 'react';
import { getProductByHandle } from '@/lib/shopify'; // Make sure you have this function

// Async function to fetch product details based on handle
const ProductPage = async ({ params }: { params: { handle: string } }) => {
  const { handle } = params;
  const product = await getProductByHandle(handle); // Fetch product data

  if (!product) {
    return <div>Product not found</div>;
  }
console.log(product);
  return (
    <div className='container mx-auto'>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <img src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.image.alt} />
      <p>Price: {product.variants.edges[0].node.priceV2.amount}</p>
      {/* Render other product details */}
    </div>
  );
};

export default ProductPage;
