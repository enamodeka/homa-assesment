"use strict";
class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
        this.word = '';
    }
}
class Trie {
    constructor() {
        this.words = [];
    }
    buildTrie(words) {
        const root = new TrieNode();
        this.words = words;
        for (let word of words) {
            let node = root;
            for (let letter of word) {
                if (node.children[letter] === undefined) {
                    node.children[letter] = new TrieNode();
                }
                node = node.children[letter];
            }
            node.isWord = true;
            node.word = word;
        }
        return root;
    }
    dfs(node, string) {
        let longestWord = node.isWord ? node.word : '';
        for (let letter of string) {
            if (node.children[letter]) {
                let child = node.children[letter];
                let childWord = this.dfs(child, string.replace(letter, ''));
                if (childWord.length > longestWord.length) {
                    longestWord = childWord;
                }
            }
        }
        return longestWord;
    }
    longestWordInString(words, string) {
        console.time('Build trie');
        let root = this.buildTrie(words);
        console.timeEnd('Build trie');
        console.time('2nd algo (Trie)');
        const result = this.dfs(root, string);
        console.timeEnd('2nd algo (Trie)');
        console.log('Result: ', result);
        console.log('\n');
        return result;
    }
}
module.exports = Trie;
