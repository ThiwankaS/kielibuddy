export default interface Word {
    id: string;
    word: string;
    correctAnswer: string;
    options: string[];
    result?: boolean | null;
    attempted?: boolean;
}