# Core JavaScript Interview Questions

## Table of Contents
1. [Data Types and Variables](#data-types-and-variables)
2. [Operators and Expressions](#operators-and-expressions)
3. [Control Structures](#control-structures)
4. [Functions](#functions)
5. [Objects and Prototypes](#objects-and-prototypes)
6. [Scope and Closures](#scope-and-closures)
7. [Error Handling](#error-handling)

## Data Types and Variables

### 1. What are the primitive data types in JavaScript?

JavaScript has 7 primitive data types:
- `string` - "Hello World"
- `number` - 42, 3.14, NaN, Infinity
- `boolean` - true/false
- `undefined` - variable declared but not assigned
- `null` - intentional absence of value
- `symbol` - unique identifiers (ES6)
- `bigint` - for large integers (ES11)

```javascript
let str = "Hello";
let num = 42;
let bool = true;
let undef;
let nul = null;
let sym = Symbol("id");
let big = 12345678901234567890n;

console.log(typeof str);    // "string"
console.log(typeof num);    // "number"
console.log(typeof bool);   // "boolean"
console.log(typeof undef);  // "undefined"
console.log(typeof nul);    // "object" (quirk)
console.log(typeof sym);    // "symbol"
console.log(typeof big);    // "bigint"
```

### 2. What is the difference between `null` and `undefined`?

| Feature | `null` | `undefined` |
|---------|--------|-------------|
| Type | Object | Undefined |
| Assignment | Intentional | Automatic |
| Usage | Empty object reference | Uninitialized variables |
| typeof | "object" | "undefined" |

```javascript
let a = null;        // Explicitly set
let b;              // Not set, undefined
let c = undefined;  // Explicitly set

console.log(a === null);        // true
console.log(b === undefined);   // true
console.log(c === undefined);   // true
console.log(null == undefined); // true (loose equality)
console.log(null === undefined);// false (strict equality)
```

### 3. What are truthy and falsy values?

**Falsy values** (evaluate to false):
- `false`
- `0`, `-0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Truthy values** (evaluate to true):
- Everything else, including:
  - `"0"` (string zero)
  - `"false"` (string false)
  - `[]` (empty array)
  - `{}` (empty object)

```javascript
// Falsy examples
if (false) {}    // false
if (0) {}        // false
if ("") {}       // false
if (null) {}     // false
if (undefined) {}// false
if (NaN) {}      // false

// Truthy examples
if (true) {}     // true
if (1) {}        // true
if ("0") {}      // true
if ("false") {}  // true
if ([]) {}       // true
if ({}) {}       // true
```

### 4. What is type coercion?

Type coercion is the automatic or implicit conversion of values from one data type to another.

```javascript
// String coercion
let str = "Hello " + 42;        // "Hello 42"
let str2 = String(42);          // "42"

// Number coercion
let num = +"42";                // 42
let num2 = Number("42");        // 42

// Boolean coercion
let bool = !!42;                // true
let bool2 = Boolean(42);        // true

// Loose equality with coercion
console.log("42" == 42);        // true (string coerced to number)
console.log("42" === 42);       // false (strict equality)
```

## Operators and Expressions

### 5. What are the different types of operators?

1. **Arithmetic**: `+`, `-`, `*`, `/`, `%`, `**`, `++`, `--`
2. **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`
3. **Comparison**: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
4. **Logical**: `&&`, `||`, `!`
5. **Bitwise**: `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`
6. **Ternary**: `condition ? expr1 : expr2`
7. **Spread/Rest**: `...`

### 6. What is the difference between `==` and `===`?

| Operator | Description | Type Coercion | Example |
|----------|-------------|---------------|---------|
| `==` | Loose equality | Yes | `"42" == 42` → `true` |
| `===` | Strict equality | No | `"42" === 42` → `false` |

```javascript
console.log(42 == "42");     // true (coercion)
console.log(42 === "42");    // false (no coercion)

console.log(false == 0);     // true
console.log(false === 0);    // false

console.log(null == undefined);  // true
console.log(null === undefined); // false
```

### 7. What are short-circuit operators?

**Logical AND (`&&`)**: Returns first falsy value or last truthy value
**Logical OR (`||`)**: Returns first truthy value or last falsy value

```javascript
// AND (&&)
console.log(true && "Hello");     // "Hello"
console.log(false && "Hello");    // false
console.log("Hi" && "Hello");     // "Hello"

// OR (||)
console.log(true || "Hello");     // true
console.log(false || "Hello");    // "Hello"
console.log("Hi" || "Hello");     // "Hi"

// Practical usage
let user = { name: "John" };
let name = user && user.name;      // "John" (safe property access)
let defaultName = user.name || "Anonymous"; // "John"
```

## Control Structures

### 8. What are the different types of loops?

1. **for loop**
2. **while loop**
3. **do-while loop**
4. **for-in loop** (for object properties)
5. **for-of loop** (for iterables)

```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do-while (runs at least once)
do {
  console.log(i);
  i++;
} while (i < 5);

// for-in (object properties)
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key, obj[key]);
}

// for-of (iterables)
const arr = [1, 2, 3, 4, 5];
for (let value of arr) {
  console.log(value);
}
```

### 9. What is the difference between `for-in` and `for-of`?

| Loop | Use Case | Iterates Over | Example Output |
|------|----------|---------------|----------------|
| `for-in` | Objects | Property names | `"a", "b", "c"` |
| `for-of` | Arrays/Iterables | Values | `1, 2, 3` |

```javascript
const arr = [10, 20, 30];
const obj = { a: 10, b: 20, c: 30 };

// for-in with array (not recommended)
for (let index in arr) {
  console.log(index);  // "0", "1", "2"
}

// for-of with array
for (let value of arr) {
  console.log(value);  // 10, 20, 30
}

// for-in with object
for (let key in obj) {
  console.log(key);    // "a", "b", "c"
}
```

## Functions

### 10. What are the different ways to define functions?

```javascript
// Function Declaration
function greet(name) {
  return `Hello ${name}`;
}

// Function Expression
const greet2 = function(name) {
  return `Hello ${name}`;
};

// Arrow Function (ES6)
const greet3 = (name) => `Hello ${name}`;

// Constructor Function
function Person(name) {
  this.name = name;
  this.greet = function() {
    return `Hello ${this.name}`;
  };
}

// Method Definition (ES6)
const obj = {
  greet() {
    return "Hello";
  }
};

// IIFE (Immediately Invoked Function Expression)
const result = (function() {
  return "Hello World";
})();
```

### 11. What are first-class functions?

Functions that can be:
- Assigned to variables
- Passed as arguments
- Returned from other functions
- Stored in data structures

```javascript
// Assigned to variable
const sayHello = () => console.log("Hello");

// Passed as argument
function execute(fn) {
  fn();
}
execute(sayHello);

// Returned from function
function createMultiplier(multiplier) {
  return (num) => num * multiplier;
}
const double = createMultiplier(2);
console.log(double(5)); // 10

// Stored in data structure
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

### 12. What are higher-order functions?

Functions that:
- Take other functions as arguments
- Return functions as results
- Or both

```javascript
// Takes function as argument
function filterArray(arr, predicate) {
  const result = [];
  for (let item of arr) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterArray(numbers, num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// Returns function
function createLogger(prefix) {
  return (message) => console.log(`[${prefix}] ${message}`);
}

const infoLogger = createLogger("INFO");
const errorLogger = createLogger("ERROR");
infoLogger("This is info");    // [INFO] This is info
errorLogger("This is error");  // [ERROR] This is error
```

## Objects and Prototypes

### 13. What is the prototype chain?

JavaScript objects inherit properties and methods through the prototype chain.

```javascript
// Constructor function
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

// Inheritance
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks`;
};

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak()); // "Buddy makes a sound"
console.log(dog.bark());  // "Buddy barks"
```

### 14. What are the different ways to create objects?

```javascript
// Object literal
const obj1 = { name: "John", age: 30 };

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const obj2 = new Person("John", 30);

// Object.create()
const proto = { greet() { return "Hello"; } };
const obj3 = Object.create(proto);
obj3.name = "John";

// Class (ES6)
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const obj4 = new PersonClass("John", 30);

// Factory function
function createPerson(name, age) {
  return {
    name,
    age,
    greet() { return `Hello, I'm ${name}`; }
  };
}
const obj5 = createPerson("John", 30);
```

### 15. What are getters and setters?

Getters and setters allow you to define custom behavior for property access and modification.

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
    const parts = name.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
}

const person = new Person("John", "Doe");
console.log(person.fullName); // "John Doe"

person.fullName = "Jane Smith";
console.log(person.firstName); // "Jane"
console.log(person.lastName);  // "Smith"
```

## Scope and Closures

### 16. What is lexical scope?

Lexical scope means that the scope of a variable is determined by its position in the source code.

```javascript
function outer() {
  const outerVar = "I'm outer";

  function inner() {
    const innerVar = "I'm inner";
    console.log(outerVar); // Can access outer scope
    console.log(innerVar); // Can access own scope
  }

  inner();
  // console.log(innerVar); // ReferenceError: innerVar not defined
}

outer();
```

### 17. What are closures?

A closure is a function that has access to variables in its outer (enclosing) scope, even after the outer function has returned.

```javascript
function createCounter() {
  let count = 0; // Private variable

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2

// count is not accessible directly
// console.log(counter.count); // undefined
```

### 18. What is the difference between `var`, `let`, and `const`?

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisting | Yes | Yes (TDZ) | Yes (TDZ) |
| Reassignment | Yes | Yes | No |
| Redeclaration | Yes | No | No |

```javascript
// var - function scoped
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10
}

// let/const - block scoped
function letExample() {
  if (true) {
    let y = 20;
    const z = 30;
  }
  // console.log(y); // ReferenceError
  // console.log(z); // ReferenceError
}

// Hoisting
console.log(a); // undefined
var a = 10;

// console.log(b); // ReferenceError: Cannot access before initialization
let b = 20;
```

## Error Handling

### 19. What are the different types of errors?

1. **SyntaxError**: Invalid syntax
2. **ReferenceError**: Accessing undefined variable
3. **TypeError**: Operation on wrong type
4. **RangeError**: Number outside range
5. **EvalError**: Error in eval() function
6. **URIError**: Invalid URI operations

```javascript
// SyntaxError
// const x = ; // SyntaxError: Unexpected token ';'

// ReferenceError
// console.log(undefinedVar); // ReferenceError: undefinedVar is not defined

// TypeError
// const num = 42;
// num(); // TypeError: num is not a function

// RangeError
// const arr = [];
// arr.length = -1; // RangeError: Invalid array length

// URIError
// decodeURIComponent('%'); // URIError: URI malformed
```

### 20. How does try-catch-finally work?

```javascript
function riskyOperation() {
  try {
    // Code that might throw an error
    if (Math.random() < 0.5) {
      throw new Error("Random error occurred");
    }
    return "Success";
  } catch (error) {
    // Handle the error
    console.error("Caught error:", error.message);
    return "Error handled";
  } finally {
    // Always executed
    console.log("Cleanup code here");
  }
}

console.log(riskyOperation());
```

### 21. What is error propagation?

Errors bubble up the call stack until caught.

```javascript
function level3() {
  throw new Error("Error in level 3");
}

function level2() {
  level3();
}

function level1() {
  try {
    level2();
  } catch (error) {
    console.log("Caught in level 1:", error.message);
  }
}

level1(); // Caught in level 1: Error in level 3
```

**[🔼 Back to Top](#core-javascript-interview-questions)**

---

## 📚 Explore More Topics

| Topic | Description | Link |
|-------|-------------|------|
| **ES6+ Features** | Modern JavaScript syntax and features | [View ES6+ Questions](../es6-plus/) |
| **Arrays & Objects** | Array methods, object manipulation | [View Array/Object Questions](../arrays-objects/) |
| **DOM & Browser APIs** | Browser interaction and web APIs | [View DOM Questions](../dom-browser-apis/) |
| **Async Programming** | Promises, async/await, event loop | [View Async Questions](../async-programming/) |
| **Node.js** | Server-side JavaScript development | [View Node.js Questions](../node-js/) |
| **React** | Component-based UI development | [View React Questions](../frameworks/) |
| **Testing** | Unit testing, integration testing | [View Testing Questions](../testing/) |
| **Performance** | Optimization techniques | [View Performance Questions](../performance/) |
| **Design Patterns** | Software design patterns | [View Design Pattern Questions](../design-patterns/) |

**[🏠 Back to Main Repository](../README.md)**
