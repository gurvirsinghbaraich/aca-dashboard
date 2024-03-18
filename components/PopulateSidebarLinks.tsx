import Link from "next/link";
import translate from "@/hooks/translate";
import { Role, SidebarLinks } from "@/roles";
import { useLocale } from "next-intl";

export default function PopulateSiderbarLinks({
  userRole,
  links,
}: {
  userRole: Role;
  links: SidebarLinks[Role];
}) {
  if (!links) return;
  const t = translate();
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-2">
      {links.map((baseLink) =>
        baseLink.canView(userRole) ? (
          <Link
            key={baseLink.id}
            href={`/${locale}${baseLink.path}`}
            className="active flex gap-2 p-3 capitalize"
          >
            <div className="h-6 w-6">{baseLink.icon}</div>
            {t(baseLink.label)}
          </Link>
        ) : null,
      )}
    </div>
  );
}
