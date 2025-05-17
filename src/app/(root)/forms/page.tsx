"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Sample form data for preview
const formData = {
    title: "Customer Feedback Survey",
    description:
        "We value your feedback! Please take a moment to complete this survey about your recent experience with our product.",
    questions: [
        {
            id: "q1",
            type: "short-answer",
            question: "What is your name?",
            required: true,
        },
        {
            id: "q2",
            type: "multiple-choice",
            question: "How would you rate your overall experience?",
            required: true,
            options: [
                { id: "opt1", value: "Excellent" },
                { id: "opt2", value: "Good" },
                { id: "opt3", value: "Average" },
                { id: "opt4", value: "Poor" },
                { id: "opt5", value: "Very Poor" },
            ],
        },
        {
            id: "q3",
            type: "checkboxes",
            question: "Which features did you use? (Select all that apply)",
            required: false,
            options: [
                { id: "opt1", value: "Dashboard" },
                { id: "opt2", value: "Reports" },
                { id: "opt3", value: "User Management" },
                { id: "opt4", value: "Settings" },
                { id: "opt5", value: "API Integration" },
            ],
        },
        {
            id: "q4",
            type: "paragraph",
            question:
                "Do you have any additional comments or suggestions for improvement?",
            required: false,
        },
    ],
};

export default function FormPreviewPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false);

    const currentQuestion = formData.questions[currentQuestionIndex];
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion =
        currentQuestionIndex === formData.questions.length - 1;

    const handleNext = () => {
        if (isLastQuestion) {
            handleSubmit();
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmit = () => {
        console.log("Form responses:", responses);
        setSubmitted(true);
    };

    const updateResponse = (questionId: string, value: any) => {
        setResponses({
            ...responses,
            [questionId]: value,
        });
    };

    const isQuestionAnswered = (questionId: string) => {
        const response = responses[questionId];
        if (response === undefined || response === "") return false;
        if (Array.isArray(response) && response.length === 0) return false;
        return true;
    };

    const canProceed =
        !currentQuestion.required || isQuestionAnswered(currentQuestion.id);

    const renderQuestionInput = () => {
        switch (currentQuestion.type) {
            case "short-answer":
                return (
                    <Input
                        value={responses[currentQuestion.id] || ""}
                        onChange={(e) =>
                            updateResponse(currentQuestion.id, e.target.value)
                        }
                        placeholder="Your answer"
                        className="mt-2"
                    />
                );

            case "paragraph":
                return (
                    <Textarea
                        value={responses[currentQuestion.id] || ""}
                        onChange={(e) =>
                            updateResponse(currentQuestion.id, e.target.value)
                        }
                        placeholder="Your answer"
                        className="mt-2 min-h-[120px]"
                    />
                );

            case "multiple-choice":
                return (
                    <RadioGroup
                        value={responses[currentQuestion.id] || ""}
                        onValueChange={(value) =>
                            updateResponse(currentQuestion.id, value)
                        }
                        className="mt-4 space-y-3"
                    >
                        {currentQuestion.options?.map((option: any) => (
                            <div
                                key={option.id}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={option.id}
                                    id={option.id}
                                />
                                <Label htmlFor={option.id}>
                                    {option.value}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            case "checkboxes":
                return (
                    <div className="mt-4 space-y-3">
                        {currentQuestion.options?.map((option: any) => (
                            <div
                                key={option.id}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={option.id}
                                    checked={(
                                        responses[currentQuestion.id] || []
                                    ).includes(option.id)}
                                    onCheckedChange={(checked) => {
                                        const currentValues =
                                            responses[currentQuestion.id] || [];
                                        if (checked) {
                                            updateResponse(currentQuestion.id, [
                                                ...currentValues,
                                                option.id,
                                            ]);
                                        } else {
                                            updateResponse(
                                                currentQuestion.id,
                                                currentValues.filter(
                                                    (id: string) =>
                                                        id !== option.id
                                                )
                                            );
                                        }
                                    }}
                                />
                                <Label htmlFor={option.id}>
                                    {option.value}
                                </Label>
                            </div>
                        ))}
                    </div>
                );

            default:
                return <p>Unsupported question type</p>;
        }
    };

    if (submitted) {
        return (
            <div className="container w-full mx-auto py-10">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            Thank You!
                        </CardTitle>
                        <CardDescription className="text-center">
                            Your response has been recorded.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                        <p>We appreciate your feedback.</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button asChild variant="outline">
                            <Link href="/">Return to Dashboard</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container w-full mx-auto py-10">
            <div className="flex items-center mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/forms/new">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="ml-4">
                    <h1 className="text-xl font-semibold">Preview Mode</h1>
                    <p className="text-sm text-muted-foreground">
                        Question {currentQuestionIndex + 1} of{" "}
                        {formData.questions.length}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{formData.title}</CardTitle>
                    {currentQuestionIndex === 0 && (
                        <CardDescription>
                            {formData.description}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium">
                                {currentQuestion.question}
                                {currentQuestion.required && (
                                    <span className="text-destructive ml-1">
                                        *
                                    </span>
                                )}
                            </h3>
                            {renderQuestionInput()}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={currentQuestion.required && !canProceed}
                    >
                        {isLastQuestion ? (
                            <>
                                Submit
                                <Send className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
