import { LayoutDashboardIcon, TrendingUpIcon, ListIcon, LinkIcon, SettingsIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: TrendingUpIcon,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: ListIcon,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LinkIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Revenue Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
