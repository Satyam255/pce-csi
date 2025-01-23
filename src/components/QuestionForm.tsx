// "use client";

// import { useState } from "react";
// import { useMutation } from "convex/react";
// import { api } from "../../convex/_generated/api";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";
// import { Input } from "./ui/input";

// export default function QuestionForm({ userId, userName }: { userId: string; userName: string }) {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const createQuestion = useMutation(api.questions.createQuestion);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         await createQuestion({ title, content, userId, userName });
//         setTitle("");
//         setContent("");
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//                 placeholder="Question title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//             />
//             <Textarea
//                 placeholder="Describe your question..."
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//             />
//             <Button type="submit">Ask Question</Button>
//         </form>
//     );
// }

"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export default function QuestionForm({ userId, userName }: { userId: string; userName: string }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const createQuestion = useMutation(api.questions.createQuestion);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return alert("Please fill in both fields.");
        await createQuestion({ title, content, userId, userName });
        setTitle("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
                placeholder="Describe your question..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Button type="submit">Ask Question</Button>
        </form>
    );
}
