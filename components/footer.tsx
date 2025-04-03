"use client"
import { useEffect, useState } from "react";

export default function Footer() {
  const [shopName, setShopName] = useState<string | null>(null);

  return (
    <footer className="bg-black text-white py-2 text-center w-full mt-5">
        <div className="container mx-auto">
            <p className="text-xs">Copyright &copy; {new Date().getFullYear()} | <a href="/">{process.env.NEXT_PUBLIC_SITE_NAME}</a></p>  
        </div>
    </footer>
  )
}