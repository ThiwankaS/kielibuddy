import { useState } from "react"
import { dummyData } from "../data/test_data";

export default function useWords() {
      const [words, setWords ] = useState(dummyData);
      
      function updateProgress(id : number, result : boolean) {
            const updatedWords = words.map((word) => word.id === id ? { ...word, result : result, attempted : true } : word );
            setWords(updatedWords);
      }

      return {
            words,
            updateProgress
      }
}