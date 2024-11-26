"use client";

import { AddLinkForm } from "@/components/AddLinkForm/AddLinkForm";
import { LinkPreview } from "@/components/LinkPreview";
import { LinksProvider, useLinksContext } from "@/contexts";
import { useLinks } from "@/hooks/useLinks";

export default function Home() {
  const { links } = useLinksContext();

  return (
    <div>
      <AddLinkForm parentId={null} />
      <div className="mt-4"></div>
      <ul>
        {links.map((link) => {
          {
            return (
              <LinkPreview
                key={link.id}
                {...link}
                parentId={link.id}
                
              />
            );
          }
        })}
      </ul>
    </div>
  );
}
