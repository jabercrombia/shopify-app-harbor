// app/products/[handle]/page.tsx
import { use } from 'react';
import { getProductByHandle } from '@/lib/shopify';
// import AddToCartButton from "../../../components/AddToCartButton";

const ProductPage = async ({ params }: { params: { handle: string } }) => {
  const { handle } = params;
  const product = await getProductByHandle(handle);
// console.log(handle);
  if (!product) {
    return <div>Product not found</div>;
  }

const variantId = product.variants.edges[0]?.node.id;

  return (
    <div className='container mx-auto'>
      <div className='flex'>
        <div className='w-1/2'>
          <img src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.image.alt} />
        </div>
        <div className='w-1/2'>
          <h1 className='text-2xl'>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: {product.variants.edges[0].node.priceV2.amount}</p>

        </div>
      </div>
    
      {/* {variantId && <AddToCartButton variantId={variantId} />} */}

    </div>
  );
};

export default ProductPage;
