import type Word from "../types/words";

/**
 * Props for the PuzzleItem component.
 */
interface PuzzleItemProps {
    word: Word;
    onClick: () => void;
}

/**
 * Renders a single interactive puzzle item (word button).
 * Changes color based on result (Green=Correct, Red=Incorrect, Amber=Pending).
 */
export default function PuzzleItem({ word, onClick }: PuzzleItemProps) {

    // Determine background color based on status
    let bgColor = "bg-amber-400 hover:bg-amber-500 shadow-[0_4px_0_rgb(180,130,0)] active:shadow-none";

    if (word.attempted) {
        bgColor = word.result
            ? "bg-green-500 shadow-[0_4px_0_rgb(21,128,61)]"
            : "bg-red-500 shadow-[0_4px_0_rgb(185,28,28)]";
    }

    return (
        <button
            onClick={onClick}
            disabled={word.attempted}
            className={`
                ${bgColor}
                w-16 h-16 md:w-20 md:h-20
                rounded-xl
                flex items-center justify-center
                transition-all
                active:translate-y-1
                active:shadow-none
                disabled:shadow-none
            `}
            data-cy={`puzzle-item-${word.id}`}
        >
        </button>
    )
}