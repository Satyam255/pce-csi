
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ThumbsUp } from "lucide-react";

export default function QuestionList({ userId }: { userId: string }) {
    const questions = useQuery(api.questions.getQuestions);
    const voteQuestion = useMutation(api.questions.voteQuestion);

    if (!questions) return <div>Loading...</div>;

    return (
        <div className="space-y-4">
            {questions.map((question) => (
                <Card key={question._id}>
                    <CardHeader>
                        <CardTitle>{question.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                            Asked by {question.userName}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{question.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => voteQuestion({ questionId: question._id, userId })}
                        >
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            {question.votes}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
