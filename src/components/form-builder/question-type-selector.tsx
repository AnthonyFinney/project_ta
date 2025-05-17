"use client";

import {
    AlignLeft,
    Calendar,
    Check,
    CheckSquare,
    ChevronDown,
    Clock,
    FileUp,
    SlidersHorizontal,
    Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const questionTypes = [
    { id: "short-answer", label: "Short answer", icon: Type },
    { id: "paragraph", label: "Paragraph", icon: AlignLeft },
    { id: "multiple-choice", label: "Multiple choice", icon: Check },
    { id: "checkboxes", label: "Checkboxes", icon: CheckSquare },
    { id: "dropdown", label: "Dropdown", icon: ChevronDown },
    { id: "linear-scale", label: "Linear scale", icon: SlidersHorizontal },
    { id: "date", label: "Date", icon: Calendar },
    { id: "time", label: "Time", icon: Clock },
    { id: "file-upload", label: "File upload", icon: FileUp },
];

interface QuestionTypeSelectorProps {
    onSelect: (type: string) => void;
}

export function QuestionTypeSelector({ onSelect }: QuestionTypeSelectorProps) {
    return (
        <div className="grid grid-cols-1 gap-2">
            {questionTypes.map((type) => (
                <Button
                    key={type.id}
                    variant="outline"
                    className="justify-start h-auto py-2 px-3"
                    onClick={() => onSelect(type.id)}
                >
                    <type.icon className="mr-2 h-4 w-4" />
                    {type.label}
                </Button>
            ))}
        </div>
    );
}
