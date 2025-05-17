"use client";
import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import QuestionCard from "@/components/QuestionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AddQuestionMenu } from "@/components/AddQuestionMenu";
import { QuestionTypeSelector } from "@/components/form-builder/question-type-selector";

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

const initialQuestions: Question[] = [
    {
        id: "q1",
        type: "short-answer",
        question: "What is your name?",
        required: true,
        options: [],
    },
    {
        id: "q2",
        type: "multiple-choice",
        question: "How did you hear about us?",
        required: false,
        options: [
            { id: "opt1", value: "Social Media" },
            { id: "opt2", value: "Friend/Colleague" },
            { id: "opt3", value: "Search Engine" },
            { id: "opt4", value: "Other" },
        ],
    },
];

export function QuestionsPanel() {
    const [formDescription, setFormDescription] = useState("");
    const [questions, setQuestions] = useState(initialQuestions);
    const [selectedQuestionId, setSelectedQuestionId] = useState(
        initialQuestions[0].id
    );

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(questions);
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, moved);
        setQuestions(items);
    };

    const addQuestion = (type: string) => {
        const id = `q${Date.now()}`;
        const newQ: Question = {
            id,
            type,
            question: "Untitled Question",
            required: false,
            options: ["multiple-choice", "checkboxes", "dropdown"].includes(
                type
            )
                ? [{ id: `opt${Date.now()}`, value: "Option 1" }]
                : [],
        };
        setQuestions([...questions, newQ]);
        setSelectedQuestionId(id);
    };

    const duplicateQuestion = (id: string) => {
        const idx = questions.findIndex((q) => q.id === id);
        const copy = { ...questions[idx], id: `q${Date.now()}` };
        const arr = [...questions];
        arr.splice(idx + 1, 0, copy);
        setQuestions(arr);
        setSelectedQuestionId(copy.id);
    };

    const deleteQuestion = (id: string) => {
        if (questions.length <= 1) return;
        const arr = questions.filter((q) => q.id !== id);
        setQuestions(arr);
        if (selectedQuestionId === id) setSelectedQuestionId(arr[0].id);
    };

    const updateQuestion = (id: string, data: Partial<Question>) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, ...data } : q))
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <Card>
                    <CardContent className="p-6">
                        <Textarea
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            placeholder="Form Description (optional)"
                            className="resize-none border-none p-0 focus-visible:ring-0 text-lg"
                        />
                    </CardContent>
                </Card>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {questions.map((q, idx) => (
                                    <QuestionCard
                                        key={q.id}
                                        question={q}
                                        index={idx}
                                        isSelected={q.id === selectedQuestionId}
                                        onSelect={setSelectedQuestionId}
                                        onDuplicate={duplicateQuestion}
                                        onDelete={deleteQuestion}
                                        onUpdate={updateQuestion}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <div className="flex justify-center">
                    <AddQuestionMenu addQuestion={addQuestion} />
                </div>
            </div>

            <div className="space-y-4">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">
                            Add Question
                        </h3>
                        <QuestionTypeSelector onSelect={addQuestion} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
