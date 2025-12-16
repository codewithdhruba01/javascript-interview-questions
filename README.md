# JavaScript Interview Questions
A complete collection of **JavaScript interview questions and answers**, explained with code examples and easy-to-understand concepts.  
Perfect for developers preparing for interviews or revising JavaScript fundamentals.

---

> Prepare for real interviews with 100+ curated JavaScript problems, runnable in your browser. Every question is selected and reviewed by experienced ex-FAANG interviewers so you practise what actually shows up in interviews — not filler content. We promise: no AI-generated fluff and no fake reviews — just high-quality problems, thoughtful explanations, and honest feedback to level up your interview game.

## 📋 Table of Contents

| No. | Questions |
|-----|------------|
| 1 | [What is JavaScript?](#1-what-is-javascript) |
| 2 | [What are the different data types in JavaScript?](#2-what-are-the-different-data-types-in-javascript) |
| 3 | [How do you declare variables in JavaScript?](#3-how-do-you-declare-variables-in-javascript) |
| 4 | [What is the difference between `let`, `const`, and `var`?](#4-what-is-the-difference-between-let-const-and-var) |
| 5 | [What is the `typeof` operator used for?](#5-what-is-the-typeof-operator-used-for) |
| 6 | [What is NaN in JavaScript?](#6-what-is-nan-in-javascript) |
| 7 | [What is a callback function?](#7-what-is-a-callback-function) |
| 8 | [What is event delegation in JavaScript?](#8-what-is-event-delegation-in-javascript) |
| 9 | [Explain the concept of prototypal inheritance in JavaScript.](#9-explain-the-concept-of-prototypal-inheritance-in-javascript) |
| 10 | [What is the `this` keyword in JavaScript?](#10-what-is-the-this-keyword-in-javascript) |
| 11 | [What are JavaScript promises?](#11-what-are-javascript-promises) |
| 12 | [Explain the difference between `null` and `undefined` in JavaScript.](#12-explain-the-difference-between-null-and-undefined-in-javascript) |
| 13 | [What is the event loop in JavaScript?](#13-what-is-the-event-loop-in-javascript) |
| 14 | [Explain the concept of event-driven programming in JavaScript.](#14-explain-the-concept-of-event-driven-programming-in-javascript) |
| 15 | [What is the difference between synchronous and asynchronous JavaScript?](#15-what-is-the-difference-between-synchronous-and-asynchronous-javascript) |
| 16 | [How do you handle errors in JavaScript?](#16-how-do-you-handle-errors-in-javascript) |
| 17 | [What are JavaScript modules and how do they improve code organization?](#17-what-are-javascript-modules-and-how-do-they-improve-code-organization) |
| 18 | [What are generators in JavaScript?](#18-what-are-generators-in-javascript) |
| 19 | [What are arrow functions in JavaScript?](#19-what-are-arrow-functions-in-javascript) |
| 20 | [Explain the concept of currying in JavaScript.](#20-explain-the-concept-of-currying-in-javascript) |
| 21 | [What is memoization and how is it useful in JavaScript?](#21-what-is-memoization-and-how-is-it-useful-in-javascript) |
| 22 | [What is a prototype chain?](#22-what-is-a-prototype-chain) |
| 23 | [What is a first-class function?](#23-what-is-a-first-class-function) |
| 24 | [What is a higher-order function?](#24-what-is-a-higher-order-function) |
| 25 | [What are lambda expressions or arrow functions?](#25-what-are-lambda-expressions-or-arrow-functions) |
| 26 | [What is the difference between let and var?](#26-what-is-the-difference-between-let-and-var) |
| 27 | [How do you decode or encode a URL in JavaScript?](#27-how-do-you-decode-or-encode-a-url-in-javascript) |
| 28 | [What is memoization](#28-what-is-memoization) |
| 29 | [What is Hoisting](#29-what-is-hoisting) |
| 30 | [Explain the JavaScript event loop and how microtasks differ from macrotasks.](#30-what-is-the-javascript-event-loop) |
| 31 | [What is the DOM in JavaScript? ](#31-what-is-the-dom-in-javascript) |
| 32 | [How do you select an element by its ID in JavaScript?](#32-how-do-you-select-an-element-by-its-id-in-javascript) |
| 33 | [What are arrow functions in JavaScript?](#33-what-are-arrow-functions-in-javascript) |
| 34 | [What is a pure function ?](#34-what-is-a-pure-function-in-javascript) |
| 35 | [What are classes in ES6](#35-what-are-classes-in-es6) |
| 36 | [What are modules?](#36-what-are-modules) |
| 37 | [What is scope in javascript?](#37-what-is-scope-in-javascript) |
| 38 | [Why do you need modules?](#38-why-do-you-need-modules) |
| 39 | [How do you manipulate DOM using a service worker](#39-how-do-you-manipulate-dom-using-a-service-worker)
| 40 | [What is a post message?](#40-what-is-a-post-message)
| 41 | [What is a Cookie?](#41-what-is-a-cookie)
| 42 | [What is a promise?](#42-what-is-a-promise)
| 43 | [Why do we need a Promise in JavaScript](#43-why-do-we-need-a-promise-in-javascript)
| 44 | [What are Closures](#44-what-are-closures)
| 45 | [What is IndexedDB](#45-what-is-indexedDB)
| 46 | [What is Collation?](#46-what-is-collation)
| 47 | [Why do you need web storage](#47-why-do-you-need-web-storage)
| 48 | [How do you delete a cookie](#48-how-do-you-delete-a-cookie)
| 49 | [What is promise.all](#49-what-is-promise.all)
| 50 | [What is undefined property](#50-what-is-undefined-property)

---

### 1. What is JavaScript?

JavaScript is a high-level, interpreted programming language used to make web pages dynamic and interactive.  
It runs in browsers and on servers (with Node.js).

**Features:**
- Dynamic typing  
- Prototype-based object orientation  
- Event-driven and asynchronous  
- Lightweight and flexible  

**Example:**
```javascript
console.log("Hello, JavaScript!");
````

[🔝 Back to Top](#-table-of-contents)

---

### 2. What are the different data types in JavaScript?

JavaScript supports **primitive** and **non-primitive** data types.

| Type      | Example                 |
| --------- | ----------------------- |
| String    | `"Hello"`               |
| Number    | `42`                    |
| Boolean   | `true`                  |
| Undefined | `let a;`                |
| Null      | `let b = null;`         |
| Symbol    | `Symbol("id")`          |
| BigInt    | `12345678901234567890n` |
| Object    | `{ name: "John" }`      |

**Example:**

```javascript
let name = "John";
let age = 30;
let isLogged = true;
let user = { name, age };
console.log(typeof user); // "object"
```

[🔝 Back to Top](#-table-of-contents)

---

### 3. How do you declare variables in JavaScript?

You can declare variables using `var`, `let`, or `const`.

```javascript
var city = "Delhi";   // function scoped
let age = 25;         // block scoped
const country = "India"; // constant, cannot be reassigned
```

[🔝 Back to Top](#-table-of-contents)

---

### 4. What is the difference between `let`, `const`, and `var`?

| Feature    | var       | let                    | const                  |
| ---------- | --------- | ---------------------- | ---------------------- |
| Scope      | Function  | Block                  | Block                  |
| Re-declare | Allowed |  Not allowed          |  Not allowed          |
| Re-assign  | Allowed |  Allowed              |  Not allowed          |
| Hoisting   | Yes     |  Yes (uninitialized) |  Yes (uninitialized) |

**Example:**

```javascript
function example() {
  console.log(a); // undefined
  var a = 10;
  let b = 20;
  const c = 30;
  console.log(a, b, c);
}
example();
```

[🔝 Back to Top](#-table-of-contents)

---

### 5. What is the `typeof` operator used for?

It returns the **data type** of a variable.

```javascript
typeof 123;         // "number"
typeof "Hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object"
typeof {};          // "object"
typeof Symbol();    // "symbol"
```

[🔝 Back to Top](#-table-of-contents)

---

### 6. What is NaN in JavaScript?

`NaN` stands for **Not-a-Number** and indicates invalid number results.

```javascript
console.log(0 / 0);        // NaN
console.log(parseInt("A")); // NaN
console.log(typeof NaN);   // "number"
```

[🔝 Back to Top](#-table-of-contents)

---

### 7. What is a callback function?

A **callback function** is a function passed as an argument to another function, to be executed later.

**Example:**

```javascript
function greet(name, callback) {
  console.log("Hi " + name);
  callback();
}

function bye() {
  console.log("Goodbye!");
}

greet("John", bye);
```

[🔝 Back to Top](#-table-of-contents)

---

### 8. What is event delegation in JavaScript?

Event delegation allows you to handle events at a **parent level** instead of adding listeners to individual child elements.

**Example:**

```javascript
document.getElementById("list").addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    console.log("You clicked on:", e.target.textContent);
  }
});
```

This approach improves **performance** and **maintainability**.

[🔝 Back to Top](#-table-of-contents)

---

### 9. Explain the concept of prototypal inheritance in JavaScript.

JavaScript objects can inherit properties and methods from other objects using the **prototype chain**.

**Example:**

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log("Hello, I'm " + this.name);
};
const user = new Person("Alice");
user.greet(); // Hello, I'm Alice
```

[🔝 Back to Top](#-table-of-contents)

---

### 10. What is the `this` keyword in JavaScript?

`this` refers to the **object that owns the current execution context**.

| Context               | Value of `this`                       |
| --------------------- | ------------------------------------- |
| Global                | `window` (browser)                    |
| Inside a function     | `undefined` (in strict mode)          |
| Inside object method  | That object                           |
| Inside arrow function | Lexical `this` (inherits from parent) |

**Example:**

```javascript
const user = {
  name: "John",
  show() {
    console.log(this.name);
  },
};
user.show(); // John
```

[🔝 Back to Top](#-table-of-contents)

---

### 11. What are JavaScript promises?

A **Promise** represents a value that may be available now, later, or never.
It helps handle **asynchronous operations**.

**States:**

* Pending
* Fulfilled
* Rejected

**Example:**

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});

promise.then(result => console.log(result)); // Done!
```

[🔝 Back to Top](#-table-of-contents)

---

### 12. Explain the difference between `null` and `undefined` in JavaScript.

| Feature | `null`                       | `undefined`                        |
| ------- | ---------------------------- | ---------------------------------- |
| Meaning | Intentional absence of value | Variable declared but not assigned |
| Type    | Object                       | Undefined                          |
| Example | `let a = null;`              | `let b;`                           |

**Example:**

```javascript
let a = null;
let b;
console.log(a, typeof a); // null "object"
console.log(b, typeof b); // undefined "undefined"
```

[🔼 Back to Top](#-table-of-contents)

---

### 13. What is the event loop in JavaScript?

The **event loop** handles asynchronous code execution by monitoring the **call stack** and **callback queue**.

**Flow:**

1. JS executes synchronous code (call stack)
2. Async callbacks go to task queue
3. Event loop moves them to stack when free

**Example:**

```javascript
console.log("Start");
setTimeout(() => console.log("Async Task"), 0);
console.log("End");
// Output: Start → End → Async Task
```

[🔼 Back to Top](#-table-of-contents)


### 14. Explain the concept of event-driven programming in JavaScript.

Event-driven programming is a paradigm where the flow of the program is determined by events — such as user actions (clicks, keypresses), messages from other programs, or sensor outputs.

**Example:**

```javascript
document.getElementById("btn").addEventListener("click", () => {
  console.log("Button was clicked!");
});
```

Here, the function only executes **when** the click event happens.

**Key Points:**

* JavaScript is event-driven.
* It uses **event listeners** and **callbacks**.
* Allows asynchronous, interactive behavior on webpages.

[🔼 Back to Top](#-table-of-contents)

---

### 15. What is the difference between synchronous and asynchronous JavaScript?

| Feature   | Synchronous              | Asynchronous                      |
| --------- | ------------------------ | --------------------------------- |
| Execution | Code runs line-by-line   | Code can skip ahead while waiting |
| Blocking  | Blocks further execution | Non-blocking                      |
| Example   | Loops, calculations      | API calls, file I/O               |

**Example:**

```javascript
console.log("Start");

setTimeout(() => console.log("Async Task"), 2000);

console.log("End");
```

**Output:**

```
Start
End
Async Task
```

[🔼 Back to Top](#-table-of-contents)

---

### 16. How do you handle errors in JavaScript?

You can use **try...catch...finally** blocks or **Promise `.catch()`** for async code.

**Example:**

```javascript
try {
  let result = riskyOperation();
} catch (error) {
  console.error("Something went wrong:", error);
} finally {
  console.log("Operation completed");
}
```

**Also:**

```javascript
fetch("https://api.example.com")
  .then(res => res.json())
  .catch(err => console.error("Error fetching:", err));
```

[🔼 Back to Top](#-table-of-contents)

---

### 17. What are JavaScript modules and how do they improve code organization?

Modules allow splitting JavaScript code into separate files to improve maintainability.

**Example:**

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from './math.js';
console.log(add(2, 3)); // 5
```

 **Benefits:**

* Code reusability
* Clear organization
* Avoids global scope pollution

[🔼 Back to Top](#-table-of-contents)

---

### 18. What are generators in JavaScript?

Generators are special functions that can pause and resume their execution using the `yield` keyword.

**Example:**

```javascript
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const counter = count();
console.log(counter.next().value); // 1
```

> **Use Case:** Useful for lazy evaluation and asynchronous iteration.

[🔼 Back to Top](#-table-of-contents)

---

### 19. What are arrow functions in JavaScript?

Arrow functions are a shorter syntax for writing functions introduced in ES6.

**Example:**

```javascript
const add = (a, b) => a + b;
console.log(add(5, 10)); // 15
```

 **Advantages:**

* Concise syntax
* Lexically binds `this`
* Great for callbacks and inline functions

[🔼 Back to Top](#-table-of-contents)

---

### 20. Explain the concept of currying in JavaScript.

Currying transforms a function with multiple arguments into a sequence of functions that take one argument each.

**Example:**

```javascript
function curry(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curry(2)(3)(4)); // 9
```

 **Benefits:**

* Reusability
* Function composition
* Delayed execution

[🔼 Back to Top](#-table-of-contents)

---

### 21. What is memoization and how is it useful in JavaScript?

Memoization is an optimization technique to cache results of expensive function calls.

**Example:**

```javascript
function memoize(fn) {
  const cache = {};
  return function(x) {
    if (x in cache) return cache[x];
    return (cache[x] = fn(x));
  };
}

const square = memoize(x => x * x);
console.log(square(4)); // Computed
console.log(square(4)); // Cached
```

[🔼 Back to Top](#-table-of-contents)

---

### 22. What is a prototype chain?

The prototype chain is the mechanism through which objects inherit properties and methods from other objects.

**Example:**

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello ${this.name}`;
};

const user = new Person("John");
console.log(user.greet()); // Hello John
```

 **Inheritance works via** `__proto__` links between objects.

[🔼 Back to Top](#-table-of-contents)

---

### 23. What is a first-class function?

Functions in JavaScript are treated like variables — they can be passed as arguments, returned, and assigned.

**Example:**

```javascript
function greet(name) {
  return `Hello ${name}`;
}

function logGreeting(fn) {
  console.log(fn("Alice"));
}

logGreeting(greet);
```

[🔼 Back to Top](#-table-of-contents)

---

### 24. What is a higher-order function?

A higher-order function takes one or more functions as arguments or returns a function.

**Example:**

```javascript
function multiplier(factor) {
  return function(num) {
    return num * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```

[🔼 Back to Top](#-table-of-contents)

---

### 25. What are lambda expressions or arrow functions?

Arrow functions (`=>`) are a type of lambda expression — a compact way to define anonymous functions.

**Example:**

```javascript
const greet = name => `Hello, ${name}!`;
console.log(greet("John"));
```

**Difference:** Arrow functions do not have their own `this` or `arguments` binding.

[🔼 Back to Top](#-table-of-contents)

---

### 26. What is the difference between `let` and `var`?

You can list out the differences in a **tabular format**.

| var                                         | let                         |
| ------------------------------------------- | --------------------------- |
| Available since the beginning of JavaScript | Introduced in ES6           |
| Function scoped                             | Block scoped                |
| Hoisted and initialized as undefined        | Hoisted but not initialized |
| Can be re-declared                          | Cannot be re-declared       |

**Example:**

```javascript
function userDetails(username) {
  if (username) {
    console.log(salary); // undefined due to hoisting
    // console.log(age); // ReferenceError: Cannot access 'age' before initialization
    let age = 30;
    var salary = 10000;
  }
  console.log(salary); // 10000 (function scope)
  // console.log(age); // Error: age is not defined (block scope)
}
userDetails("John");
```

[🔼 Back to Top](#-table-of-contents)

---

### 27. How do you decode or encode a URL in JavaScript?

`encodeURI()` function is used to encode a URL. This function requires a URL string as a parameter and returns that encoded string.
`decodeURI()` function is used to decode a URL. This function requires an encoded URL string as a parameter and returns that decoded string.

> **Note:** If you want to encode characters such as `/ ? : @ & = + $ #`, then you need to use `encodeURIComponent()` instead of `encodeURI()`.

```javascript
let uri = "employeeDetails?name=john&occupation=manager";
let encoded_uri = encodeURI(uri);
let decoded_uri = decodeURI(encoded_uri);

console.log("Encoded URI:", encoded_uri);
console.log("Decoded URI:", decoded_uri);
```

[🔼 Back to Top](#-table-of-contents)


---

### 28. What is memoization

Memoization is a functional programming technique that attempts to increase a function’s performance by caching its previously computed results.
Each time a memoized function is called, its parameters are used to index the cache.
If the data is already present, it returns the cached result without executing the entire function again.
Otherwise, the function is executed and the new result is added to the cache.

Let’s take an example of an adding function with memoization:

```javascript
const memoizeAddition = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value]; // Here, cache.value cannot be used as property name starts with a number
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};

// returned function from memoizeAddition
const addition = memoizeAddition();
console.log(addition(20)); // output: 40 calculated
console.log(addition(20)); // output: 40 cached
```

[🔼 Back to Top](#-table-of-contents)

---

### 29. What is Hoisting

Hoisting is a JavaScript mechanism where variables, function declarations, and classes are moved to the top of their scope before code execution.
Remember that JavaScript only hoists **declarations**, not **initializations**.

Let’s take a simple example of variable hoisting:

```javascript
console.log(message); // output: undefined
var message = "The variable has been hoisted";
```

The above code looks like this to the interpreter:

```javascript
var message;
console.log(message);
message = "The variable has been hoisted";
```

In the same fashion, function declarations are hoisted too:

```javascript
message("Good morning"); // Good morning

function message(name) {
  console.log(name);
}
```


[🔼 Back to Top](#-table-of-contents)

---

### 30. What is the JavaScript Event Loop

JavaScript is **single-threaded**, meaning it executes one piece of code at a time on a single main thread.
To handle asynchronous operations (like `setTimeout`, `fetch`, or `Promises`), JavaScript uses the **event loop**.

The **event loop** continuously checks:

1. If the **call stack** (where JS executes functions) is empty.
2. If the **task queues** have any pending callbacks to run.
3. It then **takes the next task** from the queue and pushes it onto the call stack.

### The Two Types of Task Queues

There are **two major queues** where async callbacks are placed:

#### 1. **Macrotasks (a.k.a. Tasks)**

These are large, independent units of work.
Examples:

* `setTimeout()`
* `setInterval()`
* `setImmediate()` (Node.js)
* `I/O events`
* `requestAnimationFrame()`

>After each macrotask, the event loop checks for microtasks before moving to the next one.

#### 2. **Microtasks**

Microtasks are smaller, higher-priority tasks meant to run **immediately after the current execution context**, before any new macrotask starts.

Examples:

* `Promise.then()`, `Promise.catch()`, `Promise.finally()`
* `queueMicrotask()`
* `MutationObserver`

>All queued microtasks run **right after the current script or macrotask finishes**, and before the next macrotask starts.

### Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Macrotask");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask");
});

console.log("End");
```

**Output:**

```
Start
End
Microtask
Macrotask
```

[🔼 Back to Top](#-table-of-contents)

---

### 31. What is the DOM in JavaScript
The DOM (Document Object Model) is a representation of the HTML structure as 
objects, allowing JavaScript to interact with and manipulate the content and layout.

[🔼 Back to Top](#-table-of-contents)

---

### 32. How do you select an element by its ID in JavaScript
Use `document.getElementById('id')` to select an element by its ID. 

* **How do you add a class to an HTML element using JavaScript?** </br>
-> Use `element.classList.add('class-name')` to add a class to an element.
  
* **How do you remove an element from the DOM in JavaScript?** </br>
-> Use `element.remove()` to remove an element from the DOM.

* **How do you change the text content of an element in JavaScript?** </br>
-> Use `element.textContent = 'New text'` to change the text of an element.
  
* **What is a for loop in JavaScript?** </br>
-> A for loop is used to execute a block of code a certain number of times. Example: for 
`(let i = 0; i < 5; i++)`  `{ console.log(i); }`.

* **What is an if-else statement in JavaScript?** </br>
-> An `if-else` statement executes a block of code if a condition is true, otherwise it runs 
the code in the `else` block.

* **What is the purpose of the switch statement in JavaScript?** </br>
-> A `switch` statement allows you to execute different blocks of code based on the value 
of a variable.

* **What is a while loop in JavaScript?** </br>
-> A `while` loop repeatedly executes a block of code as long as a specified condition is 
true.

* **How do you exit a loop in JavaScript?** </br>
-> Use the `break` statement to exit a loop prematurely.

[🔼 Back to Top](#-table-of-contents)

---

### 33. What are arrow functions in JavaScript
Arrow functions are a shorthand syntax for writing functions in JavaScript. Example: 
``const add = (a, b) => a + b;``.

* **What is destructuring in JavaScript?** </br>
-> Destructuring allows you to extract values from arrays or objects into variables. 
Example: `const [a, b] = [1, 2];`.

* **What is template literals in JavaScript?** </br>
-> Template literals are string literals that allow embedded expressions, using backticks (``) 
and ${} for placeholders.

* **What are default parameters in JavaScript?** </br>
-> Default parameters allow you to initialize function parameters with default values if no 
value is passed. 

* **What is the spread operator in JavaScript?** </br>
-> The `spread` operator (...) allows an iterable to expand in places where multiple 
arguments are expected.

* **What is the rest parameter in JavaScript?** </br>
-> The `rest` parameter (...args) allows you to pass an indefinite number of arguments 
to a function.

* **What are promises in JavaScript?** </br>
-> Promises represent asynchronous operations that either resolve or reject. Example: 
`new Promise((resolve, reject) => {})`.

[🔼 Back to Top](#-table-of-contents)

---

### 34. What is a Pure Function in JavaScript

A **pure function** is a function whose output depends *only* on its input arguments and produces **no side effects**.
This means:

* Given the **same inputs**, it will always return the **same output**.
* It does **not modify any external variables, objects, or state**.

To understand this better, let’s compare pure and impure functions.

## **Example: Pure Function vs. Impure Function**

### **Impure Function**

```js
let numbers = [];

const impureAdd = (num) => {
  return numbers.push(num);
};
```

### **Pure Function**

```js
const pureAdd = (num) => (arr) => {
  return arr.concat([num]);
};
```

### **Usage**

```js
console.log(impureAdd(5));  // Output: 1
console.log(numbers);       // Output: [5]

console.log(pureAdd(10)(numbers)); // Output: [5, 10]
console.log(numbers);              // Still [5]
```

## **Explanation**

### **Why impureAdd is impure?**

* It modifies the **external array** `numbers`.
* Each call changes the program's overall state.
* The returned value depends on how many times the function was called earlier.

Because it alters something outside itself, it is **not a pure function**.

### **Why pureAdd is pure?**

* It never changes the original array.
* Instead, it **creates and returns a new array** with the added value.
* Same input → same output, with no side effects.

[🔼 Back to Top](#-table-of-contents)

---

### 35. What are classes in ES6

In ES6, JavaScript classes are mainly **syntactic sugar** over JavaScript’s prototype-based inheritance. Before ES6, inheritance was done using function constructors and prototypes, like this:

```js
function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has " + this.color + " color";
};
```

With ES6, the same structure can be written more cleanly using the `class` syntax:

```js
class Bike {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  getDetails() {
    return this.model + " bike has " + this.color + " color";
  }
}
```

[🔼 Back to Top](#-table-of-contents)

---

### 36. What are modules
Modules refer to small units of independent, reusable code and also act as the foundation of many JavaScript design patterns. Most of the JavaScript modules export an object literal, a function, or a constructor

[🔼 Back to Top](#-table-of-contents)

---

### 37. What is scope in javascript
Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. In other words, scope determines the visibility of variables and other resources in areas of your code.

[🔼 Back to Top](#-table-of-contents)

---

### 38. Why do you need modules

We need modules in JavaScript because they help:

1. **Break code into smaller parts** (easy to manage).
2. **Increase reusability** (use the same code multiple times).
3. **Prevent global scope pollution** (avoid variable conflicts).
4. **Make maintenance easier** (useful in large projects).
5. **Keep code clean, organized, and secure.**

**Conclusion:**
Modules make JavaScript code **organized, reusable, safe, and easier to maintain**.

[🔼 Back to Top](#-table-of-contents)

---

### 39. How do you manipulate DOM using a service worker
Service worker can't access the DOM directly. But it can communicate with the pages it controls by responding to messages sent via the `postMessage` interface, and those pages can manipulate the DOM.

[🔼 Back to Top](#-table-of-contents)

---

### 40. What is a post message
**`postMessage` is a method that allows secure cross-origin communication between different Window objects — such as between a parent page and a popup it opened, or between a webpage and an embedded iframe. Normally, scripts running on different pages cannot access each other unless they follow the same-origin policy, which requires the pages to share the same protocol, host, and port. The `postMessage` API provides a safe way to bypass this restriction and exchange data across different origins.**

[🔼 Back to Top](#-table-of-contents)

---

### 41. **What is a Cookie**

A **cookie in JavaScript** is a **small piece of data** stored in the **browser**.
It is used to **remember the user**, **store login sessions**, **preferences**, or **track activity**.

**In simple words:**

> *Cookie = small data stored in the browser*

> *Example: remembering username, saving theme, storing cart items, or tracking sessions.*

### **JavaScript Example**

#### **1. Set a Cookie**

```js
document.cookie = "username=John; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
```

#### **2. Get All Cookies**

```js
console.log(document.cookie);
```

#### **3. Delete a Cookie**

```js
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
```

[🔼 Back to Top](#-table-of-contents)

---

### 42. What is a promise?
A Promise is a JavaScript object that represents the eventual result of an asynchronous operation—whether it succeeds or fails.
It serves as a placeholder for a value that isn’t available yet but will be provided at some point in the future once the operation completes.

**In simple words:**

> *Promise = an object that guarantees you will get the result in the future*

> It handles the result of async tasks (success or error).

### **3 States of a Promise**

1. **Pending** → The result is not available yet
2. **Fulfilled** → The operation completed successfully
3. **Rejected** → The operation failed (error)

### **Simple Example**

```js
let myPromise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Operation Successful!");
  } else {
    reject("Something went wrong!");
  }
});

myPromise
  .then(result => console.log(result)) // Success case
  .catch(error => console.log(error)); // Error case
```

[🔼 Back to Top](#-table-of-contents)

---

### 43. **Why do we need a Promise in JavaScript**

We need **Promises** to handle **asynchronous operations** in a clean and manageable way.
JavaScript runs tasks one by one, so when something takes time—like fetching data from a server—Promises help us handle the result **without blocking** the rest of the code.


### **Reasons we need Promises**

**1. To handle asynchronous tasks easily**

Example: fetching data from an API, reading files, waiting for timers.

**2. To avoid “callback hell”**

Promises provide `.then()` and `.catch()` instead of deeply nested callback functions.

**3. To write cleaner and more readable code**

Promises, especially with `async/await`, make asynchronous code look like synchronous code.

**4. Better error handling**

`.catch()` handles all errors in one place, making debugging easier.

 **5. Promises chain smoothly**

You can run async operations step-by-step using `.then()` chaining.

[🔼 Back to Top](#-table-of-contents)

---

## 44. What are Closures
A closure is a function that remembers and can access variables from its outer (lexical) scope, even after the outer function has finished executing.
It is created when an inner function uses variables of its enclosing function.

The closure has access to **three scope chains**:

i. **Its own scope** – variables defined inside its curly braces
ii. **Outer function’s scope** – variables of the enclosing function
iii. **Global scope** – globally declared variables

---

### **Example of Closure Concept**

```javascript
function Welcome(name) {
  var greetingInfo = function (message) {
    console.log(message + " " + name);
  };
  return greetingInfo;
}

var myFunction = Welcome("John");

myFunction("Welcome");   // Output: Welcome John
myFunction("Hello Mr."); // Output: Hello Mr. John
```

---

### **Explanation**

In the above code:

* `Welcome()` is the **outer function**
* `greetingInfo()` is the **inner function**
* The inner function uses the variable `name` from the outer function

Even after the `Welcome()` function has finished execution,
the inner function **still remembers and has access to `name`**.

This behavior of remembering variables from the outer scope is called a **closure**.

[🔼 Back to Top](#-table-of-contents)

---

## 45. What is IndexedDB

IndexedDB is a low-level API for client-side storage of larger amounts of structured data, including files/blobs. This API uses indexes to enable high-performance searches of this data.

[🔼 Back to Top](#-table-of-contents)

---

## 46. What is Collation
Collation determines how strings are compared, sorted, and matched. It controls whether text comparison is case-sensitive or case-insensitive and how characters are ordered based on language rules.

**Example:**
In a case-insensitive collation, “Apple” and “apple” are treated as the same, while in case-sensitive collation they are considered different.

[🔼 Back to Top](#-table-of-contents)

---

## 47. Why do you need web storage
Web Storage allows web applications to store data locally in the user’s browser, such as user preferences, login state, or theme settings. It improves performance by reducing server requests and provides a better user experience.

[🔼 Back to Top](#-table-of-contents)

---

## 48. How do you delete a cookie
To delete a cookie, we re-set the same cookie with the same name and path, but with an expiration date in the past, which tells the browser to remove it.

**Example:**

```javascript
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

[🔼 Back to Top](#-table-of-contents)

---

## 49. What is promise.all
`Promise.all()` takes an array of promises and returns a single promise. It resolves with an array of results when all promises succeed, but if any promise rejects, it immediately rejects with that error.

**Example:**

```javascript
Promise.all([
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
.then(results => {
  console.log("All promises resolved", results);
})
.catch(error => {
  console.error("One promise failed", error);
});
```

[🔼 Back to Top](#-table-of-contents)

---

## 50. What is undefined property
In JavaScript, when we try to access an object property that is not defined or a variable that has been declared but not initialized, JavaScript returns undefined.

**Example:**

```javascript
let user = { name: "Dhrub" };

console.log(user.age); // undefined (property does not exist)
```

**Important Points:**

* undefined is a primitive data type
* It means absence of a value
* Different from null (null is intentionally assigned)

[🔼 Back to Top](#-table-of-contents)
