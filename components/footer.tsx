"use client"
import { getSiteName } from '../lib/shopify';
import { useEffect, useState } from "react";

export default function Footer() {
  const [shopName, setShopName] = useState<string | null>(null);

  useEffect(() => {
    getSiteName().then(setShopName).catch(console.error);
  }, []);
  return (
    <footer className="bg-black text-white py-2 text-center w-full mt-5">
        <div className="container mx-auto">
            <p className="text-xs">Copyright &copy; {new Date().getFullYear()} | <a href="/">{shopName}</a></p>  
        </div>
    </footer>
  )
}