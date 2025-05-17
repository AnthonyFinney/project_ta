"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Save } from "lucide-react";

interface FormHeaderProps {
    formTitle: string;
    setFormTitle: (title: string) => void;
    onSave: () => void;
    onPreview: () => void;
}

export function FormHeader({
    formTitle,
    setFormTitle,
    onSave,
    onPreview,
}: FormHeaderProps) {
    return (
        <header className="w-full">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Input
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="h-auto text-xl font-semibold border-none bg-transparent px-0 focus-visible:ring-0"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={onPreview}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                    <Button size="sm" onClick={onSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                </div>
            </div>
        </header>
    );
}
