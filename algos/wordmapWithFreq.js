"use strict";
class WordMapWithFrequency {
    constructor(words) {
        console.time('Build word map with frequency');
        this.wordMap = this.buildWordMap(words);
        console.timeEnd('Build word map with frequency');
    }
    toFrequencyMap(word) {
        const freqMap = {};
        for (let char of word) {
            freqMap[char] = (freqMap[char] || 0) + 1;
        }
        return freqMap;
    }
    canConstruct(searchWordFreq, wordFreqMap) {
        for (let char in searchWordFreq) {
            if (!wordFreqMap[char] || wordFreqMap[char] !== searchWordFreq[char]) {
                return false;
            }
        }
        return true;
    }
    buildWordMap(words) {
        const map = {};
        for (let word of words) {
            let key = Array.from(new Set(word.split(''))).sort().join('');
            let wordFreq = this.toFrequencyMap(word);
            if (map[key] === undefined) {
                map[key] = [{ word, freqMap: wordFreq }];
            }
            else {
                map[key].push({ word, freqMap: wordFreq });
            }
        }
        return map;
    }
    search(inputWord) {
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
