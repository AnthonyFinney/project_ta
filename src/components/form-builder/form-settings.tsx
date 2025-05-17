"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FormSettings() {
    const [settings, setSettings] = useState({
        collectEmail: true,
        limitToOneResponse: false,
        showProgressBar: true,
        shuffleQuestions: false,
        confirmationMessage: "Your response has been recorded.",
        redirectUrl: "",
        theme: "default",
    });

    const updateSetting = (key: string, value: any) => {
        setSettings({
            ...settings,
            [key]: value,
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Response Settings</CardTitle>
                        <CardDescription>
                            Configure how responses are collected and managed
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="collect-email">
                                    Collect email addresses
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Respondents will need to sign in to complete
                                    the form
                                </p>
                            </div>
                            <Switch
                                id="collect-email"
                                checked={settings.collectEmail}
                                onCheckedChange={(checked: any) =>
                                    updateSetting("collectEmail", checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="limit-response">
                                    Limit to one response
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Respondents can only submit once
                                </p>
                            </div>
                            <Switch
                                id="limit-response"
                                checked={settings.limitToOneResponse}
                                onCheckedChange={(checked: any) =>
                                    updateSetting("limitToOneResponse", checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="show-progress">
                                    Show progress bar
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Show completion progress to respondents
                                </p>
                            </div>
                            <Switch
                                id="show-progress"
                                checked={settings.showProgressBar}
                                onCheckedChange={(checked: any) =>
                                    updateSetting("showProgressBar", checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="shuffle-questions">
                                    Shuffle question order
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Questions will appear in random order
                                </p>
                            </div>
                            <Switch
                                id="shuffle-questions"
                                checked={settings.shuffleQuestions}
                                onCheckedChange={(checked: any) =>
                                    updateSetting("shuffleQuestions", checked)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Confirmation</CardTitle>
                        <CardDescription>
                            What respondents see after submitting the form
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs defaultValue="message">
                            <TabsList>
                                <TabsTrigger value="message">
                                    Show message
                                </TabsTrigger>
                                <TabsTrigger value="redirect">
                                    Redirect
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="message" className="pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="confirmation-message">
                                        Confirmation message
                                    </Label>
                                    <Textarea
                                        id="confirmation-message"
                                        value={settings.confirmationMessage}
                                        onChange={(e) =>
                                            updateSetting(
                                                "confirmationMessage",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Thank you for your response!"
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="redirect" className="pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="redirect-url">
                                        Redirect URL
                                    </Label>
                                    <Input
                                        id="redirect-url"
                                        value={settings.redirectUrl}
                                        onChange={(e) =>
                                            updateSetting(
                                                "redirectUrl",
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://example.com/thank-you"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>
                            Customize how your form looks
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select
                                value={settings.theme}
                                onValueChange={(value) =>
                                    updateSetting("theme", value)
                                }
                            >
                                <SelectTrigger id="theme">
                                    <SelectValue placeholder="Select a theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">
                                        Default
                                    </SelectItem>
                                    <SelectItem value="minimal">
                                        Minimal
                                    </SelectItem>
                                    <SelectItem value="colorful">
                                        Colorful
                                    </SelectItem>
                                    <SelectItem value="professional">
                                        Professional
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sharing</CardTitle>
                        <CardDescription>
                            Control who can access your form
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="visibility">Visibility</Label>
                            <Select defaultValue="public">
                                <SelectTrigger id="visibility">
                                    <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">
                                        Public - Anyone with the link
                                    </SelectItem>
                                    <SelectItem value="restricted">
                                        Restricted - Only specific people
                                    </SelectItem>
                                    <SelectItem value="organization">
                                        Organization - Anyone in your
                                        organization
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
