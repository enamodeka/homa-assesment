const fs = require('fs');

export {}; // silence TS errors re. class imports


const {formatBytes} = require('./helpers')

const Simple = require('./algos/simple');
const Trie = require('./algos/trie');
const WordMap = require('./algos/wordmap');
const WordMapWithFrequency = require('./algos/wordmapWithFreq');

const input = process.argv[2];
if (!input) {
    throw new Error('Provide an input string')
}

console.time('Reading file');
const dictionaryList = fs.readFileSync('./words.txt', 'utf-8').split('\n');
console.timeEnd('Reading file');
console.log('List size:', dictionaryList.length);
const dictionaryListUnsorted = [...dictionaryList];
console.time('Sorting');
const dictionaryListSorted = dictionaryList.sort((a: string, b: string) => b.length - a.length);
console.timeEnd('Sorting');
console.log('\n');


const mem: Record<string, any> = {};
mem.initial = process.memoryUsage().heapUsed;
const a1 = new Simple(input, dictionaryListSorted);
mem.simple = process.memoryUsage().heapUsed - mem.initial;
(new Trie()).longestWordInString(dictionaryListUnsorted, input);
mem.trie = process.memoryUsage().heapUsed - mem.simple - mem.initial;
(new WordMap(dictionaryListUnsorted)).search(input);
mem.wordMap = process.memoryUsage().heapUsed - mem.trie - mem.simple - mem.initial;
(new WordMapWithFrequency(dictionaryListUnsorted).search(input));
mem.wordMapFreq = process.memoryUsage().heapUsed - mem.wordMap - mem.wordMap - mem.simple - mem.initial;

for (let m in mem) {
    const v = mem[m];
    console.log(m, formatBytes(v));
}
console.log('Total memory: ', formatBytes(process.memoryUsage().heapUsed));
