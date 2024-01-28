const longestWord = (inputChars: string, wordList: string[]): string => {
    for (const dictionaryWord of wordList) {
        let availableChars = inputChars;
        let isFound = true;
        for (const char of dictionaryWord) {
            const charIndex = availableChars.indexOf(char);
            if (charIndex !== -1) {
                availableChars = availableChars.slice(0, charIndex) + availableChars.slice(charIndex + 1);
            } else {
                isFound = false;
                break;
            }
        }
        if (isFound) {
            return dictionaryWord;
        }
    }
    return '';
};


class Simple {
    public longest: string;

    constructor(word: string, wordList: string[]) {
        const algo1 = '1st algo (Simple)';
        console.time(algo1);
        this.longest = longestWord(word, wordList);
        console.timeEnd(algo1);
        console.log('Result: ', this.longest);
        console.log('\n');

    }


}

module.exports = Simple;
