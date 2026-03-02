import React, { useState } from 'react';
import { Cpu, X, Copy, Check, Search, List, Hash, GitBranch as Tree } from 'lucide-react';

const algorithms = {
  'Sorting': [
    {
      name: 'Bubble Sort',
      complexity: 'O(n²)',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
    },
    {
      name: 'Quick Sort',
      complexity: 'O(n log n)',
      code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`
    },
    {
      name: 'Merge Sort',
      complexity: 'O(n log n)',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`
    },
    {
      name: 'Insertion Sort',
      complexity: 'O(n²)',
      code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
    },
  ],
  'Search': [
    {
      name: 'Binary Search',
      complexity: 'O(log n)',
      code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`
    },
    {
      name: 'Linear Search',
      complexity: 'O(n)',
      code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`
    },
  ],
  'Data Structures': [
    {
      name: 'Linked List',
      complexity: 'O(1) insert/delete',
      code: `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      return;
    }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
  }
  
  delete(val) {
    if (!this.head) return;
    if (this.head.val === val) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.val !== val) {
      current = current.next;
    }
    if (current.next) current.next = current.next.next;
  }
}`
    },
    {
      name: 'Stack',
      complexity: 'O(1) push/pop',
      code: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) {
    this.items.push(item);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}`
    },
    {
      name: 'Queue',
      complexity: 'O(1) enqueue/dequeue',
      code: `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    return this.items.shift();
  }
  
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}`
    },
    {
      name: 'Hash Table',
      complexity: 'O(1) average',
      code: `class HashTable {
  constructor(size = 100) {
    this.size = size;
    this.table = new Array(size);
  }
  
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }
  
  set(key, value) {
    const index = this._hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    this.table[index].push([key, value]);
  }
  
  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (!bucket) return undefined;
    
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }
  
  delete(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (!bucket) return false;
    
    const idx = bucket.findIndex(([k]) => k === key);
    if (idx !== -1) {
      bucket.splice(idx, 1);
      return true;
    }
    return false;
  }
}`
    },
  ],
  'Strings': [
    {
      name: 'Palindrome Check',
      complexity: 'O(n)',
      code: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// Or two-pointer approach
function isPalindrome2(str) {
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}`
    },
    {
      name: 'Anagram Check',
      complexity: 'O(n)',
      code: `function isAnagram(s1, s2) {
  const normalize = str => 
    str.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
  
  return normalize(s1) === normalize(s2);
}

// With character count
function isAnagram2(s1, s2) {
  const count = {};
  for (const char of s1.toLowerCase()) {
    count[char] = (count[char] || 0) + 1;
  }
  for (const char of s2.toLowerCase()) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`
    },
    {
      name: 'Reverse String',
      complexity: 'O(n)',
      code: `function reverseString(str) {
  return str.split('').reverse().join('');
}

// In-place (for arrays)
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`
    },
  ],
  'Trees': [
    {
      name: 'Binary Tree Node',
      complexity: 'N/A',
      code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// DFS Traversal
function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
  return result;
}

function preorder(node, result = []) {
  if (!node) return result;
  result.push(node.val);
  preorder(node.left, result);
  preorder(node.right, result);
  return result;
}

function postorder(node, result = []) {
  if (!node) return result;
  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.val);
  return result;
}`
    },
    {
      name: 'BFS Traversal',
      complexity: 'O(n)',
      code: `function bfs(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`
    },
  ],
  'Graphs': [
    {
      name: 'BFS',
      complexity: 'O(V + E)',
      code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}`
    },
    {
      name: 'DFS',
      complexity: 'O(V + E)',
      code: `function dfs(graph, start) {
  const visited = new Set();
  const result = [];
  
  function dfsHelper(vertex) {
    visited.add(vertex);
    result.push(vertex);
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    }
  }
  
  dfsHelper(start);
  return result;
}

// Iterative DFS
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];
  
  while (stack.length > 0) {
    const vertex = stack.pop();
    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);
      
      for (const neighbor of graph[vertex]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  return result;
}`
    },
    {
      name: 'Dijkstra',
      complexity: 'O((V+E) log V)',
      code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = [[0, start]];
  
  // Initialize distances
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [dist, vertex] = pq.shift();
    
    if (visited.has(vertex)) continue;
    visited.add(vertex);
    
    for (const [neighbor, weight] of graph[vertex]) {
      const newDist = dist + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }
  return distances;
}`
    },
  ],
  'Dynamic Programming': [
    {
      name: 'Fibonacci',
      complexity: 'O(n)',
      code: `// Memoization
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Tabulation
function fibTab(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Space optimized
function fibOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`
    },
    {
      name: 'Climbing Stairs',
      complexity: 'O(n)',
      code: `function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev2 = 1;
  let prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// With variable steps
function climbStairsVar(n, steps = [1, 2]) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  
  for (let i = 1; i <= n; i++) {
    for (const step of steps) {
      if (i >= step) {
        dp[i] += dp[i - step];
      }
    }
  }
  return dp[n];
}`
    },
    {
      name: 'Longest Common Subsequence',
      complexity: 'O(m*n)',
      code: `function lcs(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find LCS
  let i = m, j = n;
  const lcs = [];
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs.unshift(str1[i - 1]);
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return lcs.join('');
}`
    },
  ],
  'Math': [
    {
      name: 'Factorial',
      complexity: 'O(n)',
      code: `// Iterative
function factorial(n) {
  if (n < 0) return undefined;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Recursive
function factorialRec(n) {
  if (n < 0) return undefined;
  if (n <= 1) return 1;
  return n * factorialRec(n - 1);
}

// With memoization
function factorialMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return 1;
  memo[n] = n * factorialMemo(n - 1, memo);
  return memo[n];
}`
    },
    {
      name: 'Power',
      complexity: 'O(log n)',
      code: `// Fast power (exponentiation)
function power(base, exp) {
  if (exp < 0) return 1 / power(base, -exp);
  if (exp === 0) return 1;
  if (exp === 1) return base;
  
  if (exp % 2 === 0) {
    const half = power(base, exp / 2);
    return half * half;
  }
  return base * power(base, exp - 1);
}

// Iterative
function powerIter(base, exp) {
  if (exp < 0) return 1 / powerIter(base, -exp);
  
  let result = 1;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result *= base;
    }
    base *= base;
    exp = Math.floor(exp / 2);
  }
  return result;
}`
    },
    {
      name: 'Prime Check',
      complexity: 'O(√n)',
      code: `function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// Sieve of Eratosthenes
function sieveOfEratosthenes(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  
  return isPrime.map((prime, i) => prime ? i : -1).filter(i => i >= 0);
}`
    },
  ],
};

export default function Algorithms({ onClose }) {
  const [category, setCategory] = useState('Sorting');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');

  const categories = Object.keys(algorithms);
  const filtered = search
    ? Object.entries(algorithms).flatMap(([cat, algos]) =>
        algos.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
          .map(a => ({ ...a, category: cat }))
      )
    : algorithms[category].map(a => ({ ...a, category }));

  const copyCode = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-rose-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-rose-500" />
          <span className="text-white font-semibold">Algorithms & Data Structures</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      {/* Search */}
      <div className="p-3 border-b border-gray-800">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search algorithms..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 text-sm"
        />
      </div>
      
      {/* Categories */}
      {!search && (
        <div className="flex border-b border-gray-800 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 text-xs whitespace-nowrap ${
                category === cat 
                  ? 'bg-gray-800 text-white border-b-2 border-rose-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      
      {/* Algorithms List */}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {filtered.map((algo, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">{algo.name}</span>
                <span className="text-xs text-rose-400 bg-rose-900/30 px-2 py-0.5 rounded">{algo.complexity}</span>
              </div>
              <button 
                onClick={() => copyCode(algo.name, algo.code)}
                className="p-1 hover:bg-gray-600 rounded"
              >
                {copied === algo.name ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <pre className="p-3 text-xs text-gray-300 overflow-x-auto">
              <code>{algo.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
