// import QuestionForm from "@/components/QuestionForm";
// import QuestionList from "@/components/QuestionList";
// import { api } from "../../convex/_generated/api";


// export default function QAPage() {
//     return (
//         <div className="container max-w-4xl mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">Q&A Forum</h1>
//             <div className="mb-8">
//                 <QuestionForm userId="user123" userName="Anonymous" />
//             </div>
//             <QuestionList userId="user123" />
//         </div>
//     );
// }

// import QuestionForm from "@/components/QuestionForm";
// import QuestionList from "@/components/QuestionList";
// import { useUserRole } from "@/hooks/useUserRole"; // Assuming you're using Clerk.js
// import { useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";

// export default function QAPage() {
//     const { user } = useUserRole(); // Fetch the logged-in user's data

//     // Use Clerk's ID to fetch user details from your database
//     const dbUser = useQuery(api.users.getUserByClerkId, { clerkId: user?.id });

//     if (!dbUser) {
//         return <p>Loading user information...</p>;
//     }

//     return (
//         <div className="container max-w-4xl mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">Q&A Forum</h1>
//             <div className="mb-8">
//                 <QuestionForm userId={dbUser.clerkId} userName={dbUser.name} />
//             </div>
//             <QuestionList userId={dbUser.clerkId} />
//         </div>
//     );
// }

// "use client";

// import QuestionForm from "@/components/QuestionForm";
// import QuestionList from "@/components/QuestionList";
// import { useUser } from "@clerk/nextjs"; // Assuming you're using Clerk.js
// import { useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";

// export default function QAPage() {
//     const { user } = useUser(); // Fetch the logged-in user's data

//     if (!user) {
//         return <p>Loading user information...</p>; // Handle loading state for user
//     }

//     // Use Clerk's ID to fetch user details from your database
//     const { data: dbUser, error } = useQuery(api.users.getUserByClerkId, { clerkId: user.id });

//     if (error) {
//         return <p>Error loading user data: {error.message}</p>; // Handle errors
//     }

//     if (!dbUser) {
//         return <p>No user found in the database.</p>; // Handle case when no user is found
//     }

//     return (
//         <div className="container max-w-4xl mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">Q&A Forum</h1>
//             <div className="mb-8">
//                 <QuestionForm userId={dbUser.clerkId} userName={dbUser.name} />
//             </div>
//             <QuestionList userId={dbUser.clerkId} />
//         </div>
//     );
// }


"use client";

import QuestionForm from "@/components/QuestionForm";
import QuestionList from "@/components/QuestionList";
import { useUser } from "@clerk/nextjs"; // Clerk for authentication

export default function QAPage() {
    const { user, isLoaded } = useUser(); // Fetch the logged-in user's data

    // Wait for Clerk's user data to load
    if (!isLoaded) {
        return <p>Loading user information...</p>;
    }

    // Ensure the user is logged in
    if (!user) {
        return <p>You must be logged in to ask questions.</p>;
    }

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Q&A Forum</h1>
            <p className="text-lg mb-6">Welcome, {user.firstName || user.fullName || "User"}!</p>
            <div className="mb-8">
                {/* Pass user information to QuestionForm */}
                <QuestionForm userId={user.id} userName={user.firstName || user.fullName || "Anonymous"} />
            </div>
            {/* Display list of questions */}
            <QuestionList userId={user.id} />
        </div>
    );
}

