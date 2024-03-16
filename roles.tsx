import { sidebarLinks } from "@/routes";

export const level = {
  customer: 0,
  staff: 1,
  agent: 2,
  admin: 3,
};

export type Role = keyof typeof level;
export type SidebarLinks = {
  [K in Role]?: {
    id: string;
    path: string;
    label: string;
    icon: React.ReactNode;
    canView: (role: Role) => boolean;
  }[];
};

export const getLevel = (role: Role): number => {
  return level[role];
};

export const isSuperiorOrEqual = (role: Role, than: Role): boolean => {
  return getLevel(role) >= getLevel(than);
};

export const sanitizeRole = (role: string): Role => {
  const roles = Object.keys(level);

  if (roles.includes(role)) {
    return role as Role;
  }

  throw new Error(`Invalid Role: ${role}`);
};

export const getPath = (
  role: Role,
  identifier: string,
  nonNullable: string,
): string => {
  const paths = sidebarLinks[role];

  if (!paths) {
    return nonNullable;
  }

  for (let i = 0; i < paths.length; i++) {
    if (paths[i].id === identifier) {
      return paths[i].path;
    }
  }

  return nonNullable;
};

export const hasLinksToRender = (role: Role, forRole: Role): boolean => {
  const paths = sidebarLinks[forRole];

  if (!paths) {
    return false;
  }

  for (let i = 0; i < paths.length; i++) {
    if (paths[i].canView(role)) {
      return true;
    }
  }

  return false;
};

export const getRoleFromPath = (path: string): Role | null => {
  const roles = Object.keys(level) as Role[];

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const paths = sidebarLinks[role];

    if (!paths) {
      continue;
    }

    for (let j = 0; j < paths.length; j++) {
      if (paths[j].path === path) {
        return role as Role;
      }
    }
  }

  return null;
};
