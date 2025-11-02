# JavaScript Interview Questions

A complete collection of **JavaScript interview questions and answers**, explained with code examples and easy-to-understand concepts.  
Perfect for developers preparing for interviews or revising JavaScript fundamentals.

---

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

---

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

[🔝 Back to Top](#-table-of-contents)

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

[🔝 Back to Top](#-table-of-contents)

---

Perfect 👍 — here’s **Part 2 (Questions 14–26)** of your **JavaScript Interview Questions** section, following the same interactive and detailed format you liked (with collapsible answers and “Back to top” links).

You can add this part **below Part 1** in your `README.md` file:

---

### 14. Explain the concept of event-driven programming in JavaScript.

Event-driven programming is a paradigm where the flow of the program is determined by events — such as user actions (clicks, keypresses), messages from other programs, or sensor outputs.

**Example:**

```javascript
document.getElementById("btn").addEventListener("click", () => {
  console.log("Button was clicked!");
});
```

Here, the function only executes **when** the click event happens.

🧩 **Key Points:**

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

🧩 **Output:**

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

🧩 **Also:**

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

🧩 **Benefits:**

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

🧩 **Use Case:** Useful for lazy evaluation and asynchronous iteration.

[🔼 Back to Top](#-table-of-contents)

---

### 19. What are arrow functions in JavaScript?

Arrow functions are a shorter syntax for writing functions introduced in ES6.

**Example:**

```javascript
const add = (a, b) => a + b;
console.log(add(5, 10)); // 15
```

🧩 **Advantages:**

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

🧩 **Benefits:**

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

🧩 **Inheritance works via** `__proto__` links between objects.

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

🧩 **Difference:** Arrow functions do not have their own `this` or `arguments` binding.

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
