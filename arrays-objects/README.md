# Array and Object Methods Interview Questions

## Table of Contents
1. [Array Methods](#array-methods)
2. [Object Methods](#object-methods)
3. [Array/Object Manipulation](#array-object-manipulation)
4. [Advanced Patterns](#advanced-patterns)

## Array Methods

### 1. What are the different ways to create arrays?

```javascript
// Array literal
const arr1 = [1, 2, 3, 4, 5];

// Array constructor
const arr2 = new Array(5);        // [empty × 5]
const arr3 = new Array(1, 2, 3);  // [1, 2, 3]

// Array.of() - creates array with given elements
const arr4 = Array.of(5);         // [5]

// Array.from() - creates array from iterable/array-like
const arr5 = Array.from("hello"); // ["h", "e", "l", "l", "o"]
const arr6 = Array.from({ length: 3 }, (_, i) => i + 1); // [1, 2, 3]

// Spread operator
const arr7 = [...arr1, 6, 7];     // [1, 2, 3, 4, 5, 6, 7]

// Array destructuring
const [first, ...rest] = arr1;
console.log(first, rest); // 1, [2, 3, 4, 5]
```

### 2. What are mutating vs non-mutating array methods?

**Mutating methods** modify the original array:
- `push()`, `pop()`, `shift()`, `unshift()`
- `splice()`, `sort()`, `reverse()`
- `fill()`

**Non-mutating methods** return new array/copy:
- `concat()`, `slice()`, `map()`, `filter()`
- `reduce()`, `reduceRight()`
- `flat()`, `flatMap()`

```javascript
const arr = [1, 2, 3];

// Mutating
arr.push(4);        // arr = [1, 2, 3, 4]
arr.splice(1, 1);   // arr = [1, 3, 4]

// Non-mutating
const doubled = arr.map(x => x * 2);     // [2, 6, 8]
const filtered = arr.filter(x => x > 2); // [3, 4]
const sliced = arr.slice(1, 3);          // [3, 4]

// Original array unchanged
console.log(arr); // [1, 3, 4]
```

### 3. Explain `map()`, `filter()`, and `reduce()`

```javascript
const numbers = [1, 2, 3, 4, 5];

// map() - transforms each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - keeps elements that pass test
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce() - accumulates values
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const max = numbers.reduce((max, num) => num > max ? num : max);
console.log(max); // 5

// Chaining methods
const result = numbers
  .filter(num => num % 2 === 0)  // [2, 4]
  .map(num => num * 3)           // [6, 12]
  .reduce((sum, num) => sum + num, 0); // 18

console.log(result); // 18
```

### 4. What are `splice()`, `slice()`, and `split()`?

```javascript
const arr = [1, 2, 3, 4, 5];

// splice(start, deleteCount, ...items) - MUTATES original array
const removed = arr.splice(2, 2, 'a', 'b'); // Remove 2 elements, add 'a', 'b'
console.log(arr);     // [1, 2, 'a', 'b', 5]
console.log(removed); // [3, 4]

// slice(start, end) - NON-MUTATING
const sliced = arr.slice(1, 4); // Extract elements from index 1 to 3
console.log(arr);     // [1, 2, 'a', 'b', 5] (unchanged)
console.log(sliced);  // [2, 'a', 'b']

// split() - String method, not array method
const str = "hello world";
const words = str.split(" ");    // ["hello", "world"]
const chars = str.split("");     // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```

### 5. How do you flatten nested arrays?

```javascript
const nested = [1, [2, [3, 4]], 5];

// ES2019 flat() - specify depth
console.log(nested.flat());     // [1, 2, [3, 4], 5]
console.log(nested.flat(2));    // [1, 2, 3, 4, 5]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5]

// flatMap() - flat + map
const arr = [1, 2, 3];
const flatMapped = arr.flatMap(x => [x, x * 2]);
console.log(flatMapped); // [1, 2, 2, 4, 3, 6]

// Traditional approach
function flatten(arr, depth = 1) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) && depth > 0
      ? flatten(item, depth - 1)
      : item);
  }, []);
}

console.log(flatten(nested, 2)); // [1, 2, 3, 4, 5]

// Recursive flatten all levels
function flattenAll(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenAll(item) : item);
  }, []);
}

console.log(flattenAll(nested)); // [1, 2, 3, 4, 5]
```

### 6. What are `find()`, `findIndex()`, and `includes()`?

```javascript
const users = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Bob", age: 35 }
];

// find() - returns first element that matches
const user = users.find(user => user.age > 28);
console.log(user); // { id: 2, name: "Jane", age: 30 }

// findIndex() - returns index of first matching element
const index = users.findIndex(user => user.name === "Bob");
console.log(index); // 2

// includes() - checks if array contains element
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.includes(3));    // true
console.log(numbers.includes(6));    // false
console.log(numbers.includes(3, 3)); // false (search from index 3)

// For objects, includes() uses === comparison
const obj = { name: "John" };
const arr = [obj];
console.log(arr.includes(obj));     // true
console.log(arr.includes({ name: "John" })); // false (different object)
```

### 7. How do you sort arrays?

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// sort() - MUTATES original array
const sorted = [...numbers].sort(); // [1, 1, 2, 3, 4, 5, 6, 9]

// Custom sort function
const ascending = [...numbers].sort((a, b) => a - b);  // [1, 1, 2, 3, 4, 5, 6, 9]
const descending = [...numbers].sort((a, b) => b - a); // [9, 6, 5, 4, 3, 2, 1, 1]

// String sorting
const strings = ["Banana", "apple", "Cherry"];
strings.sort(); // ["Banana", "Cherry", "apple"] (ASCII order)
strings.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
// ["apple", "Banana", "Cherry"]

// Object sorting
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Bob", age: 20 }
];

users.sort((a, b) => a.age - b.age);
// [{name: "Bob", age: 20}, {name: "John", age: 25}, {name: "Jane", age: 30}]

// Stable sort (ES2019)
const items = [
  { name: "A", priority: 1 },
  { name: "B", priority: 1 },
  { name: "C", priority: 2 }
];
items.sort((a, b) => a.priority - b.priority);
// Maintains relative order for equal elements
```

### 8. What are `some()` and `every()`?

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - returns true if AT LEAST ONE element passes test
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

const hasNegative = numbers.some(num => num < 0);
console.log(hasNegative); // false

// every() - returns true if ALL elements pass test
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // false

const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

// Practical examples
const users = [
  { name: "John", age: 25, active: true },
  { name: "Jane", age: 30, active: false },
  { name: "Bob", age: 35, active: true }
];

// Check if any user is inactive
const hasInactiveUsers = users.some(user => !user.active);
console.log(hasInactiveUsers); // true

// Check if all users are adults
const allAdults = users.every(user => user.age >= 18);
console.log(allAdults); // true

// Check if array is empty
const isEmpty = [].every(() => true); // true (vacuous truth)
const hasItems = [].some(() => true); // false
```

## Object Methods

### 9. What are the different ways to create objects?

```javascript
// Object literal
const obj1 = {
  name: "John",
  age: 30,
  greet() { return `Hello, I'm ${this.name}`; }
};

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const obj2 = new Person("John", 30);

// Object.create()
const proto = {
  greet() { return `Hello, I'm ${this.name}`; }
};
const obj3 = Object.create(proto);
obj3.name = "John";
obj3.age = 30;

// Class (ES6)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() { return `Hello, I'm ${this.name}`; }
}
const obj4 = new Person("John", 30);

// Factory function
function createPerson(name, age) {
  return {
    name,
    age,
    greet() { return `Hello, I'm ${this.name}`; }
  };
}
const obj5 = createPerson("John", 30);
```

### 10. What are `Object.keys()`, `Object.values()`, and `Object.entries()`?

```javascript
const user = {
  name: "John",
  age: 30,
  city: "NYC",
  active: true
};

// Object.keys() - returns array of property names
console.log(Object.keys(user)); // ["name", "age", "city", "active"]

// Object.values() - returns array of property values
console.log(Object.values(user)); // ["John", 30, "NYC", true]

// Object.entries() - returns array of [key, value] pairs
console.log(Object.entries(user));
// [["name", "John"], ["age", 30], ["city", "NYC"], ["active", true]]

// Practical usage
// Iterate over object properties
Object.keys(user).forEach(key => {
  console.log(`${key}: ${user[key]}`);
});

// Transform object
const upperCased = Object.fromEntries(
  Object.entries(user).map(([key, value]) => [
    key.toUpperCase(),
    typeof value === 'string' ? value.toUpperCase() : value
  ])
);
console.log(upperCased);
// { NAME: "JOHN", AGE: 30, CITY: "NYC", ACTIVE: true }

// Filter object properties
const filtered = Object.fromEntries(
  Object.entries(user).filter(([key, value]) => typeof value === 'string')
);
console.log(filtered); // { name: "John", city: "NYC" }
```

### 11. What are `Object.assign()` and spread operator for objects?

```javascript
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

// Object.assign() - copies properties from sources to target
const result1 = Object.assign({}, target, source1, source2);
console.log(result1); // { a: 1, b: 3, c: 5, d: 6 }

// Spread operator (preferred for shallow copy/merge)
const result2 = { ...target, ...source1, ...source2 };
console.log(result2); // { a: 1, b: 3, c: 5, d: 6 }

// Deep copy with spread (shallow copy only)
const nested = {
  a: { b: 1 },
  c: 2
};

const shallowCopy = { ...nested };
shallowCopy.a.b = 999;
console.log(nested.a.b); // 999 (modified!)

const deepCopy = JSON.parse(JSON.stringify(nested));
deepCopy.a.b = 888;
console.log(nested.a.b); // 999 (unchanged)

// Object.assign() vs spread
// Both create shallow copies
const obj1 = Object.assign({}, nested);
const obj2 = { ...nested };

// Practical usage: default props
function createUser(options) {
  const defaults = {
    name: "Anonymous",
    age: 18,
    active: true
  };

  return { ...defaults, ...options };
}

console.log(createUser({ name: "John", age: 25 }));
// { name: "John", age: 25, active: true }
```

### 12. What are `Object.freeze()`, `Object.seal()`, and `Object.preventExtensions()`?

```javascript
const obj = { name: "John", age: 30 };

// Object.preventExtensions() - prevents adding new properties
Object.preventExtensions(obj);
obj.city = "NYC"; // Ignored in strict mode, fails silently otherwise
console.log(obj); // { name: "John", age: 30 }

// Can modify existing properties
obj.age = 31; // Works
console.log(Object.isExtensible(obj)); // false

// Object.seal() - prevents adding/removing properties
const sealed = { a: 1, b: 2 };
Object.seal(sealed);
sealed.c = 3; // Ignored
delete sealed.a; // Ignored
sealed.b = 999; // Works - can modify
console.log(sealed); // { a: 1, b: 999 }
console.log(Object.isSealed(sealed)); // true

// Object.freeze() - prevents any changes
const frozen = { x: 1, y: 2 };
Object.freeze(frozen);
frozen.z = 3; // Ignored
frozen.x = 999; // Ignored
delete frozen.y; // Ignored
console.log(frozen); // { x: 1, y: 2 }
console.log(Object.isFrozen(frozen)); // true

// Deep freeze
function deepFreeze(obj) {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}

const nested = { a: { b: 1 } };
deepFreeze(nested);
nested.a.b = 999; // TypeError: Cannot assign to read only property
```

### 13. What are property descriptors?

```javascript
const obj = {};

// Define property with descriptor
Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: true,      // can change value
  enumerable: true,    // appears in for...in/Object.keys
  configurable: true   // can delete/change descriptor
});

// Get property descriptor
const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(descriptor);
// { value: 'John', writable: true, enumerable: true, configurable: true }

// Different property types
Object.defineProperty(obj, 'age', {
  value: 30,
  writable: false,     // cannot change
  enumerable: false,   // hidden
  configurable: false  // cannot delete
});

console.log(obj.age); // 30
obj.age = 31;         // Ignored (or error in strict mode)
console.log(Object.keys(obj)); // ['name'] - age not enumerable

// Getter/setter properties
Object.defineProperty(obj, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ');
  },
  enumerable: true,
  configurable: true
});

obj.fullName = "John Doe";
console.log(obj.firstName); // "John"
console.log(obj.lastName);  // "Doe"
console.log(obj.fullName);  // "John Doe"

// Define multiple properties
Object.defineProperties(obj, {
  city: { value: 'NYC', writable: true, enumerable: true },
  country: { value: 'USA', writable: false, enumerable: true }
});
```

## Array/Object Manipulation

### 14. How do you remove duplicates from arrays?

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];

// Method 1: Set
const unique1 = [...new Set(arr)];
console.log(unique1); // [1, 2, 3, 4, 5]

// Method 2: filter() + indexOf()
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(unique2); // [1, 2, 3, 4, 5]

// Method 3: reduce()
const unique3 = arr.reduce((unique, item) => {
  return unique.includes(item) ? unique : [...unique, item];
}, []);
console.log(unique3); // [1, 2, 3, 4, 5]

// Method 4: forEach() with object
function removeDuplicates(arr) {
  const seen = {};
  const result = [];
  arr.forEach(item => {
    if (!seen[item]) {
      seen[item] = true;
      result.push(item);
    }
  });
  return result;
}
console.log(removeDuplicates(arr)); // [1, 2, 3, 4, 5]

// For objects (by property)
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "John" } // duplicate
];

const uniqueUsers = users.filter((user, index, self) =>
  index === self.findIndex(u => u.id === user.id)
);
console.log(uniqueUsers); // [{id: 1, name: "John"}, {id: 2, name: "Jane"}]
```

### 15. How do you merge arrays and objects?

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// Array merging
// Method 1: concat() - non-mutating
const merged1 = arr1.concat(arr2, arr3);
console.log(merged1); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Method 2: spread operator
const merged2 = [...arr1, ...arr2, ...arr3];
console.log(merged2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Method 3: push with spread
const merged3 = [];
merged3.push(...arr1, ...arr2, ...arr3);
console.log(merged3); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Object merging
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { c: 5, d: 6 };

// Method 1: Object.assign() - mutates first argument
const mergedObj1 = Object.assign({}, obj1, obj2, obj3);
console.log(mergedObj1); // { a: 1, b: 3, c: 5, d: 6 }

// Method 2: spread operator
const mergedObj2 = { ...obj1, ...obj2, ...obj3 };
console.log(mergedObj2); // { a: 1, b: 3, c: 5, d: 6 }

// Deep merge
function deepMerge(target, source) {
  const result = { ...target };

  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  });

  return result;
}

const deepObj1 = { a: { b: 1 } };
const deepObj2 = { a: { c: 2 } };
console.log(deepMerge(deepObj1, deepObj2)); // { a: { b: 1, c: 2 } }
```

### 16. How do you copy arrays and objects?

```javascript
const arr = [1, 2, { a: 3 }];
const obj = { x: 1, y: { z: 2 } };

// Shallow copy arrays
const arrShallow1 = arr.slice();
const arrShallow2 = [...arr];
const arrShallow3 = Array.from(arr);

// Shallow copy objects
const objShallow1 = Object.assign({}, obj);
const objShallow2 = { ...obj };

// Modify shallow copy
arrShallow1[2].a = 999;
console.log(arr[2].a); // 999 (original modified!)

objShallow1.y.z = 888;
console.log(obj.y.z); // 888 (original modified!)

// Deep copy
// Method 1: JSON (works for JSON-serializable data)
const arrDeep1 = JSON.parse(JSON.stringify(arr));
const objDeep1 = JSON.parse(JSON.stringify(obj));

arrDeep1[2].a = 777;
console.log(arr[2].a); // 999 (original unchanged)

// Method 2: Custom deep copy
function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepCopy(item));
  if (typeof obj === 'object') {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key]);
    });
    return copy;
  }
}

const arrDeep2 = deepCopy(arr);
const objDeep2 = deepCopy(obj);

// Method 3: Structured clone (limited browser support)
const arrDeep3 = structuredClone ? structuredClone(arr) : deepCopy(arr);
```

## Advanced Patterns

### 17. What are some advanced array patterns?

```javascript
// Array destructuring with defaults
const [a = 1, b = 2, c = 3] = [10];
console.log(a, b, c); // 10, 2, 3

// Swapping values
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// Ignoring values
const [, second, , fourth] = [1, 2, 3, 4, 5];
console.log(second, fourth); // 2, 4

// Array methods chaining
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = data
  .filter(num => num % 2 === 0)    // [2, 4, 6, 8, 10]
  .map(num => num * num)           // [4, 16, 36, 64, 100]
  .reduce((sum, num) => sum + num, 0); // 220

// Group by category
const people = [
  { name: 'John', age: 25, city: 'NYC' },
  { name: 'Jane', age: 30, city: 'LA' },
  { name: 'Bob', age: 25, city: 'NYC' }
];

const groupBy = (arr, key) =>
  arr.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});

console.log(groupBy(people, 'age'));
// { 25: [{name: 'John', ...}, {name: 'Bob', ...}], 30: [{name: 'Jane', ...}] }

// Partition array
const partition = (arr, predicate) =>
  arr.reduce(([pass, fail], item) => {
    return predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]];
  }, [[], []]);

const [even, odd] = partition([1, 2, 3, 4, 5, 6], num => num % 2 === 0);
console.log(even, odd); // [2, 4, 6] [1, 3, 5]

// Array to object conversion
const arr = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(arr);
console.log(obj); // { a: 1, b: 2, c: 3 }

// Object to array conversion
const obj2 = { x: 10, y: 20, z: 30 };
const arr2 = Object.entries(obj2);
console.log(arr2); // [['x', 10], ['y', 20], ['z', 30]]
```

### 18. How do you work with nested objects?

```javascript
const user = {
  name: "John",
  profile: {
    personal: {
      age: 30,
      address: {
        city: "NYC",
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      }
    },
    work: {
      company: "Tech Corp",
      position: "Developer"
    }
  }
};

// Safe property access (optional chaining)
console.log(user.profile?.personal?.address?.city); // "NYC"
console.log(user.profile?.social?.twitter); // undefined

// Deep property access with reduce
function get(obj, path, defaultValue = undefined) {
  return path.split('.').reduce((current, key) =>
    current?.[key], obj) ?? defaultValue;
}

console.log(get(user, 'profile.personal.address.city')); // "NYC"
console.log(get(user, 'profile.social.twitter', 'Not found')); // "Not found"

// Set deep property
function set(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    current[key] = current[key] || {};
    return current[key];
  }, obj);
  target[lastKey] = value;
  return obj;
}

set(user, 'profile.personal.hobbies', ['reading', 'coding']);
console.log(user.profile.personal.hobbies); // ['reading', 'coding']

// Flatten nested object
function flatten(obj, prefix = '') {
  let result = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(result, flatten(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

const flat = flatten(user);
console.log(flat);
// { name: "John", profile.personal.age: 30, profile.personal.address.city: "NYC", ... }
```
