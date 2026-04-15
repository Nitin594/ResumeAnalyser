import type { ReactNode } from "react";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="w-full flex-1 overflow-y-auto p-6">
            {children}
          </main>
          <Toaster/>
        </div>
      </div>
    </SidebarProvider>
  );
}
