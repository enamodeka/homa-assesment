const fs = require('fs');

const dictionaryList = fs.readFileSync('./google-10000-english.txt', 'utf-8').split('\n');
const a = dictionaryList.sort((a: string, b: string) => b.length - a.length);

const longestWord = (inputChars: string): string => {
    for (const dictionaryWord of dictionaryList) {
        let availableChars = inputChars;
        let isFound = true;
        for (const char of dictionaryWord) {
            const charIndex = availableChars.indexOf(char);
            if (charIndex !== -1) {
                availableChars = availableChars.substr(0, charIndex) + availableChars.substr(charIndex + 1);
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

class TaskWordFinder {
    public longest: string;
    constructor(word: string) {
        this.longest = longestWord(word);
    }
}

const input = process.argv[2];
if(!input) {
    console.log('Provide an input string')
} else {
    const taskWordFinder = new TaskWordFinder(input);
    console.log(taskWordFinder.longest);
}
