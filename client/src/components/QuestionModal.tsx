import { useState } from 'react';
import type Word from '../types/words';

interface QuestionModalProps {
    word: Word;
    onClose: () => void;
    onSubmit: (isCorrect: boolean) => void;
}

export default function QuestionModal({ word, onClose, onSubmit }: QuestionModalProps) {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = () => {
        if (!selectedOption) {
            setError('Please select an option.');
            return;
        }

        // Compare selected option with the correct answer (case-insensitive trim)
        const isCorrect = selectedOption.trim().toLowerCase() === word.answere.trim().toLowerCase();

        onSubmit(isCorrect);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
                    Select the correct answer
                </h2>
                <p className="text-center text-slate-500 mb-8 font-medium text-xl">
                    What is the Finnish word <span className="text-blue-600 font-bold">"{word.word}"</span> in English?
                </p>

                <div className="space-y-3 mb-8">
                    {word.options.map((option, index) => (
                        <label
                            key={index}
                            className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all
                                ${selectedOption === option
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                                }
                            `}
                        >
                            <input
                                type="radio"
                                name="options"
                                value={option}
                                checked={selectedOption === option}
                                onChange={(e) => {
                                    setSelectedOption(e.target.value);
                                    setError('');
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 shrink-0"
                            />
                            <span className="ml-3 font-semibold text-sm break-all">{option}</span>
                        </label>
                    ))}
                </div>

                {error && (
                    <p className="text-red-500 text-sm font-medium text-center mb-4 animate-bounce">
                        {error}
                    </p>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-full font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
