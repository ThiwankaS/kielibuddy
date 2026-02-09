import { useState, useEffect } from "react"
import type Word from "../types/words";

export default function useWords() {
    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                setLoading(true);
                // Updated URL as requested
                const response = await fetch("https://vocabular-app.fly.dev/api/questions/20");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Word[] = await response.json();

                const formattedWords = data.map((item) => ({
                    ...item,
                    result: null,    // Initial result state
                    attempted: false // Initial attempted state
                }));

                setWords(formattedWords);

            } catch (error: unknown) {
                console.error("Failed to fetch words:", error);
                let errorMessage = "An unknown error occurred";
                if (error instanceof Error) {
                    errorMessage = error.message;
                } else if (typeof error === "string") {
                    errorMessage = error;
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchWords(); // Actually call the function
    }, []); // Empty dependency array to run only once

    function updateProgress(id: string, result: boolean) {
        const updatedWords = words.map((word) =>
            word.id === id ? { ...word, result: result, attempted: true } : word
        );
        setWords(updatedWords);
    }

    return {
        words,
        loading,
        error,
        updateProgress
    }
}