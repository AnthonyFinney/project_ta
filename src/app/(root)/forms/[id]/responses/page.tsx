"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

type AnswerValue = string | string[];

interface Response {
    id: string;
    submittedAt: string;
    // allow any string key, with value either a string or string[]
    answers: Record<string, AnswerValue>;
}

interface Question {
    id: string;
    type: "short-answer" | "multiple-choice" | "checkboxes" | "paragraph";
    question: string;
    required: boolean;
    options?: { id: string; value: string }[];
}

interface Form {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    responses: Response[];
    questions: Question[];
}

// Sample data for the responses page
const formData: Form = {
    id: "1",
    title: "Customer Feedback Survey",
    description: "Feedback about our product",
    createdAt: "2023-05-10T12:00:00Z",
    responses: [
        {
            id: "r1",
            submittedAt: "2023-05-12T14:30:00Z",
            answers: {
                q1: "John Smith",
                q2: "opt1", // Excellent
                q3: ["opt1", "opt3"], // Dashboard, User Management
                q4: "The dashboard is great, but I'd like to see more customization options.",
            },
        },
        {
            id: "r2",
            submittedAt: "2023-05-13T09:15:00Z",
            answers: {
                q1: "Jane Doe",
                q2: "opt2", // Good
                q3: ["opt2", "opt4", "opt5"], // Reports, Settings, API Integration
                q4: "I love the reporting features. Very intuitive!",
            },
        },
        {
            id: "r3",
            submittedAt: "2023-05-14T16:45:00Z",
            answers: {
                q1: "Robert Johnson",
                q2: "opt3", // Average
                q3: ["opt1", "opt2"], // Dashboard, Reports
                q4: "The UI could use some improvements for better usability.",
            },
        },
        {
            id: "r4",
            submittedAt: "2023-05-15T11:20:00Z",
            answers: {
                q1: "Emily Williams",
                q2: "opt1", // Excellent
                q3: ["opt1", "opt3", "opt4"], // Dashboard, User Management, Settings
                q4: "Overall excellent experience. Keep up the good work!",
            },
        },
        {
            id: "r5",
            submittedAt: "2023-05-16T13:10:00Z",
            answers: {
                q1: "Michael Brown",
                q2: "opt2", // Good
                q3: ["opt5"], // API Integration
                q4: "The API documentation could be more comprehensive.",
            },
        },
    ],
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

// Prepare chart data
const ratingData = [
    { name: "Excellent", value: 2 },
    { name: "Good", value: 2 },
    { name: "Average", value: 1 },
    { name: "Poor", value: 0 },
    { name: "Very Poor", value: 0 },
];

const featureData = [
    { name: "Dashboard", value: 3 },
    { name: "Reports", value: 2 },
    { name: "User Management", value: 2 },
    { name: "Settings", value: 2 },
    { name: "API Integration", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function ResponsesPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("summary");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    const getOptionLabel = (questionId: string, optionId: string) => {
        const question = formData.questions.find((q) => q.id === questionId);
        if (!question || !question.options) return optionId;

        const option = question.options.find((opt) => opt.id === optionId);
        return option ? option.value : optionId;
    };

    const renderResponseValue = (questionId: string, value: any) => {
        const question = formData.questions.find((q) => q.id === questionId);
        if (!question) return String(value);

        switch (question.type) {
            case "multiple-choice":
                return getOptionLabel(questionId, value);

            case "checkboxes":
                return Array.isArray(value)
                    ? value.map((v) => getOptionLabel(questionId, v)).join(", ")
                    : String(value);

            default:
                return String(value);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4 md:px-6 py-10">
            <div className="flex items-center mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="ml-4">
                    <h1 className="text-2xl font-bold">{formData.title}</h1>
                    <p className="text-muted-foreground">
                        {formData.responses.length} responses
                    </p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-6">
                    <TabsList>
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="individual">Individual</TabsTrigger>
                        <TabsTrigger value="questions">Question</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    All responses
                                </DropdownMenuItem>
                                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Last 30 days
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                <TabsContent value="summary">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overall Rating</CardTitle>
                                <CardDescription>
                                    How respondents rated their experience
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={ratingData}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar
                                                dataKey="value"
                                                fill="#8884d8"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Features Used</CardTitle>
                                <CardDescription>
                                    Most commonly used features
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={featureData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                label={({ name, percent }) =>
                                                    `${name}: ${(
                                                        percent * 100
                                                    ).toFixed(0)}%`
                                                }
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {featureData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Comments</CardTitle>
                                <CardDescription>
                                    Recent feedback and suggestions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {formData.responses.map((response) => (
                                        <div
                                            key={response.id}
                                            className="border-b pb-4 last:border-0"
                                        >
                                            <p className="font-medium">
                                                {response.answers.q1}
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {formatDate(
                                                    response.submittedAt
                                                )}
                                            </p>
                                            <p>{response.answers.q4}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="individual">
                    <Card>
                        <CardHeader>
                            <CardTitle>Individual Responses</CardTitle>
                            <CardDescription>
                                View all responses in detail
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Respondent</TableHead>
                                        <TableHead>Submitted</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Features Used</TableHead>
                                        <TableHead className="w-[300px]">
                                            Comments
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {formData.responses.map((response) => (
                                        <TableRow key={response.id}>
                                            <TableCell className="font-medium">
                                                {response.answers.q1}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(
                                                    response.submittedAt
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {renderResponseValue(
                                                    "q2",
                                                    response.answers.q2
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {renderResponseValue(
                                                    "q3",
                                                    response.answers.q3
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-[300px] truncate">
                                                {response.answers.q4}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="questions">
                    <div className="space-y-6">
                        {formData.questions.map((question) => (
                            <Card key={question.id}>
                                <CardHeader>
                                    <CardTitle>{question.question}</CardTitle>
                                    <CardDescription>
                                        {question.type === "multiple-choice" ||
                                        question.type === "checkboxes"
                                            ? "Multiple choice question"
                                            : question.type === "short-answer"
                                            ? "Short answer question"
                                            : "Paragraph question"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {(question.type === "multiple-choice" ||
                                        question.type === "checkboxes") &&
                                    question.options ? (
                                        <div className="h-64">
                                            <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                            >
                                                <BarChart
                                                    data={question.options.map(
                                                        (opt) => ({
                                                            name: opt.value,
                                                            value: formData.responses.filter(
                                                                (r) =>
                                                                    question.type ===
                                                                    "multiple-choice"
                                                                        ? r
                                                                              .answers[
                                                                              question
                                                                                  .id
                                                                          ] ===
                                                                          opt.id
                                                                        : Array.isArray(
                                                                              r
                                                                                  .answers[
                                                                                  question
                                                                                      .id
                                                                              ]
                                                                          ) &&
                                                                          r.answers[
                                                                              question
                                                                                  .id
                                                                          ].includes(
                                                                              opt.id
                                                                          )
                                                            ).length,
                                                        })
                                                    )}
                                                    margin={{
                                                        top: 20,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar
                                                        dataKey="value"
                                                        fill="#8884d8"
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {formData.responses.map(
                                                (response) => (
                                                    <div
                                                        key={response.id}
                                                        className="border-b pb-4 last:border-0"
                                                    >
                                                        <p className="font-medium">
                                                            {
                                                                response.answers
                                                                    .q1
                                                            }
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {formatDate(
                                                                response.submittedAt
                                                            )}
                                                        </p>
                                                        <p>
                                                            {
                                                                response
                                                                    .answers[
                                                                    question.id
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
