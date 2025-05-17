"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, Menu, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileNav() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    if (!isMobile) return null;

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(`${path}/`);
    };

    return (
        <>
            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
                <div className="grid h-full grid-cols-5">
                    <Link
                        href="/"
                        className={cn(
                            "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                            isActive("/") && "text-primary"
                        )}
                    >
                        <Home className="w-5 h-5" />
                        <span className="text-xs mt-1">Home</span>
                    </Link>
                    <Link
                        href="/forms"
                        className={cn(
                            "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                            isActive("/forms") && "text-primary"
                        )}
                    >
                        <FileText className="w-5 h-5" />
                        <span className="text-xs mt-1">Forms</span>
                    </Link>
                    <Link
                        href="/forms/new"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted"
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full">
                            <Plus className="w-5 h-5" />
                        </div>
                    </Link>
                    <Link
                        href="/analytics"
                        className={cn(
                            "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                            isActive("/analytics") && "text-primary"
                        )}
                    >
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-xs mt-1">Analytics</span>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-full w-full flex flex-col items-center justify-center rounded-none"
                            >
                                <Menu className="w-5 h-5" />
                                <span className="text-xs mt-1">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-0">
                            <SheetHeader className="px-4 pt-4">
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <MobileMenu />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Add padding to the bottom of the page on mobile to account for the navigation bar */}
            <div className="pb-16 md:pb-0" />
        </>
    );
}

function MobileMenu() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(`${path}/`);
    };

    const menuItems = [
        { href: "/", label: "Dashboard", icon: Home },
        { href: "/forms", label: "My Forms", icon: FileText },
        { href: "/templates", label: "Templates", icon: FileText },
        { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ];

    return (
        <div className="py-4">
            <div className="px-4 mb-4">
                <h2 className="text-lg font-semibold">FormBuilder</h2>
            </div>
            <nav className="space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center px-4 py-3 text-sm hover:bg-muted",
                            isActive(item.href) && "bg-muted font-medium"
                        )}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
