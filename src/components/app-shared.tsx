import type { ReactNode } from "react";
import { 
  LayoutGridIcon, 
  LayersIcon, 
  PlusCircleIcon, 
  UsersIcon, 
  BadgeCheckIcon, 
  BookOpenIcon, 
  FileTextIcon,
  SettingsIcon, 
  CreditCardIcon, 
  HelpCircleIcon 
} from "lucide-react";

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	isActive?: boolean;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label?: string;
	items: SidebarNavItem[];
};

export const adminNavGroups: SidebarNavGroup[] = [
	{
		label: "Management",
		items: [
			{
				title: "Console",
				path: "/admin/dashboard",
				icon: <LayoutGridIcon />,
			},
			{
				title: "All Tests",
				path: "/admin/tests",
				icon: <LayersIcon />,
			},
			{
				title: "Create Test",
				path: "/admin/create-test",
				icon: <PlusCircleIcon />,
			},
			{
				title: "Students",
				path: "/admin/students",
				icon: <UsersIcon />,
			},
			{
				title: "Results",
				path: "/admin/results",
				icon: <BadgeCheckIcon />,
			},
		],
	},
];

export const studentNavGroups: SidebarNavGroup[] = [
	{
		label: "Learning",
		items: [
			{
				title: "Dashboard",
				path: "/student/dashboard",
				icon: <LayoutGridIcon />,
			},
			{
				title: "Available Tests",
				path: "/student/practice",
				icon: <BookOpenIcon />,
			},
			{
				title: "My Results",
				path: "/student/results",
				icon: <FileTextIcon />,
			},
		],
	},
];

export const footerNavLinks: SidebarNavItem[] = [
	{
		title: "Help Center",
		path: "#/help",
		icon: <HelpCircleIcon />,
	},
];

// Default exports for backward compatibility if needed
export const navGroups = studentNavGroups;
export const navLinks: SidebarNavItem[] = [
	...navGroups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item]
		)
	),
	...footerNavLinks,
];
