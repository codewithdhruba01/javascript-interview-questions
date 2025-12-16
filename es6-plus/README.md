# ES6+ Interview Questions

## Table of Contents
1. [Variable Declarations](#variable-declarations)
2. [Arrow Functions](#arrow-functions)
3. [Template Literals](#template-literals)
4. [Destructuring](#destructuring)
5. [Spread and Rest Operators](#spread-and-rest-operators)
6. [Classes](#classes)
7. [Modules](#modules)
8. [Promises and Async/Await](#promises-and-async-await)
9. [Symbols and Iterators](#symbols-and-iterators)
10. [Maps and Sets](#maps-and-sets)
11. [Proxies and Reflect](#proxies-and-reflect)
12. [ES2020+ Features](#es2020-features)

## Variable Declarations

### 1. What are the differences between `var`, `let`, and `const`?

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisting | Yes | TDZ | TDZ |
| Reassignment | Yes | Yes | No |
| Redeclaration | Yes | No | No |

**Temporal Dead Zone (TDZ)**: Period between entering scope and variable declaration.

```javascript
// var example
function varExample() {
  console.log(x); // undefined (hoisted)
  var x = 10;
  console.log(x); // 10
}

// let/const example
function letExample() {
  // console.log(y); // ReferenceError: Cannot access before initialization
  let y = 20;
  console.log(y); // 20
}
```

### 2. What is hoisting with ES6 variables?

```javascript
// var - hoisted and initialized to undefined
console.log(a); // undefined
var a = 1;

// let/const - hoisted but not initialized (TDZ)
try {
  console.log(b); // ReferenceError
} catch (e) {
  console.log(e.message); // Cannot access 'b' before initialization
}
let b = 2;

// Function declarations are fully hoisted
console.log(func()); // "Hello"
function func() {
  return "Hello";
}

// Function expressions are not hoisted
try {
  console.log(expr()); // TypeError: expr is not a function
} catch (e) {
  console.log(e.message);
}
var expr = function() {
  return "Hello";
};
```

## Arrow Functions

### 3. What are arrow functions and their benefits?

Arrow functions provide a concise syntax for writing function expressions.

```javascript
// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const addArrow = (a, b) => a + b;

// With body
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const greet = () => "Hello World";

// Returning object literal
const createUser = (name, age) => ({ name, age });
```

### 4. What is the difference between arrow functions and regular functions?

| Feature | Arrow Functions | Regular Functions |
|---------|----------------|-------------------|
| `this` binding | Lexical (inherits from parent) | Dynamic |
| `arguments` object | No | Yes |
| `new` keyword | Cannot be used as constructor | Can be used |
| `super` | No | Yes |

```javascript
// this binding
const obj = {
  name: "Object",

  regularFunction: function() {
    console.log(this.name); // "Object"
  },

  arrowFunction: () => {
    console.log(this.name); // undefined (inherits from global)
  }
};

obj.regularFunction(); // "Object"
obj.arrowFunction();   // undefined

// Constructor
function RegularConstructor(name) {
  this.name = name;
}

const regInstance = new RegularConstructor("Regular");
// const arrowInstance = new (() => {})(); // TypeError

// arguments object
function regularFunc() {
  console.log(arguments); // [1, 2, 3]
}

const arrowFunc = () => {
  // console.log(arguments); // ReferenceError
};

regularFunc(1, 2, 3);
```

## Template Literals

### 5. What are template literals?

Template literals provide enhanced string capabilities with backticks.

```javascript
// Basic usage
const name = "John";
const greeting = `Hello, ${name}!`;

// Multi-line strings
const multiLine = `
  This is a
  multi-line string
  with indentation preserved
`;

// Expression evaluation
const a = 5, b = 10;
const result = `Sum: ${a + b}, Product: ${a * b}`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), '');
}

const highlighted = highlight`Hello ${name}, you have ${42} messages`;
console.log(highlighted); // "Hello <mark>John</mark>, you have <mark>42</mark> messages"
```

## Destructuring

### 6. What is destructuring assignment?

Destructuring allows unpacking values from arrays or properties from objects into distinct variables.

```javascript
// Array destructuring
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1, 2, 3

// Skipping values
const [x, , z] = [1, 2, 3];
console.log(x, z); // 1, 3

// Rest pattern
const [first, ...rest] = [1, 2, 3, 4];
console.log(first, rest); // 1, [2, 3, 4]

// Default values
const [p = 10, q = 20] = [5];
console.log(p, q); // 5, 20

// Object destructuring
const user = { name: "John", age: 30, city: "NYC" };
const { name, age, city } = user;
console.log(name, age, city); // "John", 30, "NYC"

// Renaming variables
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // "John", 30

// Nested destructuring
const data = {
  user: { name: "John", age: 30 },
  settings: { theme: "dark" }
};

const {
  user: { name },
  settings: { theme }
} = data;

console.log(name, theme); // "John", "dark"
```

## Spread and Rest Operators

### 7. What are the spread and rest operators?

Both use `...` but serve different purposes:

- **Spread**: Expands iterables into individual elements
- **Rest**: Collects multiple elements into an array

```javascript
// Spread with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Spread with objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Function calls
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Rest parameters
function sumAll(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Mixed usage
function multiply(multiplier, ...numbers) {
  return numbers.map(num => num * multiplier);
}
console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]
```

## Classes

### 8. What are ES6 classes?

Classes are syntactic sugar over JavaScript's prototype-based inheritance.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }

  static createAnimal(name) {
    return new Animal(name);
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }

  // Override toString
  toString() {
    return `${super.toString()} and is a ${this.breed}`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak()); // "Buddy barks"
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
```

### 9. What are getters and setters in classes?

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter
  set fullName(name) {
    const [first, last] = name.split(' ');
    this.firstName = first;
    this.lastName = last;
  }

  // Computed property names
  get ['full' + 'Name']() {
    return this.fullName;
  }
}

const person = new Person("John", "Doe");
console.log(person.fullName); // "John Doe"

person.fullName = "Jane Smith";
console.log(person.firstName); // "Jane"
console.log(person.lastName);  // "Smith"
```

## Modules

### 10. What are ES6 modules?

ES6 modules provide a standardized way to organize and share code.

```javascript
// math.js - Module exporting functions
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export const PI = 3.14159;

// Default export
export default function subtract(a, b) {
  return a - b;
}

// app.js - Importing modules
import subtract, { add, multiply, PI } from './math.js';

console.log(add(2, 3));        // 5
console.log(multiply(4, 5));   // 20
console.log(PI);               // 3.14159
console.log(subtract(10, 3));  // 7

// Importing everything
import * as MathUtils from './math.js';
console.log(MathUtils.add(1, 2)); // 5

// Dynamic imports (returns Promise)
import('./math.js').then(module => {
  console.log(module.add(1, 2));
});
```

## Promises and Async/Await

### 11. What are Promises?

Promises represent the eventual completion or failure of an asynchronous operation.

```javascript
// Creating a Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("Operation successful!");
    } else {
      reject(new Error("Operation failed!"));
    }
  }, 1000);
});

// Using a Promise
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Operation completed"));

// Promise.all - All must resolve
Promise.all([
  fetch('/api/user'),
  fetch('/api/posts')
])
.then(results => console.log("All resolved", results))
.catch(error => console.error("One failed", error));

// Promise.race - First to resolve/reject
Promise.race([
  fetch('/api/fast'),
  fetch('/api/slow')
])
.then(result => console.log("First result", result));

// Promise.allSettled - Wait for all, regardless of success/failure
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success")
])
.then(results => console.log(results));
// [{status: "fulfilled", value: "Success"}, {status: "rejected", reason: "Error"}, ...]
```

### 12. What is async/await?

Async/await is syntactic sugar over Promises for cleaner asynchronous code.

```javascript
// Async function declaration
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Async function expression
const fetchUserData2 = async () => {
  const response = await fetch('/api/user');
  return await response.json();
};

// Async arrow function
const fetchData = async url => {
  const response = await fetch(url);
  return await response.json();
};

// Using async functions
async function processData() {
  try {
    console.log("Starting...");
    const userData = await fetchUserData();
    console.log("User data:", userData);

    const postsData = await fetchData('/api/posts');
    console.log("Posts data:", postsData);

    console.log("All done!");
  } catch (error) {
    console.error("Error in processData:", error);
  }
}

processData();

// Top-level await (in modules)
const result = await fetchData('/api/config');
console.log("Config loaded:", result);
```

### 13. How do you handle errors with async/await?

```javascript
// Method 1: try-catch blocks
async function safeAsyncOperation() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    // Handle error or re-throw
    throw new Error("Operation failed");
  }
}

// Method 2: Catching at call site
async function callSafeOperation() {
  try {
    const result = await safeAsyncOperation();
    console.log("Success:", result);
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

// Method 3: Promise.catch equivalent
safeAsyncOperation()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Handling multiple async operations
async function processMultiple() {
  const promises = [
    fetch('/api/users').catch(err => ({ error: err.message })),
    fetch('/api/posts').catch(err => ({ error: err.message })),
    fetch('/api/comments').catch(err => ({ error: err.message }))
  ];

  const results = await Promise.all(promises);
  console.log("Results:", results);
}
```

## Symbols and Iterators

### 14. What are Symbols?

Symbols are unique and immutable primitive values, often used as object property keys.

```javascript
// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol("description");
const sym3 = Symbol("description");

// Symbols are unique
console.log(sym2 === sym3); // false

// Symbol as object property
const obj = {};
const key = Symbol("key");
obj[key] = "value";
obj["regularKey"] = "regular value";

console.log(obj[key]);           // "value"
console.log(obj["regularKey"]);  // "regular value"
console.log(Object.keys(obj));   // ["regularKey"] - symbols not included

// Getting symbol properties
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(key)]

// Well-known symbols
const arr = [1, 2, 3];

// Symbol.iterator
const iterator = arr[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }

// Custom iterator
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

for (let num of new Range(1, 3)) {
  console.log(num); // 1, 2, 3
}
```

## Maps and Sets

### 15. What are Maps and Sets?

**Map**: Key-value pairs where keys can be any type.
**Set**: Collection of unique values.

```javascript
// Map
const map = new Map();

// Setting values
map.set("name", "John");
map.set(42, "Answer");
map.set({ key: "object" }, "object value");

console.log(map.get("name"));     // "John"
console.log(map.get(42));         // "Answer"
console.log(map.size);            // 3

// Iterating over Map
for (let [key, value] of map) {
  console.log(key, value);
}

// Map methods
console.log(map.has("name"));     // true
map.delete("name");
console.log(map.has("name"));     // false

// Convert to/from objects
const obj = { a: 1, b: 2 };
const mapFromObj = new Map(Object.entries(obj));
console.log(mapFromObj.get("a")); // 1

const objFromMap = Object.fromEntries(mapFromObj);
console.log(objFromMap); // { a: 1, b: 2 }

// Set
const set = new Set([1, 2, 3, 1, 2]); // Duplicates removed
console.log(set); // Set { 1, 2, 3 }
console.log(set.size); // 3

set.add(4);
set.add(4); // Ignored (duplicate)
console.log(set.has(4)); // true

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// Union
const union = new Set([...setA, ...setB]);
console.log(union); // Set { 1, 2, 3, 4, 5 }

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set { 3 }

// Difference
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // Set { 1, 2 }
```

## Proxies and Reflect

### 16. What are Proxies?

Proxies allow you to intercept and customize operations on objects.

```javascript
const target = {
  name: "John",
  age: 30
};

// Handler object
const handler = {
  // Intercept property access
  get(target, property) {
    console.log(`Accessing property: ${property}`);
    return target[property];
  },

  // Intercept property assignment
  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`);
    target[property] = value;
    return true; // Indicate success
  },

  // Intercept property deletion
  deleteProperty(target, property) {
    console.log(`Deleting property: ${property}`);
    delete target[property];
    return true;
  },

  // Intercept 'in' operator
  has(target, property) {
    console.log(`Checking if ${property} exists`);
    return property in target;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name);    // Logs: "Accessing property: name", returns "John"
proxy.age = 31;            // Logs: "Setting age to 31"
delete proxy.name;          // Logs: "Deleting property: name"
console.log("name" in proxy); // Logs: "Checking if name exists", returns false
```

### 17. What is the Reflect API?

Reflect provides methods for interceptable JavaScript operations.

```javascript
const obj = { a: 1, b: 2 };

// Instead of direct operations
console.log(obj.a);           // Direct access
obj.c = 3;                    // Direct assignment

// Using Reflect
console.log(Reflect.get(obj, "a"));           // 1
Reflect.set(obj, "c", 3);                     // true
console.log(Reflect.has(obj, "c"));           // true
console.log(Reflect.ownKeys(obj));            // ["a", "b", "c"]

// Reflect with Proxies
const handler = {
  get(target, property) {
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    return Reflect.set(target, property, value);
  }
};

const proxy = new Proxy(obj, handler);
console.log(proxy.a); // 1 (via Reflect.get)
proxy.d = 4;          // (via Reflect.set)
```

## ES2020+ Features

### 18. What are optional chaining and nullish coalescing?

```javascript
const user = {
  profile: {
    name: "John",
    address: {
      city: "NYC"
    }
  }
};

// Optional chaining (?.) - prevents errors if property doesn't exist
console.log(user.profile?.name);         // "John"
console.log(user.profile?.age);          // undefined (no error)
console.log(user.settings?.theme);       // undefined (no error)

// Nullish coalescing (??) - provides default only for null/undefined
const theme = user.settings?.theme ?? "light"; // "light"
const name = user.profile?.name ?? "Anonymous"; // "John"

// Comparison with ||
const count = 0;
console.log(count || 10);     // 10 (0 is falsy)
console.log(count ?? 10);     // 0 (0 is not nullish)
```

### 19. What are BigInt and dynamic imports?

```javascript
// BigInt for large integers
const bigNum = 123456789012345678901234567890n;
const anotherBig = BigInt("123456789012345678901234567890");
console.log(bigNum + anotherBig); // 246913578024691357802469135780n

// Mixing BigInt with Number requires conversion
const num = 42;
console.log(bigNum + BigInt(num)); // 123456789012345678901234567932n

// Dynamic imports
async function loadModule() {
  try {
    const module = await import('./utils.js');
    module.doSomething();
  } catch (error) {
    console.error("Failed to load module:", error);
  }
}

// Conditional loading
if (condition) {
  import('./feature.js').then(module => {
    module.init();
  });
}
```

### 20. What are private class fields?

```javascript
class Counter {
  #count = 0;        // Private field
  #incrementBy = 1;  // Private field

  constructor(incrementBy = 1) {
    this.#incrementBy = incrementBy;
  }

  increment() {
    this.#count += this.#incrementBy;
    return this.#count;
  }

  get count() {
    return this.#count;
  }

  // Private methods
  #reset() {
    this.#count = 0;
  }

  reset() {
    this.#reset();
  }
}

const counter = new Counter(2);
counter.increment();     // 2
counter.increment();     // 4
console.log(counter.count); // 4

// console.log(counter.#count); // SyntaxError: Private field access
// counter.#reset();            // SyntaxError: Private method access
```
