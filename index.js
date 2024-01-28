"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const Simple = require('./algos/simple');
const Trie = require('./algos/trie');
const WordMap = require('./algos/wordmap');
const WordMapWithFrequency = require('./algos/wordmapWithFreq');
const input = process.argv[2];
if (!input) {
    throw new Error('Provide an input string');
}
console.time('Reading file');
const dictionaryList = fs.readFileSync('./words.txt', 'utf-8').split('\n');
console.timeEnd('Reading file');
console.log('List size:', dictionaryList.length);
const dictionaryListUnsorted = [...dictionaryList];
console.time('Sorting');
const dictionaryListSorted = dictionaryList.sort((a, b) => b.length - a.length);
console.timeEnd('Sorting');
console.log('\n');
new Simple(input, dictionaryListSorted);
(new Trie()).longestWordInString(dictionaryListUnsorted, input);
(new WordMap(dictionaryListUnsorted)).search(input);
(new WordMapWithFrequency(dictionaryListUnsorted).search(input));
