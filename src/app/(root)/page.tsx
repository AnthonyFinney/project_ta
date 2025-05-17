import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TypeIcon as FormIcon, PlusIcon } from "lucide-react";

export default function Home() {
    return (
        <div className="container w-full mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button asChild>
                    <Link href="/forms/new">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        New Form
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <Card className="w-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                        <CardTitle>Customer Feedback</CardTitle>
                        <CardDescription>
                            Created 3 days ago • 24 responses
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <p>
                            Collect feedback from customers about our new
                            product launch.
                        </p>
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/forms/1/edit">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/forms/1/responses">Responses</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="w-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                        <CardTitle>Event Registration</CardTitle>
                        <CardDescription>
                            Created 1 week ago • 56 responses
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <p>
                            Registration form for the annual company conference.
                        </p>
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/forms/2/edit">Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/forms/2/responses">Responses</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="w-full border-dashed hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center p-6 text-center">
                    <FormIcon className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">
                        Create a new form
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Start from scratch or use a template
                    </p>
                    <Button asChild>
                        <Link href="/forms/new">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            New Form
                        </Link>
                    </Button>
                </Card>
            </div>
        </div>
    );
}
