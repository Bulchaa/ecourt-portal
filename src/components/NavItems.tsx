
import {
  Activity,
  CalendarDays,
  FilePlus2,
  FileText,
  ListChecks,
  SendHorizonal,
  ShieldAlert,
  UserCog,
  Home,
  // Download, // Download icon is used internally on pages, not needed for nav itself.
} from 'lucide-react';
import type { NavItem as OriginalNavItem } from './AppLayout'; // Assuming AppLayout exports NavItem type if needed

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  match?: (pathname: string) => boolean;
};

export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Home, match: (pathname) => pathname === '/' },
  { href: '/new-case', label: 'New Case Submission', icon: FilePlus2 },
  { href: '/appointments', label: 'View Appointments', icon: CalendarDays },
  { href: '/court-orders', label: 'View Court Orders', icon: FileText }, // Updated
  { href: '/reply-to-order', label: 'Reply to Court Order', icon: SendHorizonal }, // Updated
  { href: '/file-complaint', label: 'File a Complaint', icon: ShieldAlert },
  { href: '/track-complaints', label: 'Track Complaints', icon: ListChecks },
  { href: '/track-case', label: 'Case Tracking', icon: Activity },
  { href: '/update-data', label: 'Update Data', icon: UserCog },
];

    