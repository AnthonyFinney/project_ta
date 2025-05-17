"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FormHeader } from "@/components/FormHeader";
import { QuestionsPanel } from "@/components/QuestionsPanel";
import { FormSettings } from "@/components/form-builder/form-settings";

export default function NewFormPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"questions" | "settings">(
        "questions"
    );
    const [formTitle, setFormTitle] = useState("Untitled Form");

    const handleSave = () => {
        // save logic...
        router.push("/");
    };

    const handlePreview = () => {
        router.push("/forms/preview");
    };

    return (
        <div className="container w-full mx-auto py-10">
            <div className="flex flex-col min-h-screen">
                <FormHeader
                    formTitle={formTitle}
                    setFormTitle={setFormTitle}
                    onSave={handleSave}
                    onPreview={handlePreview}
                />
                <div className="flex-1 py-6 px-4">
                    <Tabs
                        value={activeTab}
                        onValueChange={(val: string) =>
                            setActiveTab(val as "questions" | "settings")
                        }
                        className="w-full"
                    >
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="questions">
                                Questions
                            </TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="questions" className="mt-6">
                            <QuestionsPanel />
                        </TabsContent>
                        <TabsContent value="settings">
                            <FormSettings />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
