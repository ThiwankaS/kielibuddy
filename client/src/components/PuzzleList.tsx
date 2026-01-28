import { useState } from 'react';
import type Word from "../types/words";
import PuzzleItem from "./PuzzleItem";
import QuestionModal from './QuestionModal';

/**
 * Props for the PuzzleList component.
 */
interface PuzzleListProps {
    words: Word[];
    onProgress: (id: number, result: boolean) => void;
}

/**
 * Renders the grid of puzzle items and the progress header.
 * Handles the layout responsiveness (grid columns) and progress tracking display.
 */
export default function PuzzleList({ words, onProgress }: PuzzleListProps) {
    const [activeWord, setActiveWord] = useState<Word | null>(null);

    const displayWords = words.slice(0, 20);
    const completedCount = words.filter(w => w.attempted).length;

    const handleWordClick = (word: Word) => {
        if (!word.attempted) {
            setActiveWord(word);
        }
    };

    const handleModalSubmit = (isCorrect: boolean) => {
        if (activeWord) {
            onProgress(activeWord.id, isCorrect);
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                {/* Header Section */}
                <header className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                        <span className="text-blue-600"> Moi, </span>  Welcome back !
                    </h1>
                    <p className="text-slate-500 font-semibold mt-1">
                        Ready for today's Finnish challenge?
                        <span className="ml-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                            {completedCount} / {displayWords.length} Done
                        </span>
                    </p>
                </header>
            </div>

            <div className="flex justify-center px-4 pb-12">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 w-fit">
                    {displayWords.map((word) => (
                        <PuzzleItem
                            key={word.id}
                            word={word}
                            onClick={() => handleWordClick(word)}
                        />
                    ))}
                </div>
            </div>

            {/* Quiz Modal */}
            {activeWord && (
                <QuestionModal
                    word={activeWord}
                    onClose={() => setActiveWord(null)}
                    onSubmit={handleModalSubmit}
                />
            )}
        </>
    )
}