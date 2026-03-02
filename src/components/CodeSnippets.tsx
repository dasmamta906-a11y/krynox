import React, { useState } from 'react';
import { Code2, X, Copy, Check, ChevronRight, Search } from 'lucide-react';

const languageCategories = {
  'JavaScript': {
    color: 'text-yellow-400',
    snippets: [
      { name: 'Arrow Function', code: 'const func = (args) => {\n  // code\n};' },
      { name: 'Async/Await', code: 'async function fetchData() {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}' },
      { name: 'Map Array', code: 'const newArray = array.map(item => {\n  return item * 2;\n});' },
      { name: 'Filter Array', code: 'const filtered = array.filter(item => {\n  return item > 10;\n});' },
      { name: 'Reduce Array', code: 'const sum = array.reduce((acc, curr) => {\n  return acc + curr;\n}, 0);' },
      { name: 'Promise', code: 'const promise = new Promise((resolve, reject) => {\n  // async operation\n  if (success) resolve(data);\n  else reject(error);\n});' },
      { name: 'Destructuring', code: 'const { name, age, ...rest } = object;\nconst [first, second] = array;' },
      { name: 'Spread Operator', code: 'const newArray = [...oldArray];\nconst newObject = { ...oldObject, newProp: value };' },
      { name: 'Class', code: 'class ClassName extends Parent {\n  constructor(props) {\n    super(props);\n    this.state = {};\n  }\n  \n  method() {\n    // code\n  }\n}' },
      { name: 'Event Listener', code: 'element.addEventListener("event", (e) => {\n  console.log(e.target);\n});' },
    ]
  },
  'TypeScript': {
    color: 'text-blue-400',
    snippets: [
      { name: 'Interface', code: 'interface User {\n  id: number;\n  name: string;\n  email?: string;\n}' },
      { name: 'Type Alias', code: 'type ID = string | number;\ntype User = {\n  name: string;\n  age: number;\n};' },
      { name: 'Generic Function', code: 'function identity<T>(arg: T): T {\n  return arg;\n}' },
      { name: 'Generic Class', code: 'class Container<T> {\n  private value: T;\n  \n  constructor(value: T) {\n    this.value = value;\n  }\n  \n  get(): T {\n    return this.value;\n  }\n}' },
      { name: 'Enum', code: 'enum Direction {\n  Up = "UP",\n  Down = "DOWN",\n  Left = "LEFT",\n  Right = "RIGHT"\n}' },
      { name: 'Union Type', code: 'type StringOrNumber = string | number;\nfunction process(value: StringOrNumber): StringOrNumber {\n  return value;\n}' },
      { name: 'Mapped Types', code: 'type Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};' },
      { name: 'Utility Types', code: 'type PartialUser = Partial<User>;\ntype RequiredUser = Required<User>;\ntype PickUser = Pick<User, "name" | "age">;' },
    ]
  },
  'Python': {
    color: 'text-green-400',
    snippets: [
      { name: 'Function', code: 'def function_name(arg1, arg2=None):\n    """Docstring"""\n    # code\n    return result' },
      { name: 'Class', code: 'class ClassName:\n    def __init__(self, arg):\n        self.arg = arg\n    \n    def method(self):\n        return self.arg' },
      { name: 'List Comprehension', code: 'squares = [x**2 for x in range(10)]\nevens = [x for x in numbers if x % 2 == 0]' },
      { name: 'Dictionary', code: 'my_dict = {\n    "key1": "value1",\n    "key2": "value2"\n}\nvalue = my_dict.get("key1", "default")' },
      { name: 'Lambda', code: 'add = lambda x, y: x + y\nsorted_list = sorted(items, key=lambda x: x["name"])' },
      { name: 'Decorator', code: 'def decorator(func):\n    def wrapper(*args, **kwargs):\n        # before\n        result = func(*args, **kwargs)\n        # after\n        return result\n    return wrapper' },
      { name: 'Try/Except', code: 'try:\n    result = risky_operation()\nexcept SpecificError as e:\n    print(f"Error: {e}")\nfinally:\n    cleanup()' },
      { name: 'Context Manager', code: 'with open("file.txt", "r") as f:\n    content = f.read()\n# file automatically closed' },
    ]
  },
  'React': {
    color: 'text-cyan-400',
    snippets: [
      { name: 'Functional Component', code: 'import React from "react";\n\nfunction Component({ title }) {\n  return (\n    <div>\n      <h1>{title}</h1>\n    </div>\n  );\n}\n\nexport default Component;' },
      { name: 'useState Hook', code: 'import { useState } from "react";\n\nfunction Component() {\n  const [state, setState] = useState(initialValue);\n  \n  return (\n    <button onClick={() => setState(newValue)}>\n      Click\n    </button>\n  );\n}' },
      { name: 'useEffect Hook', code: 'import { useEffect, useState } from "react";\n\nfunction Component() {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    fetchData().then(setData);\n    \n    return () => {\n      // cleanup\n    };\n  }, []);\n}' },
      { name: 'useContext Hook', code: 'import { createContext, useContext } from "react";\n\nconst ThemeContext = createContext();\n\nfunction useTheme() {\n  return useContext(ThemeContext);\n}' },
      { name: 'useRef Hook', code: 'import { useRef } from "react";\n\nfunction Component() {\n  const inputRef = useRef(null);\n  \n  const focusInput = () => {\n    inputRef.current.focus();\n  };\n  \n  return (\n    <input ref={inputRef} />\n  );\n}' },
      { name: 'Custom Hook', code: 'function useCustomHook(initialValue) {\n  const [value, setValue] = useState(initialValue);\n  \n  const increment = () => setValue(v => v + 1);\n  const decrement = () => setValue(v => v - 1);\n  \n  return { value, increment, decrement };\n}' },
      { name: 'React Router', code: 'import { BrowserRouter, Routes, Route } from "react-router-dom";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}' },
    ]
  },
  'Node.js': {
    color: 'text-green-500',
    snippets: [
      { name: 'Express Server', code: 'const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.json({ message: "Hello" });\n});\n\napp.listen(3000, () => {\n  console.log("Server running");\n});' },
      { name: 'Express Middleware', code: 'app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});' },
      { name: 'File Read/Write', code: 'const fs = require("fs").promises;\n\nasync function readFile() {\n  const data = await fs.readFile("file.txt", "utf8");\n  return data;\n}\n\nasync function writeFile(content) {\n  await fs.writeFile("file.txt", content);\n}' },
      { name: 'HTTP Request', code: 'const https = require("https");\n\nhttps.get(url, (res) => {\n  let data = "";\n  res.on("data", chunk => data += chunk);\n  res.on("end", () => console.log(data));\n});' },
      { name: 'Event Emitter', code: 'const EventEmitter = require("events");\nconst emitter = new EventEmitter();\n\nemitter.on("event", (data) => {\n  console.log(data);\n});\n\nemitter.emit("event", { message: "Hello" });' },
    ]
  },
  'HTML': {
    color: 'text-orange-400',
    snippets: [
      { name: 'Basic Template', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Title</title>\n</head>\n<body>\n  \n</body>\n</html>' },
      { name: 'Form', code: '<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n  \n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email">\n  \n  <button type="submit">Submit</button>\n</form>' },
      { name: 'Table', code: '<table>\n  <thead>\n    <tr>\n      <th>Header 1</th>\n      <th>Header 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Data 1</td>\n      <td>Data 2</td>\n    </tr>\n  </tbody>\n</table>' },
      { name: 'Semantic HTML', code: '<header>\n  <nav>...</nav>\n</header>\n<main>\n  <article>\n    <section>...</section>\n  </article>\n  <aside>...</aside>\n</main>\n<footer>...</footer>' },
    ]
  },
  'CSS': {
    color: 'text-purple-400',
    snippets: [
      { name: 'Flexbox Center', code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' },
      { name: 'Grid Layout', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}' },
      { name: 'Media Query', code: '@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}' },
      { name: 'Animation', code: '@keyframes slideIn {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n\n.element {\n  animation: slideIn 0.3s ease-in-out;\n}' },
      { name: 'Hover Effect', code: '.button {\n  transition: all 0.3s ease;\n}\n\n.button:hover {\n  transform: scale(1.05);\n  background-color: darken(color, 10%);\n}' },
      { name: 'Responsive Grid', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}' },
    ]
  },
  'SQL': {
    color: 'text-blue-300',
    snippets: [
      { name: 'Select', code: 'SELECT column1, column2\nFROM table_name\nWHERE condition\nORDER BY column1 ASC;' },
      { name: 'Join', code: 'SELECT a.column1, b.column2\nFROM table1 a\nINNER JOIN table2 b ON a.id = b.table1_id;' },
      { name: 'Group By', code: 'SELECT COUNT(*), category\nFROM products\nGROUP BY category\nHAVING COUNT(*) > 5;' },
      { name: 'Insert', code: 'INSERT INTO table_name (col1, col2)\nVALUES (value1, value2);' },
      { name: 'Update', code: 'UPDATE table_name\nSET column1 = value1, column2 = value2\nWHERE condition;' },
      { name: 'Delete', code: 'DELETE FROM table_name\nWHERE condition;' },
      { name: 'Create Table', code: 'CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);' },
    ]
  },
  'Go': {
    color: 'text-cyan-300',
    snippets: [
      { name: 'Function', code: 'func functionName(param string) string {\n    return param\n}' },
      { name: 'Struct', code: 'type Person struct {\n    Name string\n    Age  int\n}' },
      { name: 'Interface', code: 'type Reader interface {\n    Read(p []byte) (n int, err error)\n}' },
      { name: 'Goroutine', code: 'go func() {\n    // async work\n}()' },
      { name: 'Channel', code: 'ch := make(chan int)\ngo func() {\n    ch <- 42\n}()\nresult := <-ch' },
      { name: 'Error Handling', code: 'result, err := doSomething()\nif err != nil {\n    return err\n}' },
    ]
  },
  'Rust': {
    color: 'text-orange-500',
    snippets: [
      { name: 'Function', code: 'fn function_name(param: &str) -> String {\n    param.to_string()\n}' },
      { name: 'Struct', code: 'struct Person {\n    name: String,\n    age: u32,\n}\n\nimpl Person {\n    fn new(name: String, age: u32) -> Self {\n        Self { name, age }\n    }\n}' },
      { name: 'Enum', code: 'enum Result<T, E> {\n    Ok(T),\n    Err(E),\n}' },
      { name: 'Option', code: 'fn find_user(id: u32) -> Option<User> {\n    // Some(user) or None\n}' },
      { name: 'Match', code: 'match value {\n    Some(x) => println!("{}", x),\n    None => println!("None"),\n}' },
      { name: 'Iterator', code: 'let sum: i32 = (1..=10)\n    .filter(|x| x % 2 == 0)\n    .sum();' },
    ]
  },
  'Java': {
    color: 'text-red-400',
    snippets: [
      { name: 'Class', code: 'public class ClassName {\n    private String field;\n    \n    public ClassName(String field) {\n        this.field = field;\n    }\n    \n    public String getField() {\n        return field;\n    }\n}' },
      { name: 'Interface', code: 'public interface InterfaceName {\n    void method();\n    default void defaultMethod() {\n        // default implementation\n    }\n}' },
      { name: 'Stream', code: 'List<Integer> result = list.stream()\n    .filter(x -> x > 10)\n    .map(x -> x * 2)\n    .collect(Collectors.toList());' },
      { name: 'Optional', code: 'Optional<String> name = Optional.ofNullable(user.getName());\nString result = name.orElse("Default");' },
      { name: 'Thread', code: 'Thread thread = new Thread(() -> {\n    // work\n});\nthread.start();' },
    ]
  },
  'C++': {
    color: 'text-blue-500',
    snippets: [
      { name: 'Class', code: 'class ClassName {\nprivate:\n    int value;\npublic:\n    ClassName(int v) : value(v) {}\n    int getValue() const { return value; }\n};' },
      { name: 'Template', code: 'template<typename T>\nT max(T a, T b) {\n    return (a > b) ? a : b;\n}' },
      { name: 'Vector', code: '#include <vector>\n\nstd::vector<int> vec = {1, 2, 3};\nvec.push_back(4);\nfor (const auto& item : vec) {\n    std::cout << item << std::endl;\n}' },
      { name: 'Smart Pointer', code: '#include <memory>\n\nauto ptr = std::make_unique<int>(42);\n// automatically deleted when out of scope' },
      { name: 'Lambda', code: 'auto lambda = [](int x, int y) {\n    return x + y;\n};\nint result = lambda(1, 2);' },
    ]
  },
  'C#': {
    color: 'text-purple-500',
    snippets: [
      { name: 'Class', code: 'public class ClassName\n{\n    public string Property { get; set; }\n    \n    public void Method()\n    {\n        // code\n    }\n}' },
      { name: 'LINQ', code: 'var result = list\n    .Where(x => x > 10)\n    .OrderBy(x => x)\n    .Select(x => new { x.Id, x.Name });' },
      { name: 'Async/Await', code: 'public async Task<string> GetDataAsync()\n{\n    using var client = new HttpClient();\n    return await client.GetStringAsync(url);\n}' },
      { name: 'Delegate', code: 'public delegate int Calculator(int a, int b);\n\nCalculator add = (a, b) => a + b;\nint result = add(1, 2);' },
      { name: 'Nullable', code: 'int? nullableInt = null;\nint value = nullableInt ?? 0;' },
    ]
  },
  'PHP': {
    color: 'text-indigo-400',
    snippets: [
      { name: 'Function', code: 'function functionName($param1, $param2 = "default") {\n    return $param1 . $param2;\n}' },
      { name: 'Class', code: 'class ClassName {\n    private $property;\n    \n    public function __construct($property) {\n        $this->property = $property;\n    }\n    \n    public function getProperty() {\n        return $this->property;\n    }\n}' },
      { name: 'Array', code: '$array = ["key1" => "value1", "key2" => "value2"];\n\nforeach ($array as $key => $value) {\n    echo "$key: $value";\n}' },
      { name: 'PDO', code: '$pdo = new PDO("mysql:host=localhost;dbname=test", $user, $pass);\n$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");\n$stmt->execute([$id]);\n$result = $stmt->fetchAll();' },
    ]
  },
  'Ruby': {
    color: 'text-red-500',
    snippets: [
      { name: 'Method', code: 'def method_name(param = "default")\n  # code\n  result\nend' },
      { name: 'Class', code: 'class ClassName\n  def initialize(param)\n    @param = param\n  end\n  \n  def method\n    @param\n  end\nend' },
      { name: 'Block', code: '[1, 2, 3].each do |item|\n  puts item * 2\nend\n\nresult = [1, 2, 3].map { |x| x ** 2 }' },
      { name: 'Hash', code: 'hash = { key1: "value1", key2: "value2" }\nvalue = hash[:key1]' },
    ]
  },
  'Swift': {
    color: 'text-orange-400',
    snippets: [
      { name: 'Function', code: 'func functionName(param: String) -> String {\n    return param\n}' },
      { name: 'Struct', code: 'struct Person {\n    let name: String\n    var age: Int\n    \n    init(name: String, age: Int) {\n        self.name = name\n        self.age = age\n    }\n}' },
      { name: 'Enum', code: 'enum Direction {\n    case up, down, left, right\n    \n    func move() {\n        // move in direction\n    }\n}' },
      { name: 'Optional', code: 'var name: String?\nlet unwrapped = name ?? "default"' },
      { name: 'Closure', code: 'let closure: (Int) -> Int = { x in\n    return x * 2\n}' },
    ]
  },
  'Kotlin': {
    color: 'text-purple-500',
    snippets: [
      { name: 'Function', code: 'fun functionName(param: String): String {\n    return param\n}' },
      { name: 'Data Class', code: 'data class User(\n    val id: Int,\n    val name: String,\n    val email: String? = null\n)' },
      { name: 'Lambda', code: 'val list = listOf(1, 2, 3)\nval doubled = list.map { it * 2 }' },
      { name: 'Null Safety', code: 'val length: Int? = str?.length\nval result: Int = str?.length ?: 0' },
      { name: 'Coroutine', code: 'suspend fun fetchData(): Data {\n    return withContext(Dispatchers.IO) {\n        api.getData()\n    }\n}' },
    ]
  },
  'Shell': {
    color: 'text-green-400',
    snippets: [
      { name: 'If Statement', code: 'if [ -f "$file" ]; then\n    echo "File exists"\nelif [ -d "$dir" ]; then\n    echo "Directory exists"\nelse\n    echo "Not found"\nfi' },
      { name: 'For Loop', code: 'for file in *.txt; do\n    echo "Processing $file"\ndone' },
      { name: 'Function', code: 'function_name() {\n    local arg="$1"\n    echo "$arg"\n}\n\nfunction_name "hello"' },
      { name: 'Read File', code: 'while IFS= read -r line; do\n    echo "$line"\ndone < "file.txt"' },
      { name: 'Args', code: 'while getopts "abc:" opt; do\n  case $opt in\n    a) echo "Option a" ;;\n    b) echo "Option b: $OPTARG" ;;\n  esac\ndone' },
    ]
  },
};

export default function CodeSnippets({ onClose }) {
  const [selectedLang, setSelectedLang] = useState('JavaScript');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');

  const languages = Object.keys(languageCategories);
  const currentSnippets = languageCategories[selectedLang].snippets;
  const filteredSnippets = search 
    ? currentSnippets.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    : currentSnippets;

  const copyCode = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-yellow-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-500/20">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-semibold">Code Snippets</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      {/* Language Tabs */}
      <div className="flex border-b border-gray-800 overflow-x-auto">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              selectedLang === lang 
                ? 'bg-gray-800 text-white border-b-2 border-yellow-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      
      {/* Search */}
      <div className="p-3 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snippets..."
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded border border-gray-700 text-sm"
          />
        </div>
      </div>
      
      {/* Snippets List */}
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {filteredSnippets.map((snippet, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-700">
              <span className="text-white text-sm font-medium">{snippet.name}</span>
              <button 
                onClick={() => copyCode(snippet.name, snippet.code)}
                className="p-1 hover:bg-gray-600 rounded"
              >
                {copied === snippet.name ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <pre className="p-3 text-xs text-gray-300 overflow-x-auto">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
