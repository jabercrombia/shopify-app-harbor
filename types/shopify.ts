export interface ProductNode {
    id: string;
    title: string;
    description: string;
    images: {
      edges: {
        node: {
          url: string;
        };
      }[];
    };
  }
  
  export interface ShopifyProductsResponse {
    data: {
      products: {
        edges: {
          node: ProductNode;
        }[];
      };
    };
  }
  