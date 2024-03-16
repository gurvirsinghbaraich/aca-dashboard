import Link from "next/link";
import { Role, SidebarLinks } from "@/roles";

export default function PopulateSiderbarLinks({
  userRole,
  links,
}: {
  userRole: Role;
  links: SidebarLinks[Role];
}) {
  if (!links) return;

  return (
    <div className="flex flex-col gap-2">
      {links.map((baseLink) =>
        baseLink.canView(userRole) ? (
          <Link
            key={baseLink.id}
            href={baseLink.path}
            className="active flex gap-2 p-3"
          >
            <div className="h-6 w-6">{baseLink.icon}</div>
            {baseLink.label}
          </Link>
        ) : null,
      )}
    </div>
  );
}
