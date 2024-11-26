"use client";

import { AddLinkForm } from "@/components/AddLinkForm/AddLinkForm";
import { LinkPreview } from "@/components/LinkPreview";
import { NoLinks } from "@/components/NoLinks/NoLinks";
import { useLinksContext } from "@/contexts";

export default function Home() {
  const { links } = useLinksContext();

  return (
    <div>
      <NoLinks />
      <AddLinkForm parentId={null} nestingLevel={0} />
      <div className="mt-4"></div>
      <ul>
        {links.map((link) => {
          {
            return <LinkPreview key={link.id} {...link} parentId={link.id} />;
          }
        })}
      </ul>
    </div>
  );
}
