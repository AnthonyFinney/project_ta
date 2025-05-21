"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditFormPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the form builder page
        // In a real app, you would fetch the form data first
        router.push("/forms/new");
    }, [router]);

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Loading form...</h1>
                </div>
            </div>
            <div className="flex justify-center items-center h-[400px]">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-muted h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-muted rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-muted rounded col-span-2"></div>
                                <div className="h-2 bg-muted rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-muted rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
