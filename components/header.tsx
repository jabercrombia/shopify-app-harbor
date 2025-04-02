import { getNavigation } from "@/lib/shopify";

import Image from 'next/image'

export default async function Navigation() {
    const navigation = await getNavigation(); // Parse the JSON string


  return (
    <nav>
      <ul>
        {navigation?.map((item: { id: string; title: string; handle: string }) => (
          <li key={item.handle}>
            <a href={`/collections/${item.handle}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
