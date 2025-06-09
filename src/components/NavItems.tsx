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
  Download,
} from 'lucide-react';

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
  { href: '/decisions', label: 'View Decisions', icon: FileText },
  { href: '/case-return', label: 'Send Case Return', icon: SendHorizonal },
  { href: '/file-complaint', label: 'File a Complaint', icon: ShieldAlert },
  { href: '/track-complaints', label: 'Track Complaints', icon: ListChecks },
  { href: '/track-case', label: 'Case Tracking', icon: Activity },
  { href: '/update-data', label: 'Update Data', icon: UserCog },
];
