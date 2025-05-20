"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormInput, Home, Settings } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(`${path}/`);
    };

    return (
        <Sidebar>
            <SidebarHeader className="flex items-center justify-between mb-4 mt-2">
                <Link href="/" className="flex items-center gap-2 px-2">
                    <FormInput className="h-6 w-6" />
                    <span className="font-bold">FormBuilder</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/")}>
                            <Link href="/">
                                <Home className="h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive("/settings")}
                        >
                            <Link href="/settings">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
