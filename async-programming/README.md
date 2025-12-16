# Asynchronous Programming Interview Questions

## Table of Contents

### [JavaScript Event Loop](#javascript-event-loop)
1. [What is the Event Loop?](#1-what-is-the-event-loop)
2. [Call Stack, Task Queue, Microtask Queue](#2-call-stack-task-queue-microtask-queue)
3. [Macrotasks vs Microtasks](#3-macrotasks-vs-microtasks)

### [Promises](#promises)
4. [Promise States](#4-promise-states)
5. [Creating and Using Promises](#5-creating-and-using-promises)
6. [Promise Chaining](#6-promise-chaining)
7. [Promise Methods: all, race, allSettled](#7-promise-methods-all-race-allsettled)
8. [Promise Error Handling](#8-promise-error-handling)

### [Async/Await](#asyncawait)
9. [Async Functions](#9-async-functions)
10. [Await Operator](#10-await-operator)
11. [Error Handling with Async/Await](#11-error-handling-with-async-await)
12. [Async vs Promise vs Callback](#12-async-vs-promise-vs-callback)

### [Callbacks and Callback Hell](#callbacks-and-callback-hell)
13. [Callback Functions](#13-callback-functions)
14. [Callback Hell Problem](#14-callback-hell-problem)
15. [Solving Callback Hell](#15-solving-callback-hell)

### [Advanced Patterns](#advanced-patterns)
16. [Generator Functions with Async](#16-generator-functions-with-async)
17. [Async Iterators](#17-async-iterators)
18. [Observable Pattern](#18-observable-pattern)
19. [Debouncing and Throttling](#19-debouncing-and-throttling)

---

## JavaScript Event Loop

### 1. What is the Event Loop?

The **Event Loop** is a fundamental concept in JavaScript that handles asynchronous operations. It continuously monitors the **call stack** and **task queues**, ensuring that JavaScript remains non-blocking despite being single-threaded.

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise callback');
});

console.log('End');

// Output:
// Start
// End
// Promise callback
// Timeout callback
```

### 2. Call Stack, Task Queue, Microtask Queue

**Call Stack**: Executes synchronous code
```javascript
function foo() {
  console.log('foo');
}

function bar() {
  foo();
  console.log('bar');
}

bar();
// Stack: [bar] -> [bar, foo] -> [bar] -> []
// Output: foo, bar
```

**Task Queue (Macrotasks)**: For setTimeout, setInterval, I/O operations
**Microtask Queue**: For Promises, MutationObserver, process.nextTick (Node.js)

```javascript
console.log('Script start');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

console.log('Script end');

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout
```

### 3. Macrotasks vs Microtasks

| Feature | Macrotasks | Microtasks |
|---------|------------|------------|
| **Priority** | Lower | Higher |
| **Execution** | After current macrotask | After current task |
| **Examples** | setTimeout, setInterval, I/O | Promises, MutationObserver |
| **Queue Processing** | One per event loop tick | All in current tick |

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 0);

Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => {
  console.log('Promise 2');
  Promise.resolve().then(() => console.log('Promise 3'));
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Promise 3
// Timeout 1
// Timeout 2
```

---

## Promises

### 4. Promise States

A Promise can be in one of three states:

```javascript
const promise = new Promise((resolve, reject) => {
  // Pending state - initial state
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve('Success!'); // Fulfilled state
    } else {
      reject('Error!'); // Rejected state
    }
  }, 1000);
});

// States are immutable - once fulfilled or rejected, stays that way
```

**States:**
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### 5. Creating and Using Promises

```javascript
// Creating a Promise
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`HTTP ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send();
  });
}

// Using a Promise
fetchData('https://api.example.com/data')
  .then(data => {
    console.log('Data received:', data);
    return JSON.parse(data); // Return value for chaining
  })
  .then(parsedData => {
    console.log('Parsed data:', parsedData);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Operation completed');
  });
```

### 6. Promise Chaining

```javascript
// Sequential operations
function authenticateUser(credentials) {
  return fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }).then(response => response.json());
}

function getUserProfile(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json());
}

function getUserPosts(userId) {
  return fetch(`/api/users/${userId}/posts`)
    .then(response => response.json());
}

// Chaining promises
authenticateUser({ email: 'user@example.com', password: 'pass' })
  .then(user => {
    console.log('Authenticated:', user.name);
    return getUserProfile(user.id);
  })
  .then(profile => {
    console.log('Profile:', profile);
    return getUserPosts(profile.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => {
    console.error('Authentication failed:', error);
  });
```

### 7. Promise Methods: all, race, allSettled

```javascript
// Promise.all - waits for all promises to resolve
Promise.all([
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
.then(results => {
  const [user, posts, comments] = results;
  console.log('All data loaded');
})
.catch(error => {
  console.error('One request failed:', error);
});

// Promise.race - resolves/rejects with first settled promise
Promise.race([
  fetch('/api/fast-endpoint'),
  fetch('/api/slow-endpoint'),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
])
.then(result => console.log('Fastest result:', result))
.catch(error => console.log('All failed or timeout'));

// Promise.allSettled - waits for all to settle (ES2020)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
])
.then(results => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Promise ${index} fulfilled:`, result.value);
    } else {
      console.log(`Promise ${index} rejected:`, result.reason);
    }
  });
});
```

### 8. Promise Error Handling

```javascript
// Method 1: .catch() at the end
doAsyncOperation()
  .then(result => processResult(result))
  .then(finalResult => displayResult(finalResult))
  .catch(error => {
    console.error('Error occurred:', error);
    handleError(error);
  });

// Method 2: .catch() in the middle for specific handling
fetchUserData(userId)
  .then(user => validateUser(user))
  .catch(validationError => {
    // Handle validation errors specifically
    console.error('Validation failed:', validationError);
    return getDefaultUser(); // Provide fallback
  })
  .then(user => fetchUserPosts(user.id))
  .catch(generalError => {
    console.error('General error:', generalError);
  });

// Method 3: Error handling in .then()
promise
  .then(
    result => console.log('Success:', result),
    error => console.log('Error handled in then:', error)
  );

// Best practice: Always handle errors
function safeAsyncOperation() {
  return riskyOperation()
    .catch(error => {
      logError(error);
      throw error; // Re-throw to allow caller to handle
    });
}
```

---

## Async/Await

### 9. Async Functions

```javascript
// Async function declaration
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Async function expression
const fetchUserData = async function(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

// Async arrow function
const fetchUserData = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

// Async class method
class UserService {
  async getUser(userId) {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
}
```

### 10. Await Operator

```javascript
async function processUserData() {
  console.log('Start processing');

  // Await pauses execution until promise resolves
  const user = await fetchUser(123);
  console.log('User fetched:', user.name);

  const posts = await fetchPosts(user.id);
  console.log('Posts fetched:', posts.length);

  const comments = await fetchComments(posts[0].id);
  console.log('Comments fetched:', comments.length);

  return {
    user,
    posts,
    comments
  };
}

// Await works with any thenable
async function example() {
  const promise = Promise.resolve('Hello');
  const result = await promise; // 'Hello'

  const number = await 42; // 42 (non-promise values work too)
}

// Sequential vs Parallel execution
async function sequentialExecution() {
  const user1 = await fetchUser(1);    // Wait 1s
  const user2 = await fetchUser(2);    // Wait another 1s
  // Total: 2s
}

async function parallelExecution() {
  const [user1, user2] = await Promise.all([
    fetchUser(1),  // Both start simultaneously
    fetchUser(2)
  ]);
  // Total: 1s
}
```

### 11. Error Handling with Async/Await

```javascript
// Method 1: try/catch blocks
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error.message);
    throw error; // Re-throw for caller to handle
  }
}

// Method 2: Handling multiple async operations
async function processMultipleRequests() {
  try {
    const [user, posts, comments] = await Promise.allSettled([
      fetchUser(),
      fetchPosts(),
      fetchComments()
    ]);

    // Handle each result individually
    if (user.status === 'fulfilled') {
      console.log('User:', user.value);
    } else {
      console.error('User fetch failed:', user.reason);
    }

    return { user, posts, comments };
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Method 3: Conditional error handling
async function smartFetch(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      // Network error
      throw new Error('Network connection failed');
    } else if (error.message.includes('HTTP')) {
      // HTTP error
      throw new Error('Server error');
    } else {
      throw error;
    }
  }
}
```

### 12. Async vs Promise vs Callback

```javascript
// Callback approach (callback hell)
function getUserData(callback) {
  getUser(function(user) {
    getPosts(user.id, function(posts) {
      getComments(posts[0].id, function(comments) {
        callback({ user, posts, comments });
      }, function(error) { callback(null, error); });
    }, function(error) { callback(null, error); });
  }, function(error) { callback(null, error); });
}

// Promise approach
function getUserData() {
  return getUser()
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => ({ user, posts, comments }));
}

// Async/await approach (syntactic sugar over promises)
async function getUserData() {
  try {
    const user = await getUser();
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage comparison
// Callback
getUserData(function(result, error) {
  if (error) console.error(error);
  else console.log(result);
});

// Promise
getUserData()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Async/await
(async () => {
  try {
    const result = await getUserData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
```

---

## Callbacks and Callback Hell

### 13. Callback Functions

```javascript
// Synchronous callback
function greet(name, callback) {
  console.log(`Hello ${name}!`);
  callback();
}

function sayGoodbye() {
  console.log('Goodbye!');
}

greet('John', sayGoodbye);

// Asynchronous callback
function fetchData(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => callback(null, xhr.responseText);
  xhr.onerror = () => callback(new Error('Request failed'));
  xhr.send();
}

fetchData('https://api.example.com/data', (error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', data);
  }
});

// Higher-order function with callback
function mapArray(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

const doubled = mapArray([1, 2, 3], num => num * 2);
console.log(doubled); // [2, 4, 6]
```

### 14. Callback Hell Problem

```javascript
// Callback hell example
getUser(userId, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      getLikes(comments[0].id, function(likes) {
        displayData({
          user: user,
          post: posts[0],
          comment: comments[0],
          likes: likes
        });
      }, function(error) {
        console.error('Error getting likes:', error);
      });
    }, function(error) {
      console.error('Error getting comments:', error);
    });
  }, function(error) {
    console.error('Error getting posts:', error);
  });
}, function(error) {
  console.error('Error getting user:', error);
});

// Problems:
// 1. Deep nesting (pyramid of doom)
// 2. Error handling scattered throughout
// 3. Hard to read and maintain
// 4. Difficult to modify flow
// 5. No clear return values
```

### 15. Solving Callback Hell

```javascript
// Solution 1: Named functions (break down complexity)
function handleUser(user) {
  getPosts(user.id, handlePosts.bind(null, user));
}

function handlePosts(user, posts) {
  getComments(posts[0].id, handleComments.bind(null, user, posts[0]));
}

function handleComments(user, post, comments) {
  getLikes(comments[0].id, handleLikes.bind(null, user, post, comments[0]));
}

function handleLikes(user, post, comment, likes) {
  displayData({ user, post, comment, likes });
}

function handleError(error) {
  console.error('Error:', error);
}

getUser(userId, handleUser, handleError);

// Solution 2: Promises
function getUserData(userId) {
  return getUser(userId)
    .then(user => getPosts(user.id).then(posts => ({ user, posts })))
    .then(({ user, posts }) =>
      getComments(posts[0].id).then(comments => ({ user, posts, comments }))
    )
    .then(({ user, posts, comments }) =>
      getLikes(comments[0].id).then(likes => ({ user, posts, comments, likes }))
    );
}

// Solution 3: Async/await
async function getUserData(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    const likes = await getLikes(comments[0].id);

    return { user, posts, comments, likes };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

---

## Advanced Patterns

### 16. Generator Functions with Async

```javascript
// Generator function for async operations
function* asyncGenerator() {
  try {
    const user = yield fetch('/api/user').then(r => r.json());
    console.log('User:', user);

    const posts = yield fetch(`/api/posts/${user.id}`).then(r => r.json());
    console.log('Posts:', posts);

    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
  }
}

// Helper function to run generator
function runGenerator(generator) {
  const iterator = generator();

  function handle(result) {
    if (result.done) return result.value;

    return Promise.resolve(result.value)
      .then(res => handle(iterator.next(res)))
      .catch(err => handle(iterator.throw(err)));
  }

  return handle(iterator.next());
}

// Usage
runGenerator(asyncGenerator).then(result => {
  console.log('Final result:', result);
});
```

### 17. Async Iterators

```javascript
// Async iterator example
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

// Using async iterator
(async () => {
  for await (const num of asyncRange(1, 5)) {
    console.log('Number:', num);
  }
})();

// Custom async iterator
class AsyncDataLoader {
  constructor(urls) {
    this.urls = urls;
  }

  async *[Symbol.asyncIterator]() {
    for (const url of this.urls) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
      } catch (error) {
        console.error(`Error loading ${url}:`, error);
        yield null;
      }
    }
  }
}

const loader = new AsyncDataLoader([
  '/api/users',
  '/api/posts',
  '/api/comments'
]);

(async () => {
  for await (const data of loader) {
    if (data) {
      console.log('Loaded data:', data);
    }
  }
})();
```

### 18. Observable Pattern

```javascript
// Simple Observable implementation
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
    return {
      unsubscribe: () => {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
          this.observers.splice(index, 1);
        }
      }
    };
  }

  next(value) {
    this.observers.forEach(observer => {
      try {
        observer(value);
      } catch (error) {
        console.error('Observer error:', error);
      }
    });
  }
}

// Async data stream
class AsyncDataStream extends Observable {
  constructor() {
    super();
    this.isActive = false;
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;

    const pollData = async () => {
      if (!this.isActive) return;

      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        this.next(data);
      } catch (error) {
        this.next({ error });
      }

      setTimeout(pollData, 1000);
    };

    pollData();
  }

  stop() {
    this.isActive = false;
  }
}

// Usage
const stream = new AsyncDataStream();
const subscription = stream.subscribe(data => {
  if (data.error) {
    console.error('Stream error:', data.error);
  } else {
    console.log('New data:', data);
  }
});

stream.start();

// Cleanup after 10 seconds
setTimeout(() => {
  subscription.unsubscribe();
  stream.stop();
}, 10000);
```

### 19. Debouncing and Throttling

```javascript
// Debounce: delays execution until after delay has passed
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle: ensures function executes at most once per interval
function throttle(func, interval) {
  let lastCallTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCallTime >= interval) {
      lastCallTime = now;
      func.apply(this, args);
    }
  };
}

// Async-aware versions
function debounceAsync(func, delay) {
  let timeoutId;
  return function(...args) {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const result = await func.apply(this, args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

function throttleAsync(func, interval) {
  let lastCallTime = 0;
  let lastPromise = null;

  return function(...args) {
    const now = Date.now();

    if (now - lastCallTime >= interval) {
      lastCallTime = now;
      lastPromise = func.apply(this, args);
      return lastPromise;
    }

    return lastPromise;
  };
}

// Usage examples
const debouncedSearch = debounce(async (query) => {
  const results = await searchAPI(query);
  updateUI(results);
}, 300);

const throttledScroll = throttle(() => {
  console.log('Scroll event');
  updateScrollPosition();
}, 100);

const asyncDebouncedSearch = debounceAsync(async (query) => {
  return await searchAPI(query);
}, 300);

// Event listeners
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

window.addEventListener('scroll', throttledScroll);
```

**[⬆️ Back to Top](#asynchronous-programming-interview-questions)**
