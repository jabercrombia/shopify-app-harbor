import { getNavigation } from "@/lib/shopify";

import Image from 'next/image'
import Link from 'next/link';
import Logo from '../public/images/logo.svg'

export default async function Navigation() {
  const navigation = await getNavigation(); // Parse the JSON string

  // hiding the frontpage and all-products and all-collections from the navigation
  const navigationRefinemnet = navigation?.filter((item: { id: string; title: string; handle: string }) => {
    return item.handle.toLocaleLowerCase() !== 'frontpage' && item.handle !== 'all-products' && item.handle !== 'all-collections';
  });


  return (
    <nav className="w-full bg-black text-white">
      <div className="container mx-auto">
        <div className="flex w-full">
          <div>
            <Link href="/">
              <Logo/>
            </Link>
          </div>
          {navigationRefinemnet?.map((item: { id: string; title: string; handle: string }) => (
          <div key={item.handle}>
            <Link href={`/collections/${item.handle}`}>{item.title}</Link>
          </div>
        ))}
        </div>
      </div>
    </nav>
  );
}
