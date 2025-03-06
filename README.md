# Next.js Shopify Integration

This project integrates **Shopify** with a **Next.js** application, allowing you to fetch products from a Shopify store and display them on a dynamic product page. The project is built using **Next.js 13+** with the **App Directory**, making use of **Server Components** for data fetching.

## Features
- Fetches product data from a Shopify store using the **Shopify Storefront GraphQL API**.
- Displays a list of products on the homepage with the ability to navigate to individual product pages.
- Uses Next.js's **App Directory** for dynamic routing and server-side data fetching.
- Supports **client-side navigation** using `next/link`.

## Tech Stack
- **Next.js 13+** (App Directory)
- **Shopify Storefront API** (GraphQL)
- **React** (Server Components)
- **TypeScript**

---

## Project Structure

### `/app`
- Contains the main app and routing logic, using the **App Directory**.
- **`/product/[handle]`**: The dynamic route for displaying individual product details.
- **`/product/page.tsx`**: The homepage component that fetches and displays a list of products.

### `/lib`
- Contains utility functions for fetching product data from Shopify.
- **`shopify.ts`**: The file where the Shopify API is called to fetch product data.

### `/components`
- Contains reusable React components like **ProductCard** that render product details.

### `/types`
- Contains TypeScript types for the Shopify product data.

---

## How It Works

1. **Fetching Product Data**
   - The project uses the **Shopify Storefront API** to fetch product data via GraphQL.
   - The GraphQL query fetches product details such as title, description, variants, and prices.

2. **Dynamic Product Pages**
   - For each product, a **dynamic route** is created based on the product handle, which is unique to each product.
   - When navigating to a product page, the product handle is used to fetch and display the specific product's data.

3. **Next.js Dynamic Routing**
   - In the **App Directory** structure, dynamic routing is handled using the `[handle]` folder structure, allowing each product to have its own unique page.

---

## Example Usage

### Fetching Products on the Homepage

In `app/product/page.tsx`, products are fetched using the `getProducts` function from `lib/shopify.ts` and displayed using the `ProductCard` component.

### Displaying a Single Product

In `app/product/[handle]/page.tsx`, we use the product handle from the URL to fetch and display a single product's details.

---

## Future Improvements

- Add pagination to load more products from Shopify.
- Enhance product details with more attributes (images, categories, etc.).
- Implement a shopping cart and checkout functionality.
- Improve error handling and loading states for a better user experience.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Let me know if you'd like any more changes!