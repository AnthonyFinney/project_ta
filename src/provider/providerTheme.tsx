"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

export function ProviderTheme({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme={true}
            enableSystem={true}
        >
            {children}
        </ThemeProvider>
    );
}
