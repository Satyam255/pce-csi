"use client";

import { useState } from "react";

export default function FaqsFooter() {
    const faqs = [
        { question: "What is this platform about?", answer: "A space for users to connect, ask questions, and share knowledge." },
        { question: "Is this platform free?", answer: "Yes, it's completely free for all users." },
        { question: "How do I contact support?", answer: "Reach out via our Contact Us page or email us directly." },
        { question: "Can I delete my account?", answer: "Yes, you can delete your account in the account settings." },
        { question: "How do I ask a question?", answer: "Visit the Q&A Forum page and submit your question via the form." },
        { question: "Is my data secure?", answer: "We prioritize user data security and adhere to best practices." },
        { question: "Can I contribute to this platform?", answer: "Yes, we're open to contributions. Contact us to learn more." },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const handlePrev = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === 0 ? faqs.length - 1 : prev - 1));
            setFade(false);
        }, 300); // Match the fade-out duration
    };

    const handleNext = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === faqs.length - 1 ? 0 : prev + 1));
            setFade(false);
        }, 300); // Match the fade-out duration
    };

    return (
        <div className="bg-card py-8 px-4 border-t border-border">
            <h2 className="text-xl font-bold text-primary text-center mb-6">
                FAQS
            </h2>
            <div className="relative flex items-center justify-center">
                <button
                    onClick={handlePrev}
                    className="absolute left-0 p-2 bg-muted rounded-full shadow hover:bg-muted/80 transition-all duration-300 top-1/2 transform -translate-y-1/2"
                >
                    ←
                </button>
                <div
                    className={`w-full max-w-3xl px-8 transition-all duration-500 ease-in-out ${
                        fade ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <div className="text-center p-6 bg-muted rounded-md shadow-sm transition-all duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">
                            {faqs[currentIndex].question}
                        </h3>
                        <p className="text-base text-muted-foreground">
                            {faqs[currentIndex].answer}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleNext}
                    className="absolute right-0 p-2 bg-muted rounded-full shadow hover:bg-muted/80 transition-all duration-300 top-1/2 transform -translate-y-1/2"
                >
                    →
                </button>
            </div>
            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                    Still have questions? 
                </p>
                <a
                    href="mailto:ogfortnite3004@gmail.com"
                    className="text-sm font-medium text-primary hover:underline transition-all duration-300"
                >
                    Mail Us
                </a>
            </div>
        </div>
    );
}