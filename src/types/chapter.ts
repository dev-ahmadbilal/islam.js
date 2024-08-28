export interface Chapter {
  name: string; // Arabic name of the Chapter
  type: string; // Type of Chapter (e.g., Makki, Madani)
  englishName: string; // English name of the Chapter
  number: number; // Number of the Chapter
  numberOfVerses: number; // Number of verses in the Chapter
  numberOfWords: number; // Number of words in the Chapter
  numberOfLetters: number; // Number of letters in the Chapter
  verses: string[]; // Array of verses in the Chapter
}
