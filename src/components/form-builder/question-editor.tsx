"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface QuestionEditorProps {
    question: any;
    onChange: (data: any) => void;
}

export function QuestionEditor({ question, onChange }: QuestionEditorProps) {
    const [newOption, setNewOption] = useState("");

    const addOption = () => {
        if (!newOption.trim()) return;

        const newOptions = [
            ...question.options,
            { id: `opt${Date.now()}`, value: newOption },
        ];

        onChange({ options: newOptions });
        setNewOption("");
    };

    const updateOption = (id: string, value: string) => {
        const newOptions = question.options.map((opt: any) =>
            opt.id === id ? { ...opt, value } : opt
        );

        onChange({ options: newOptions });
    };

    const removeOption = (id: string) => {
        const newOptions = question.options.filter((opt: any) => opt.id !== id);
        onChange({ options: newOptions });
    };

    const renderQuestionTypeEditor = () => {
        switch (question.type) {
            case "short-answer":
                return (
                    <Input
                        disabled
                        placeholder="Short answer text"
                        className="bg-muted/50 mt-2"
                    />
                );

            case "paragraph":
                return (
                    <Textarea
                        disabled
                        placeholder="Long answer text"
                        className="bg-muted/50 mt-2 resize-none"
                    />
                );

            case "multiple-choice":
                return (
                    <div className="space-y-4 mt-4">
                        <RadioGroup disabled>
                            {question.options.map((option: any) => (
                                <div
                                    key={option.id}
                                    className="flex items-center gap-2"
                                >
                                    <RadioGroupItem
                                        value={option.id}
                                        id={option.id}
                                    />
                                    <div className="flex-1 flex items-center gap-2">
                                        <Input
                                            value={option.value}
                                            onChange={(e) =>
                                                updateOption(
                                                    option.id,
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                removeOption(option.id)
                                            }
                                            disabled={
                                                question.options.length <= 1
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </RadioGroup>

                        <div className="flex items-center gap-2">
                            <div className="w-5" />
                            <div className="flex-1 flex items-center gap-2">
                                <Input
                                    value={newOption}
                                    onChange={(e) =>
                                        setNewOption(e.target.value)
                                    }
                                    placeholder="Add option"
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && addOption()
                                    }
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={addOption}
                                    disabled={!newOption.trim()}
                                >
                                    <PlusCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case "checkboxes":
                return (
                    <div className="space-y-4 mt-4">
                        {question.options.map((option: any) => (
                            <div
                                key={option.id}
                                className="flex items-center gap-2"
                            >
                                <Checkbox id={option.id} disabled />
                                <div className="flex-1 flex items-center gap-2">
                                    <Input
                                        value={option.value}
                                        onChange={(e) =>
                                            updateOption(
                                                option.id,
                                                e.target.value
                                            )
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeOption(option.id)}
                                        disabled={question.options.length <= 1}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center gap-2">
                            <div className="w-5" />
                            <div className="flex-1 flex items-center gap-2">
                                <Input
                                    value={newOption}
                                    onChange={(e) =>
                                        setNewOption(e.target.value)
                                    }
                                    placeholder="Add option"
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && addOption()
                                    }
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={addOption}
                                    disabled={!newOption.trim()}
                                >
                                    <PlusCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case "dropdown":
                return (
                    <div className="space-y-4 mt-4">
                        <Select disabled>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {question.options.map((option: any) => (
                                    <SelectItem
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="space-y-2">
                            <Label>Options</Label>
                            {question.options.map((option: any) => (
                                <div
                                    key={option.id}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        value={option.value}
                                        onChange={(e) =>
                                            updateOption(
                                                option.id,
                                                e.target.value
                                            )
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeOption(option.id)}
                                        disabled={question.options.length <= 1}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}

                            <div className="flex items-center gap-2">
                                <Input
                                    value={newOption}
                                    onChange={(e) =>
                                        setNewOption(e.target.value)
                                    }
                                    placeholder="Add option"
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && addOption()
                                    }
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={addOption}
                                    disabled={!newOption.trim()}
                                >
                                    <PlusCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case "linear-scale":
                return (
                    <div className="space-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <div className="text-center">
                                <Label>Min</Label>
                                <Select
                                    value={question.minValue?.toString() || "0"}
                                    onValueChange={(value: string) =>
                                        onChange({
                                            minValue: Number.parseInt(value),
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">0</SelectItem>
                                        <SelectItem value="1">1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1 px-4">
                                <RadioGroup
                                    value={String(question.selectedValue ?? "")}
                                    onValueChange={(val) =>
                                        onChange({
                                            selectedValue: Number.parseInt(val),
                                        })
                                    }
                                    orientation="horizontal"
                                >
                                    <div className="flex justify-between">
                                        {Array.from({
                                            length:
                                                (question.maxValue || 5) -
                                                (question.minValue || 0) +
                                                1,
                                        }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col items-center"
                                            >
                                                <RadioGroupItem
                                                    value={`${i}`}
                                                    disabled
                                                />
                                                <span className="text-xs mt-1">
                                                    {(question.minValue || 0) +
                                                        i}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="text-center">
                                <Label>Max</Label>
                                <Select
                                    value={question.maxValue?.toString() || "5"}
                                    onValueChange={(value: string) =>
                                        onChange({
                                            maxValue: Number.parseInt(value),
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 10 }).map(
                                            (_, i) => (
                                                <SelectItem
                                                    key={i}
                                                    value={(i + 2).toString()}
                                                >
                                                    {i + 2}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Low label (optional)</Label>
                                <Input
                                    value={question.lowLabel || ""}
                                    onChange={(e) =>
                                        onChange({ lowLabel: e.target.value })
                                    }
                                    placeholder="e.g., Not satisfied"
                                />
                            </div>
                            <div>
                                <Label>High label (optional)</Label>
                                <Input
                                    value={question.highLabel || ""}
                                    onChange={(e) =>
                                        onChange({ highLabel: e.target.value })
                                    }
                                    placeholder="e.g., Very satisfied"
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{renderQuestionTypeEditor()}</div>;
}
