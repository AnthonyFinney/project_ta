"use client";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Grip, Copy, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QuestionEditor } from "@/components/form-builder/question-editor";
import { questionTypes } from "@/constants/questionTypes";

interface Option {
    id: string;
    value: string;
}
interface Question {
    id: string;
    type: string;
    question: string;
    required: boolean;
    options: Option[];
}
interface QuestionCardProps {
    question: Question;
    index: number;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, data: Partial<Question>) => void;
}

export default function QuestionCard({
    question,
    index,
    isSelected,
    onSelect,
    onDuplicate,
    onDelete,
    onUpdate,
}: QuestionCardProps) {
    return (
        <Draggable draggableId={question.id} index={index}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`border ${
                        isSelected ? "border-primary ring-1 ring-primary" : ""
                    }`}
                    onClick={() => onSelect(question.id)}
                >
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div {...provided.dragHandleProps} className="mt-1">
                                <Grip className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="space-y-1">
                                        <Input
                                            value={question.question}
                                            onChange={(e) =>
                                                onUpdate(question.id, {
                                                    question: e.target.value,
                                                })
                                            }
                                            className="text-lg font-medium border-none p-0 focus-visible:ring-0"
                                            placeholder="Question"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            {
                                                questionTypes.find(
                                                    (t) =>
                                                        t.id === question.type
                                                )?.label
                                            }
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDuplicate(question.id);
                                            }}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(question.id);
                                            }}
                                            disabled={false}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <QuestionEditor
                                    question={question}
                                    onChange={(data) =>
                                        onUpdate(question.id, data)
                                    }
                                />
                                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                    <Label
                                        htmlFor={`required-${question.id}`}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`required-${question.id}`}
                                            checked={question.required}
                                            onChange={(e) =>
                                                onUpdate(question.id, {
                                                    required: e.target.checked,
                                                })
                                            }
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        Required
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
}
