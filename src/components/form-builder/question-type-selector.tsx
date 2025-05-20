"use client";
import { Button } from "@/components/ui/button";
import { questionTypes } from "@/constants/questionTypes";

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
