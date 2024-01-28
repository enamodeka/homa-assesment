interface WordData {
    word: string;
    freqMap: Record<string, number>;
}

class WordMapWithFrequency {
    private wordMap: Record<string, WordData[]>;

    constructor(words: string[]) {
        console.time('Build word map with frequency');
        this.wordMap = this.buildWordMap(words);
        console.timeEnd('Build word map with frequency');
    }

    private toFrequencyMap(word: string): Record<string, number> {
        const freqMap: Record<string, number> = {};
        for (let char of word) {
            freqMap[char] = (freqMap[char] || 0) + 1;
        }
        return freqMap;
    }

    private canConstruct(searchWordFreq: Record<string, number>, wordFreqMap: Record<string, number>): boolean {
        for (let char in searchWordFreq) {
            if (!wordFreqMap[char] || wordFreqMap[char] !== searchWordFreq[char]) {
                return false;
            }
        }
        return true;
    }

    private buildWordMap(words: string[]): Record<string, WordData[]> {
        const map: Record<string, WordData[]> = {};
        for (let word of words) {
            let key = Array.from(new Set(word.split(''))).sort().join('');
            let wordFreq = this.toFrequencyMap(word);
            if (map[key] === undefined) {
                map[key] = [{word, freqMap: wordFreq}];
            } else {
                map[key].push({word, freqMap: wordFreq});
            }
        }
        return map;
    }

    search(inputWord: string): string {
        console.time('4rd algo (WordMap with frequency)');
        let key = Array.from(new Set(inputWord.split(''))).sort().join('');
        let searchWordFreq = this.toFrequencyMap(inputWord);
        if (this.wordMap[key] !== undefined) {
            for (let item of this.wordMap[key]) {
                if (this.canConstruct(searchWordFreq, item.freqMap)) {
                    const result = item.word;
                    console.timeEnd('4rd algo (WordMap with frequency)');
                    console.log('Result: ', result);
                    console.log('\n');
                    return item.word;
                }
            }
        }
        return "No words found";
    }
}

module.exports = WordMapWithFrequency;
