import useWords from '../hooks/useWords';
import PuzzleList from './PuzzleList'
import Footer from './Footer';

/**
 * Puzzle component acting as the container for the vocabulary game.
 * Manages the word list state and progress updates.
 */
export default function Puzzle() {

    const { words, updateProgress } = useWords();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="grow">
                <PuzzleList words={words} onProgress={updateProgress} />
            </div>

            <Footer />
        </div>
    )
}