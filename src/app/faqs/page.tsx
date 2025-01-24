"use client";

export default function FaqsPage() {
    const faqs = [
        {
            question: "What is this platform about?",
            answer: "This platform is a space for users to interact, ask questions, and share knowledge.",
        },
        {
            question: "How do I ask a question?",
            answer: "You can go to the Q&A Forum page and submit your question using the form provided.",
        },
        {
            question: "Is there a cost to use this platform?",
            answer: "No, this platform is completely free to use for all users.",
        },
        {
            question: "How do I contact support?",
            answer: "You can reach out to our support team via the Contact Us page available in the navigation menu.",
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can delete your account by going to your account settings and following the instructions.",
        },
    ];

    return (
        <div className="container max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-primary mb-10 text-center text-balance">
                Frequently Asked Questions
            </h1>
            <div className="space-y-8">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-lg shadow-lg bg-card border border-border hover:bg-accent hover:border-muted transition duration-300"
                    >
                        <h2 className="text-2xl font-semibold text-card-foreground mb-3">
                            {faq.question}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
            {/* "Mail Us" Section */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">Still have questions?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                    If your question isn't answered above, feel free to reach out to us directly.
                </p>
                <a
                    href="mailto:ogfortnite3004@gmail.com"
                    className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg shadow hover:bg-primary/80 transition duration-300"
                >
                    Mail Us
                </a>
            </div>
        </div>
    );
}