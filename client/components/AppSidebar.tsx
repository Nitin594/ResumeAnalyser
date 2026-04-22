"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Upload,
  Briefcase,
  FileText,
  User2,
  ChevronUp,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";


const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload Resume", href: "/upload", icon: Upload },
  { name: "Job Matcher", href: "/job-matcher", icon: Briefcase },
  { name: "Resume", href: "/resume/1", icon: FileText },
];

const user = {
  name: "Jane Doe",
  email: "jane@example.com",
  avatarUrl: "",
};

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="h-16 flex flex-row items-center px-2 border-b">
        <SidebarMenuButton asChild>
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-sm"
          >
            <Home className="h-5 w-5" />
            ResumeAI
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer with username */}
      {/* <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-xs">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </SidebarFooter> */}

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
                <SidebarMenuSubButton>
                  <User2/> John Doe <LogOut/>
                </SidebarMenuSubButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
