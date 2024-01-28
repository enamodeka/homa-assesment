const longestWordWithList = (inputChars: string, list: string[]): string => {
    for (const dictionaryWord of list) {
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

class WordMap {

    words: string[] = [];
    wordMap: { [p: string]: string[] };

    constructor(words: string[]) {
        console.time('Build word map');
        this.wordMap = this.buildWordMap(words);
        console.timeEnd('Build word map');
    }

    buildWordMap(words: string[]) {
        let map: { [p: string]: string[] } = {};
        for (let word of words) {
            let key = Array.from(new Set(word.split(''))).sort().join('');
            if (map[key] === undefined) {
                map[key] = [word];
            } else {
                map[key].push(word);
            }
        }
        return map;
    }

    search(inputWord: string) {
        console.time('3rd algo (WordMap)');
        let key = Array.from(new Set(inputWord.split(''))).sort().join('');
        if (this.wordMap[key] !== undefined) {
            // Sort words by their lengths in descending order
            this.wordMap[key].sort((a, b) => b.length - a.length);
            const result = longestWordWithList(inputWord, this.wordMap[key]);
            console.timeEnd('3rd algo (WordMap)');
            console.log('Result: ', result);
            console.log('\n');
            return result;
        } else {
            return "No words found";
        }
    }
}

module.exports = WordMap;
