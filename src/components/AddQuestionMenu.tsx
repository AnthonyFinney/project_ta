"use client";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import { questionTypes } from "@/constants/questionTypes";

interface AddQuestionMenuProps {
    addQuestion: (type: string) => void;
}

export function AddQuestionMenu({ addQuestion }: AddQuestionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
                {questionTypes.map((type) => (
                    <DropdownMenuItem
                        key={type.id}
                        onClick={() => addQuestion(type.id)}
                    >
                        {type.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
