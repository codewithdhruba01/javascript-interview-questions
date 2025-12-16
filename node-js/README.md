# Node.js Interview Questions

## Table of Contents

### [Node.js Fundamentals](#nodejs-fundamentals)
1. [What is Node.js?](#1-what-is-nodejs)
2. [Node.js Architecture](#2-nodejs-architecture)
3. [Event Loop in Node.js](#3-event-loop-in-nodejs)
4. [Global Objects](#4-global-objects)
5. [Modules System](#5-modules-system)

### [File System Operations](#file-system-operations)
6. [Reading Files](#6-reading-files)
7. [Writing Files](#7-writing-files)
8. [File Streams](#8-file-streams)
9. [Directory Operations](#9-directory-operations)
10. [Path Module](#10-path-module)

### [HTTP and Networking](#http-and-networking)
11. [Creating HTTP Server](#11-creating-http-server)
12. [HTTP Client](#12-http-client)
13. [Express.js Framework](#13-expressjs-framework)
14. [Middleware](#14-middleware)
15. [RESTful APIs](#15-restful-apis)

### [Asynchronous Programming](#asynchronous-programming)
16. [Callbacks](#16-callbacks)
17. [Promises](#17-promises)
18. [Async/Await](#18-asyncawait)
19. [Event Emitters](#19-event-emitters)
20. [Streams](#20-streams)

### [Database Integration](#database-integration)
21. [MongoDB with Mongoose](#21-mongodb-with-mongoose)
22. [PostgreSQL with pg](#22-postgresql-with-pg)
23. [Redis](#23-redis)
24. [Database Connection Pooling](#24-database-connection-pooling)
25. [ORM vs Query Builders](#25-orm-vs-query-builders)

### [Security](#security)
26. [Authentication](#26-authentication)
27. [Authorization](#27-authorization)
28. [Input Validation](#28-input-validation)
29. [Helmet.js](#29-helmetjs)
30. [Rate Limiting](#30-rate-limiting)

---

## Node.js Fundamentals

### 1. What is Node.js?

**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code outside of a web browser, enabling server-side development.

**Key Features:**
- **Non-blocking I/O**: Asynchronous operations don't block execution
- **Single-threaded**: Uses event loop for concurrency
- **NPM**: Largest package ecosystem
- **Cross-platform**: Runs on Windows, macOS, Linux
- **V8 Engine**: Same engine as Chrome browser

**Basic Example:**
```javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// Run with: node server.js
```

**Common Use Cases:**
- **Web Servers**: Express.js, Koa, Fastify
- **APIs**: REST, GraphQL
- **Real-time Applications**: Chat apps, gaming
- **Microservices**: Scalable backend services
- **CLI Tools**: Build tools, automation
- **IoT**: Device communication

### 2. Node.js Architecture

**Node.js Architecture Components:**

1. **V8 Engine**: JavaScript execution engine
2. **libuv**: Cross-platform asynchronous I/O library
3. **Event Loop**: Handles asynchronous operations
4. **Thread Pool**: For heavy operations (file I/O, DNS, etc.)
5. **Binding Layer**: Connects JavaScript to C++ APIs

```
┌───────────────────────────┐
│        JavaScript         │
│       Application         │
├───────────────────────────┤
│         Node.js           │
│    (C++ Add-ons, APIs)    │
├───────────────────────────┤
│           V8              │
│    JavaScript Engine      │
├───────────────────────────┤
│         libuv             │
│  (Async I/O, Event Loop)  │
├───────────────────────────┤
│        Operating          │
│         System            │
└───────────────────────────┘
```

**Process Model:**
- **Single Thread**: Main event loop thread
- **Worker Threads**: For CPU-intensive tasks (Node 10.5+)
- **Child Processes**: Spawn separate Node processes
- **Clusters**: Multiple processes sharing port

### 3. Event Loop in Node.js

**Event Loop Phases:**

1. **timers**: Execute `setTimeout` and `setInterval` callbacks
2. **pending callbacks**: Execute I/O callbacks deferred to next loop iteration
3. **idle, prepare**: Internal use
4. **poll**: Retrieve new I/O events
5. **check**: Execute `setImmediate` callbacks
6. **close callbacks**: Execute close event callbacks

```javascript
console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

process.nextTick(() => {
  console.log('nextTick');
});

console.log('End');

// Output:
// Start
// End
// nextTick
// setTimeout
// setImmediate
```

**Execution Order:**
1. **Synchronous code**
2. **`process.nextTick`** callbacks
3. **Microtasks** (Promises)
4. **Timer callbacks**
5. **I/O callbacks**
6. **`setImmediate`** callbacks

### 4. Global Objects

**Important Global Objects:**

```javascript
// Global object (similar to window in browser)
console.log(global);

// Current module information
console.log(__filename); // Full path to current file
console.log(__dirname);  // Full path to current directory

// Process object
console.log(process.version);     // Node.js version
console.log(process.platform);    // Operating system
console.log(process.arch);        // CPU architecture
console.log(process.env);         // Environment variables

// Command line arguments
console.log(process.argv); // Array of command line arguments

// Current working directory
console.log(process.cwd());

// Memory usage
console.log(process.memoryUsage());

// Exit process
process.exit(0); // Success
process.exit(1); // Error

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle signals
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});
```

**Buffer (for binary data):**
```javascript
// Create buffer
const buf1 = Buffer.alloc(10);        // Allocate 10 bytes
const buf2 = Buffer.from('Hello');    // From string
const buf3 = Buffer.from([1, 2, 3]);  // From array

// Manipulate buffer
buf1.write('Hello', 0, 5);
console.log(buf1.toString()); // 'Hello'

// Buffer operations
const buf4 = Buffer.concat([buf2, buf3]);
console.log(buf4); // <Buffer 48 65 6c 6c 6f 01 02 03>
```

### 5. Modules System

**CommonJS (require/module.exports):**
```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
// or
module.exports.add = add;
module.exports.subtract = subtract;

// app.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

**ES6 Modules (import/export):**
```javascript
// math.mjs (or set "type": "module" in package.json)
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export default function multiply(a, b) {
  return a * b;
}

// app.mjs
import multiply, { add, subtract } from './math.mjs';
console.log(add(5, 3)); // 8
console.log(multiply(5, 3)); // 15
```

**Module Loading:**
```javascript
// package.json
{
  "type": "module", // Enable ES6 modules
  "main": "index.js"
}

// Dynamic imports
async function loadModule() {
  try {
    const module = await import('./dynamic-module.js');
    module.doSomething();
  } catch (error) {
    console.error('Failed to load module:', error);
  }
}

// Require with caching
delete require.cache[require.resolve('./module.js')];
const freshModule = require('./module.js');
```

---

## File System Operations

### 6. Reading Files

**Synchronous Reading:**
```javascript
const fs = require('fs');
const path = require('path');

try {
  // Read entire file as string
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);

  // Read as buffer
  const buffer = fs.readFileSync('file.txt');
  console.log(buffer.toString());

  // Read with options
  const data = fs.readFileSync('file.txt', {
    encoding: 'utf8',
    flag: 'r' // read mode
  });
} catch (error) {
  console.error('Error reading file:', error);
}
```

**Asynchronous Reading:**
```javascript
const fs = require('fs');

// Using callbacks
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

// Using Promises (Node 10+)
const fsPromises = require('fs').promises;

async function readFileAsync() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}
```

**Reading Large Files:**
```javascript
// Read file in chunks
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 1024 // 1KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
  // Process chunk
});

readStream.on('end', () => {
  console.log('File reading completed');
});

readStream.on('error', (error) => {
  console.error('Error reading file:', error);
});
```

### 7. Writing Files

**Synchronous Writing:**
```javascript
const fs = require('fs');

try {
  // Write string to file
  fs.writeFileSync('output.txt', 'Hello World!');

  // Write with options
  fs.writeFileSync('output.txt', 'Hello World!', {
    encoding: 'utf8',
    flag: 'w' // write mode (default)
  });

  // Append to file
  fs.appendFileSync('log.txt', 'New log entry\n');

} catch (error) {
  console.error('Error writing file:', error);
}
```

**Asynchronous Writing:**
```javascript
const fs = require('fs');

// Using callbacks
fs.writeFile('output.txt', 'Hello World!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully');
});

// Using Promises
const fsPromises = require('fs').promises;

async function writeFileAsync() {
  try {
    await fsPromises.writeFile('output.txt', 'Hello World!');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}
```

**Writing Large Files:**
```javascript
const fs = require('fs');

// Create write stream
const writeStream = fs.createWriteStream('large-output.txt');

writeStream.write('Line 1\n');
writeStream.write('Line 2\n');
writeStream.write('Line 3\n');

// Handle events
writeStream.on('finish', () => {
  console.log('All data written');
});

writeStream.on('error', (error) => {
  console.error('Error writing:', error);
});

// End stream
writeStream.end('Final line\n');
```

### 8. File Streams

**Readable Streams:**
```javascript
const fs = require('fs');

const readableStream = fs.createReadStream('input.txt', {
  encoding: 'utf8',
  highWaterMark: 1024 // Buffer size
});

// Event handlers
readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

readableStream.on('end', () => {
  console.log('Stream ended');
});

readableStream.on('error', (error) => {
  console.error('Stream error:', error);
});

// Pause and resume
readableStream.pause();
setTimeout(() => {
  readableStream.resume();
}, 1000);
```

**Writable Streams:**
```javascript
const fs = require('fs');

const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello ');
writableStream.write('World!');
writableStream.write('\n');

// Handle backpressure
if (!writableStream.write('More data')) {
  console.log('Buffer full, waiting for drain');
  writableStream.once('drain', () => {
    console.log('Buffer drained, can write more');
  });
}

writableStream.end('End of stream');
```

**Piping Streams:**
```javascript
const fs = require('fs');
const zlib = require('zlib');

// Pipe read stream to write stream
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// Chain pipes (compress file)
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

// Handle pipe events
readStream.on('end', () => {
  console.log('Piping completed');
});
```

**Transform Streams:**
```javascript
const { Transform } = require('stream');

class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const uppercased = chunk.toString().toUpperCase();
    this.push(uppercased);
    callback();
  }
}

// Use transform stream
fs.createReadStream('input.txt')
  .pipe(new UppercaseTransform())
  .pipe(fs.createWriteStream('output.txt'));
```

### 9. Directory Operations

**Reading Directories:**
```javascript
const fs = require('fs');
const path = require('path');

// Synchronous
try {
  const files = fs.readdirSync('./');
  console.log('Files:', files);

  // Get file stats
  files.forEach(file => {
    const stats = fs.statSync(file);
    console.log(`${file}: ${stats.isDirectory() ? 'directory' : 'file'}`);
  });
} catch (error) {
  console.error('Error reading directory:', error);
}

// Asynchronous
fs.readdir('./', (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  console.log('Files:', files);

  // Get stats for each file
  files.forEach(file => {
    fs.stat(file, (err, stats) => {
      if (err) return;
      console.log(`${file}: ${stats.isDirectory() ? 'dir' : 'file'}`);
    });
  });
});

// Using Promises
const fsPromises = require('fs').promises;

async function readDirectory() {
  try {
    const files = await fsPromises.readdir('./');
    console.log('Files:', files);

    // Get stats with Promise.all
    const stats = await Promise.all(
      files.map(file => fsPromises.stat(file))
    );

    files.forEach((file, index) => {
      console.log(`${file}: ${stats[index].isDirectory() ? 'dir' : 'file'}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**Creating and Removing Directories:**
```javascript
const fs = require('fs');

// Create directory (recursive)
fs.mkdir('parent/child/grandchild', { recursive: true }, (err) => {
  if (err) console.error('Error creating directory:', err);
  else console.log('Directory created');
});

// Remove directory (recursive)
fs.rmdir('parent', { recursive: true }, (err) => {
  if (err) console.error('Error removing directory:', err);
  else console.log('Directory removed');
});

// Using Promises
const fsPromises = require('fs').promises;

async function manageDirectories() {
  try {
    await fsPromises.mkdir('test-dir', { recursive: true });
    console.log('Directory created');

    // Check if directory exists
    const stats = await fsPromises.stat('test-dir');
    console.log('Directory exists:', stats.isDirectory());

    await fsPromises.rmdir('test-dir');
    console.log('Directory removed');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 10. Path Module

**Path Operations:**
```javascript
const path = require('path');

// Path construction
const fullPath = path.join(__dirname, 'folder', 'file.txt');
console.log(fullPath); // /current/dir/folder/file.txt

// Path resolution
const resolved = path.resolve('folder', 'file.txt');
console.log(resolved); // /absolute/path/to/folder/file.txt

// Path parsing
const parsed = path.parse('/home/user/file.txt');
console.log(parsed);
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Path components
console.log(path.dirname('/home/user/file.txt'));  // '/home/user'
console.log(path.basename('/home/user/file.txt')); // 'file.txt'
console.log(path.extname('/home/user/file.txt'));  // '.txt'

// Cross-platform paths
console.log(path.sep);     // '/' on Unix, '\' on Windows
console.log(path.delimiter); // ':' on Unix, ';' on Windows

// Normalize path
const normalized = path.normalize('/home//user/../user/file.txt');
console.log(normalized); // '/home/user/file.txt'

// Relative path
const relative = path.relative('/home/user', '/home/user/docs');
console.log(relative); // 'docs'
```

---

## HTTP and Networking

### 11. Creating HTTP Server

**Basic HTTP Server:**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });

  // Handle different routes
  if (req.url === '/') {
    res.end('Hello World!');
  } else if (req.url === '/about') {
    res.end('About page');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server events
server.on('request', (req, res) => {
  console.log(`${req.method} ${req.url}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

**Advanced Server with Routing:**
```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Parse request body for POST/PUT
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data = body ? JSON.parse(body) : null;

      // Routing
      if (pathname === '/api/users' && req.method === 'GET') {
        handleGetUsers(res);
      } else if (pathname.startsWith('/api/users/') && req.method === 'GET') {
        const id = pathname.split('/')[3];
        handleGetUser(res, id);
      } else if (pathname === '/api/users' && req.method === 'POST') {
        handleCreateUser(res, data);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
      }
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
});

function handleGetUsers(res) {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

function handleGetUser(res, id) {
  const user = { id: parseInt(id), name: 'John Doe' };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
}

function handleCreateUser(res, data) {
  const newUser = { id: Date.now(), ...data };
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));
}
```

### 12. HTTP Client

**Using http module:**
```javascript
const http = require('http');

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(body)
          };
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    // Send data if provided
    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// GET request
async function getUsers() {
  try {
    const response = await makeRequest({
      hostname: 'jsonplaceholder.typicode.com',
      path: '/users',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Users:', response.body);
  } catch (error) {
    console.error('Error:', error);
  }
}

// POST request
async function createUser() {
  try {
    const response = await makeRequest({
      hostname: 'jsonplaceholder.typicode.com',
      path: '/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      name: 'John Doe',
      email: 'john@example.com'
    });

    console.log('Created user:', response.body);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**Using https module:**
```javascript
const https = require('https');

function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: JSON.parse(data)
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Usage
httpsRequest('https://api.github.com/users/octocat')
  .then(response => {
    console.log('GitHub user:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### 13. Express.js Framework

**Basic Express App:**
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: Date.now(),
    ...req.body
  };
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = { id: userId, name: 'John Doe' };
  res.json(user);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Advanced Express Features:**
```javascript
const express = require('express');
const app = express();

// Static files
app.use(express.static('public'));

// Route parameters
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.json({
    userId: req.params.userId,
    bookId: req.params.bookId,
    query: req.query, // Query parameters
    body: req.body    // Request body
  });
});

// Router middleware
const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

usersRouter.post('/', (req, res) => {
  const user = req.body;
  res.status(201).json({ id: Date.now(), ...user });
});

app.use('/api/users', usersRouter);

// Custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
}

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // Verify token...
  next();
}

app.use(logger);
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected resource' });
});
```

### 14. Middleware

**Types of Middleware:**

```javascript
const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
  console.log('Application middleware');
  next();
});

// Router-level middleware
const router = express.Router();
router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

// Built-in middleware
app.use(express.json());           // Parse JSON
app.use(express.urlencoded());     // Parse URL-encoded
app.use(express.static('public')); // Serve static files

// Third-party middleware
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());        // Enable CORS
app.use(helmet());      // Security headers
app.use(morgan('combined')); // Logging

// Custom middleware functions
function validateUser(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  next();
}

function asyncMiddleware(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Route-specific middleware
app.post('/api/users', validateUser, (req, res) => {
  // Create user logic
  res.status(201).json({ message: 'User created' });
});

// Async route handlers
app.get('/api/data', asyncMiddleware(async (req, res) => {
  const data = await fetchData();
  res.json(data);
}));
```

### 15. RESTful APIs

**REST API Design:**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// GET /api/users - Retrieve all users
app.get('/api/users', (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  let filteredUsers = users;

  if (search) {
    filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  res.json({
    users: paginatedUsers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredUsers.length,
      pages: Math.ceil(filteredUsers.length / limit)
    }
  });
});

// GET /api/users/:id - Retrieve single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /api/users - Create new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const newUser = {
    id: Math.max(...users.map(u => u.id)) + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - Update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// PATCH /api/users/:id - Partial update
app.patch('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  Object.assign(user, req.body);
  res.json(user);
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});

// HEAD /api/users - Check if resource exists
app.head('/api/users', (req, res) => {
  res.set('X-Total-Count', users.length.toString());
  res.status(200).end();
});

// OPTIONS /api/users - Describe available methods
app.options('/api/users', (req, res) => {
  res.set('Allow', 'GET, POST, HEAD, OPTIONS');
  res.status(200).end();
});

module.exports = app;
```

---

## Asynchronous Programming

### 16. Callbacks

**Callback Pattern:**
```javascript
function doAsyncTask(callback) {
  setTimeout(() => {
    const result = 'Task completed';
    callback(null, result); // First param is error, second is result
  }, 1000);
}

// Usage
doAsyncTask((error, result) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Result:', result);
});

// Callback hell example
function getUser(userId, callback) {
  setTimeout(() => {
    callback(null, { id: userId, name: 'John' });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, title: 'Post 1', userId }]);
  }, 500);
}

function getComments(postId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, text: 'Comment 1', postId }]);
  }, 500);
}

// Callback hell
getUser(1, (err, user) => {
  if (err) return console.error(err);
  getPosts(user.id, (err, posts) => {
    if (err) return console.error(err);
    getComments(posts[0].id, (err, comments) => {
      if (err) return console.error(err);
      console.log('Final result:', { user, posts, comments });
    });
  });
});
```

### 17. Promises

**Promise Creation and Usage:**
```javascript
// Creating promises
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: 'John' });
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
}

// Promise chaining
fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return delay(1000); // Return another promise
  })
  .then(() => {
    console.log('Delayed operation completed');
    return 'Final result';
  })
  .then(result => {
    console.log('Final result:', result);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Cleanup code always runs');
  });

// Promise methods
const promise1 = Promise.resolve('Resolved');
const promise2 = Promise.reject('Rejected');
const promise3 = delay(100);

// Promise.all - all must resolve
Promise.all([promise1, promise3])
  .then(results => console.log('All resolved:', results))
  .catch(error => console.error('One failed:', error));

// Promise.race - first to settle wins
Promise.race([delay(1000), delay(500)])
  .then(() => console.log('First promise completed'));

// Promise.allSettled - wait for all to settle
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index} fulfilled:`, result.value);
      } else {
        console.log(`Promise ${index} rejected:`, result.reason);
      }
    });
  });

// Promise.any (ES2021) - first to resolve wins
Promise.any([promise2, promise1, promise3])
  .then(result => console.log('First resolved:', result))
  .catch(error => console.error('All rejected:', error.errors));
```

### 18. Async/Await

**Async Functions:**
```javascript
// Async function declaration
async function fetchUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);

    return { user, posts, comments };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Async function expression
const fetchUserData = async function(userId) {
  const user = await fetchUser(userId);
  return user;
};

// Async arrow function
const fetchUserData = async (userId) => {
  const user = await fetchUser(userId);
  return user;
};

// Async class method
class UserService {
  async getUser(userId) {
    const user = await this.fetchFromAPI(userId);
    return user;
  }
}

// Usage
async function main() {
  try {
    const data = await fetchUserData(1);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

// Parallel execution with Promise.all
async function fetchMultipleUsers(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  const users = await Promise.all(promises);
  return users;
}

// Sequential vs Parallel
async function sequentialFetch(userIds) {
  const users = [];
  for (const id of userIds) {
    const user = await fetchUser(id); // Waits for each request
    users.push(user);
  }
  return users;
}

async function parallelFetch(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  const users = await Promise.all(promises); // All requests in parallel
  return users;
}
```

### 19. Event Emitters

**Custom Event Emitter:**
```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.data = [];
  }

  addData(item) {
    this.data.push(item);
    this.emit('dataAdded', item, this.data.length);
  }

  processData() {
    this.emit('processingStart', this.data.length);

    setTimeout(() => {
      const processed = this.data.map(item => item.toUpperCase());
      this.emit('processingComplete', processed);
    }, 1000);
  }
}

const emitter = new MyEmitter();

// Listen for events
emitter.on('dataAdded', (item, count) => {
  console.log(`Added: ${item}, Total items: ${count}`);
});

emitter.once('processingStart', (count) => {
  console.log(`Started processing ${count} items`);
});

emitter.on('processingComplete', (result) => {
  console.log('Processing complete:', result);
});

// Handle errors
emitter.on('error', (error) => {
  console.error('Emitter error:', error);
});

// Emit events
emitter.addData('hello');
emitter.addData('world');
emitter.processData();

// Remove listeners
emitter.removeAllListeners('dataAdded');
```

**Built-in EventEmitter:**
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Set max listeners (default is 10)
emitter.setMaxListeners(20);

// Add listeners
function handler1(data) {
  console.log('Handler 1:', data);
}

function handler2(data) {
  console.log('Handler 2:', data);
}

emitter.on('event', handler1);
emitter.on('event', handler2);

// Prepend listener (runs first)
emitter.prependListener('event', () => {
  console.log('First handler');
});

// Emit event
emitter.emit('event', 'some data');

// Get listener count
console.log('Listener count:', emitter.listenerCount('event'));

// Get listeners
console.log('Listeners:', emitter.listeners('event'));

// Remove specific listener
emitter.removeListener('event', handler1);

// Remove all listeners for event
emitter.removeAllListeners('event');
```

### 20. Streams

**Readable Streams:**
```javascript
const fs = require('fs');

// Create readable stream
const readable = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 1024 // 1KB chunks
});

// Handle stream events
readable.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'characters');
  // Process chunk
});

readable.on('end', () => {
  console.log('Stream ended');
});

readable.on('error', (error) => {
  console.error('Stream error:', error);
});

// Pause and resume
readable.pause();
setTimeout(() => {
  readable.resume();
}, 1000);
```

**Writable Streams:**
```javascript
const fs = require('fs');

const writable = fs.createWriteStream('output.txt');

// Write data
writable.write('Hello ');
writable.write('World!\n');

// Handle backpressure
if (!writable.write('More data\n')) {
  console.log('Buffer full, waiting for drain');
  writable.once('drain', () => {
    console.log('Buffer drained, can write more');
    writable.write('Additional data\n');
  });
}

// End stream
writable.end('End of stream\n');

// Handle events
writable.on('finish', () => {
  console.log('All data written');
});

writable.on('error', (error) => {
  console.error('Write error:', error);
});
```

**Piping and Chaining:**
```javascript
const fs = require('fs');
const zlib = require('zlib');

// Basic piping
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// Chain operations
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

// Custom transform stream
const { Transform } = require('stream');

class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const uppercased = chunk.toString().toUpperCase();
    this.push(uppercased);
    callback();
  }
}

// Use transform in pipeline
fs.createReadStream('input.txt')
  .pipe(new UppercaseTransform())
  .pipe(fs.createWriteStream('output.txt'));
```

---

## Database Integration

### 21. MongoDB with Mongoose

**Mongoose Setup:**
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close connection on app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
```

**Schema and Model:**
```javascript
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Please enter a valid email'
    }
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot be more than 120']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  roles: [{
    type: String,
    enum: ['user', 'admin', 'moderator']
  }],
  address: {
    street: String,
    city: String,
    zipCode: String
  }
});

// Add indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Virtual property
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Instance method
userSchema.methods.greet = function() {
  return `Hello, I'm ${this.name}`;
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: new RegExp(email, 'i') });
};

// Pre-save middleware
userSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }
  next();
});

// Post-save middleware
userSchema.post('save', function(doc) {
  console.log(`User ${doc.name} has been saved`);
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
```

**CRUD Operations:**
```javascript
const User = require('./models/User');

// Create
async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log('User created:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Read
async function getUsers() {
  try {
    const users = await User.find({ isActive: true })
      .select('name email age')
      .sort({ createdAt: -1 })
      .limit(10);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Update
async function updateUser(id, updateData) {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete
async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Advanced queries
async function searchUsers(criteria) {
  try {
    const query = {};

    if (criteria.name) {
      query.name = new RegExp(criteria.name, 'i');
    }

    if (criteria.minAge) {
      query.age = { $gte: criteria.minAge };
    }

    if (criteria.roles) {
      query.roles = { $in: criteria.roles };
    }

    const users = await User.find(query)
      .populate('posts')
      .exec();

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

// Aggregation
async function getUserStats() {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          averageAge: { $avg: '$age' },
          activeUsers: {
            $sum: { $cond: ['$isActive', 1, 0] }
          }
        }
      }
    ]);

    return stats[0];
  } catch (error) {
    console.error('Error getting stats:', error);
    throw error;
  }
}

// Usage examples
async function examples() {
  try {
    // Create user
    const newUser = await createUser({
      name: 'john doe',
      email: 'john@example.com',
      age: 30,
      roles: ['user']
    });

    // Get users
    const users = await getUsers();
    console.log('Active users:', users.length);

    // Update user
    const updatedUser = await updateUser(newUser._id, {
      age: 31
    });

    // Search users
    const searchResults = await searchUsers({
      minAge: 25,
      roles: ['user']
    });

    // Get stats
    const stats = await getUserStats();
    console.log('User statistics:', stats);

  } catch (error) {
    console.error('Example error:', error);
  }
}
```

### 22. PostgreSQL with pg

**PostgreSQL Setup:**
```javascript
const { Pool } = require('pg');

// Create connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp',
  max: 20, // Maximum number of clients in pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
});

// Handle pool events
pool.on('connect', (client) => {
  console.log('New client connected to PostgreSQL');
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Closing PostgreSQL pool...');
  pool.end(() => {
    console.log('PostgreSQL pool closed');
    process.exit(0);
  });
});

module.exports = pool;
```

**Database Operations:**
```javascript
const pool = require('./db');

// Create tables
async function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      age INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT true
    );
  `;

  const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createUsersTable);
    await pool.query(createPostsTable);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// CRUD Operations
class UserRepository {
  async create(userData) {
    const { name, email, age } = userData;
    const query = `
      INSERT INTO users (name, email, age)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [name, email, age]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findAll(limit = 10, offset = 0) {
    const query = `
      SELECT * FROM users
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1 AND is_active = true';

    try {
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async update(id, userData) {
    const { name, email, age } = userData;
    const query = `
      UPDATE users
      SET name = $1, email = $2, age = $3
      WHERE id = $4 AND is_active = true
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [name, email, age, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async delete(id) {
    const query = `
      UPDATE users
      SET is_active = false
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async search(criteria) {
    let query = 'SELECT * FROM users WHERE is_active = true';
    const values = [];
    const conditions = [];

    if (criteria.name) {
      conditions.push(`name ILIKE $${values.length + 1}`);
      values.push(`%${criteria.name}%`);
    }

    if (criteria.email) {
      conditions.push(`email ILIKE $${values.length + 1}`);
      values.push(`%${criteria.email}%`);
    }

    if (criteria.minAge) {
      conditions.push(`age >= $${values.length + 1}`);
      values.push(criteria.minAge);
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  async getUserWithPosts(userId) {
    const query = `
      SELECT
        u.*,
        json_agg(
          json_build_object(
            'id', p.id,
            'title', p.title,
            'content', p.content,
            'created_at', p.created_at
          )
        ) as posts
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      WHERE u.id = $1 AND u.is_active = true
      GROUP BY u.id
    `;

    try {
      const result = await pool.query(query, [userId]);
      const user = result.rows[0];
      if (user) {
        user.posts = user.posts.filter(post => post.id !== null);
      }
      return user || null;
    } catch (error) {
      console.error('Error fetching user with posts:', error);
      throw error;
    }
  }
}

// Transaction example
async function transferFunds(fromUserId, toUserId, amount) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Check sender balance
    const senderQuery = 'SELECT balance FROM accounts WHERE user_id = $1';
    const senderResult = await client.query(senderQuery, [fromUserId]);
    const senderBalance = senderResult.rows[0].balance;

    if (senderBalance < amount) {
      throw new Error('Insufficient funds');
    }

    // Deduct from sender
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE user_id = $2',
      [amount, fromUserId]
    );

    // Add to receiver
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE user_id = $2',
      [amount, toUserId]
    );

    // Log transaction
    await client.query(
      'INSERT INTO transactions (from_user_id, to_user_id, amount) VALUES ($1, $2, $3)',
      [fromUserId, toUserId, amount]
    );

    await client.query('COMMIT');
    console.log('Transfer completed successfully');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transfer failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { UserRepository, createTables, transferFunds };
```

### 23. Redis

**Redis Setup:**
```javascript
const redis = require('redis');

// Create Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      console.error('Redis server refused connection');
      return new Error('Redis server connection refused');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      console.error('Redis retry time exhausted');
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      console.error('Redis max retry attempts reached');
      return undefined;
    }
    // Exponential backoff
    return Math.min(options.attempt * 100, 3000);
  }
});

// Handle connection events
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('ready', () => {
  console.log('Redis client ready');
});

client.on('error', (error) => {
  console.error('Redis error:', error);
});

client.on('end', () => {
  console.log('Redis connection ended');
});

// Graceful shutdown
process.on('SIGINT', () => {
  client.quit(() => {
    console.log('Redis connection closed');
    process.exit(0);
  });
});

module.exports = client;
```

**Redis Operations:**
```javascript
const client = require('./redis');

// Basic operations
async function basicOperations() {
  try {
    // Strings
    await client.set('name', 'John');
    const name = await client.get('name');
    console.log('Name:', name);

    // With expiration
    await client.setex('temp', 60, 'temporary value');
    const temp = await client.get('temp');

    // Counters
    await client.set('counter', 0);
    await client.incr('counter');
    await client.incrby('counter', 5);
    const counter = await client.get('counter');

    // Hashes
    await client.hset('user:1', 'name', 'John');
    await client.hset('user:1', 'email', 'john@example.com');
    await client.hset('user:1', 'age', 30);

    const user = await client.hgetall('user:1');
    console.log('User:', user);

    // Lists
    await client.rpush('messages', 'Hello');
    await client.rpush('messages', 'World');
    await client.lpush('messages', 'Hi');

    const messages = await client.lrange('messages', 0, -1);
    console.log('Messages:', messages);

    // Sets
    await client.sadd('tags', 'javascript');
    await client.sadd('tags', 'nodejs');
    await client.sadd('tags', 'redis');

    const tags = await client.smembers('tags');
    console.log('Tags:', tags);

    // Sorted Sets
    await client.zadd('leaderboard', 100, 'player1');
    await client.zadd('leaderboard', 150, 'player2');
    await client.zadd('leaderboard', 120, 'player3');

    const topPlayers = await client.zrevrange('leaderboard', 0, 2, 'WITHSCORES');
    console.log('Top players:', topPlayers);

  } catch (error) {
    console.error('Redis operation error:', error);
  }
}

// Caching middleware
function cacheMiddleware(keyGenerator = (req) => req.originalUrl) {
  return async (req, res, next) => {
    const key = keyGenerator(req);

    try {
      const cached = await client.get(key);
      if (cached) {
        console.log('Cache hit for:', key);
        res.set('X-Cache', 'HIT');
        return res.json(JSON.parse(cached));
      }

      // Store original send method
      const originalSend = res.json;

      // Override json method to cache response
      res.json = function(data) {
        client.setex(key, 300, JSON.stringify(data)); // Cache for 5 minutes
        res.set('X-Cache', 'MISS');
        originalSend.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache error:', error);
      next();
    }
  };
}

// Session store
class RedisSessionStore {
  constructor(client, prefix = 'session:') {
    this.client = client;
    this.prefix = prefix;
  }

  async get(sessionId) {
    try {
      const data = await this.client.get(this.prefix + sessionId);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Session get error:', error);
      return null;
    }
  }

  async set(sessionId, sessionData, ttl = 3600) {
    try {
      await this.client.setex(
        this.prefix + sessionId,
        ttl,
        JSON.stringify(sessionData)
      );
    } catch (error) {
      console.error('Session set error:', error);
    }
  }

  async destroy(sessionId) {
    try {
      await this.client.del(this.prefix + sessionId);
    } catch (error) {
      console.error('Session destroy error:', error);
    }
  }
}

// Rate limiting
class RateLimiter {
  constructor(client, windowMs = 60000, maxRequests = 100) {
    this.client = client;
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  async isAllowed(identifier) {
    const key = `ratelimit:${identifier}`;
    const now = Date.now();
    const windowStart = now - this.windowMs;

    try {
      // Remove old requests outside the window
      await this.client.zremrangebyscore(key, 0, windowStart);

      // Count current requests in window
      const requestCount = await this.client.zcard(key);

      if (requestCount >= this.maxRequests) {
        return false;
      }

      // Add current request
      await this.client.zadd(key, now, now.toString());

      // Set expiration on the key
      await this.client.expire(key, Math.ceil(this.windowMs / 1000));

      return true;
    } catch (error) {
      console.error('Rate limit error:', error);
      return true; // Allow on error to avoid blocking users
    }
  }
}

// Pub/Sub
function setupPubSub() {
  const subscriber = client.duplicate();

  subscriber.subscribe('news', 'alerts');

  subscriber.on('message', (channel, message) => {
    console.log(`Received on ${channel}: ${message}`);
  });

  // Publisher
  setInterval(() => {
    client.publish('news', `News at ${new Date().toLocaleTimeString()}`);
  }, 5000);

  return subscriber;
}

module.exports = {
  client,
  cacheMiddleware,
  RedisSessionStore,
  RateLimiter,
  setupPubSub
};
```

### 24. Database Connection Pooling

**Connection Pool Benefits:**
- Reuse connections instead of creating new ones
- Limit maximum connections to prevent resource exhaustion
- Handle connection failures gracefully
- Improve performance by reducing connection overhead

```javascript
const mysql = require('mysql2/promise');

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
});

// Handle pool events
pool.on('connection', (connection) => {
  console.log('New connection established');
});

pool.on('error', (error) => {
  console.error('Pool error:', error);
});

// Query wrapper with error handling
async function executeQuery(sql, params = []) {
  let connection;

  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(sql, params);
    return { rows, fields };
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Transaction wrapper
async function executeTransaction(callback) {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const result = await callback(connection);

    await connection.commit();
    return result;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Transaction error:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Usage examples
async function userOperations() {
  try {
    // Simple query
    const users = await executeQuery('SELECT * FROM users WHERE active = ?', [true]);
    console.log('Active users:', users.rows.length);

    // Transaction example
    await executeTransaction(async (connection) => {
      await connection.execute('UPDATE accounts SET balance = balance - ? WHERE id = ?', [100, 1]);
      await connection.execute('UPDATE accounts SET balance = balance + ? WHERE id = ?', [100, 2]);
      await connection.execute('INSERT INTO transactions (from_account, to_account, amount) VALUES (?, ?, ?)', [1, 2, 100]);
    });

    console.log('Transfer completed successfully');

  } catch (error) {
    console.error('Database operation failed:', error);
  }
}

// Health check
async function healthCheck() {
  try {
    await pool.execute('SELECT 1');
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'unhealthy', error: error.message };
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing database pool...');
  await pool.end();
  console.log('Database pool closed');
  process.exit(0);
});

module.exports = { pool, executeQuery, executeTransaction, healthCheck };
```

### 25. ORM vs Query Builders

**ORM (Object-Relational Mapping):**
```javascript
// Sequelize ORM example
const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('myapp', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define models
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER
  }
});

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  }
});

// Define relationships
User.hasMany(Post);
Post.belongsTo(User);

// Sync database
async function syncDatabase() {
  await sequelize.sync({ force: true });
  console.log('Database synced');
}

// CRUD operations
async function ormOperations() {
  try {
    // Create
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });

    // Read
    const users = await User.findAll({
      where: {
        age: {
          [Op.gt]: 25
        }
      },
      include: Post
    });

    // Update
    await user.update({ age: 31 });

    // Delete
    await user.destroy();

    console.log('ORM operations completed');

  } catch (error) {
    console.error('ORM error:', error);
  }
}
```

**Query Builder:**
```javascript
// Knex.js query builder example
const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'myapp'
  }
});

// CRUD operations
async function queryBuilderOperations() {
  try {
    // Create table
    await knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.integer('age');
      table.timestamps(true, true);
    });

    // Insert
    const userIds = await knex('users').insert({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });

    // Select
    const users = await knex('users')
      .select('id', 'name', 'email')
      .where('age', '>', 25)
      .orderBy('created_at', 'desc')
      .limit(10);

    // Update
    await knex('users')
      .where({ id: userIds[0] })
      .update({ age: 31 });

    // Delete
    await knex('users')
      .where({ id: userIds[0] })
      .del();

    // Complex query
    const stats = await knex('users')
      .select(
        knex.raw('COUNT(*) as total_users'),
        knex.raw('AVG(age) as average_age'),
        knex.raw('MIN(age) as min_age'),
        knex.raw('MAX(age) as max_age')
      )
      .where('active', true);

    console.log('Query builder operations completed');

  } catch (error) {
    console.error('Query builder error:', error);
  } finally {
    await knex.destroy();
  }
}
```

---

## Security

### 26. Authentication

**JWT Authentication:**
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  // Hash password
  async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password
  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  // Generate JWT token
  generateToken(payload, expiresIn = '24h') {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  // Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Generate refresh token
  generateRefreshToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
  }

  // Middleware to authenticate requests
  authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.substring(7);

    try {
      const decoded = this.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid access token' });
    }
  }

  // Refresh token endpoint handler
  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    try {
      const decoded = jwt.verify(refreshToken, this.secretKey);
      const newAccessToken = this.generateToken({
        userId: decoded.userId,
        email: decoded.email
      });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
}

// Usage in Express
const express = require('express');
const app = express();

app.use(express.json());

const authService = new AuthService(process.env.JWT_SECRET);

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Hash password
    const hashedPassword = await authService.hashPassword(password);

    // Save user to database (pseudo-code)
    const user = await saveUser({ email, password: hashedPassword, name });

    // Generate tokens
    const accessToken = authService.generateToken({
      userId: user.id,
      email: user.email
    });

    const refreshToken = authService.generateRefreshToken({
      userId: user.id
    });

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user (pseudo-code)
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await authService.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = authService.generateToken({
      userId: user.id,
      email: user.email
    });

    const refreshToken = authService.generateRefreshToken({
      userId: user.id
    });

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Refresh token endpoint
app.post('/refresh', authService.refreshToken.bind(authService));

// Protected route
app.get('/profile', authService.authenticate.bind(authService), (req, res) => {
  res.json({ user: req.user });
});

module.exports = app;
```

### 27. Authorization

**Role-Based Access Control (RBAC):**
```javascript
class AuthorizationService {
  constructor() {
    // Define roles and their permissions
    this.roles = {
      admin: ['read', 'write', 'delete', 'manage_users'],
      moderator: ['read', 'write', 'delete'],
      user: ['read', 'write'],
      guest: ['read']
    };
  }

  // Check if user has permission
  hasPermission(user, permission) {
    if (!user || !user.roles) return false;

    // Check if user has admin role (full access)
    if (user.roles.includes('admin')) return true;

    // Check specific permissions
    return user.roles.some(role =>
      this.roles[role] && this.roles[role].includes(permission)
    );
  }

  // Check if user has role
  hasRole(user, role) {
    return user && user.roles && user.roles.includes(role);
  }

  // Middleware for permission checking
  requirePermission(permission) {
    return (req, res, next) => {
      if (!this.hasPermission(req.user, permission)) {
        return res.status(403).json({
          error: 'Insufficient permissions',
          required: permission
        });
      }
      next();
    };
  }

  // Middleware for role checking
  requireRole(role) {
    return (req, res, next) => {
      if (!this.hasRole(req.user, role)) {
        return res.status(403).json({
          error: 'Insufficient role',
          required: role
        });
      }
      next();
    };
  }

  // Resource ownership check
  isOwner(user, resource) {
    return user && resource && user.id === resource.userId;
  }

  // Ownership middleware
  requireOwnership(resourceGetter) {
    return async (req, res, next) => {
      try {
        const resource = await resourceGetter(req.params.id);

        if (!resource) {
          return res.status(404).json({ error: 'Resource not found' });
        }

        if (!this.isOwner(req.user, resource)) {
          return res.status(403).json({ error: 'Access denied' });
        }

        req.resource = resource;
        next();
      } catch (error) {
        res.status(500).json({ error: 'Authorization check failed' });
      }
    };
  }
}

// Usage in Express
const express = require('express');
const app = express();

const authService = require('./auth-service');
const authzService = new AuthorizationService();

// Apply authentication to all routes
app.use(authService.authenticate.bind(authService));

// Public routes
app.get('/public', (req, res) => {
  res.json({ message: 'Public content' });
});

// Role-based routes
app.get('/admin',
  authzService.requireRole('admin'),
  (req, res) => {
    res.json({ message: 'Admin content' });
  }
);

app.post('/posts',
  authzService.requirePermission('write'),
  (req, res) => {
    // Create post
    res.json({ message: 'Post created' });
  }
);

// Ownership-based routes
app.put('/posts/:id',
  authzService.requireOwnership(async (postId) => {
    // Fetch post from database
    return await getPostById(postId);
  }),
  (req, res) => {
    // Update post
    res.json({ message: 'Post updated' });
  }
);

// Delete with permission or ownership check
app.delete('/posts/:id', async (req, res) => {
  const post = await getPostById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Allow if user has delete permission OR is the owner
  const canDelete = authzService.hasPermission(req.user, 'delete') ||
                   authzService.isOwner(req.user, post);

  if (!canDelete) {
    return res.status(403).json({ error: 'Cannot delete this post' });
  }

  // Delete post
  await deletePost(req.params.id);
  res.json({ message: 'Post deleted' });
});

module.exports = app;
```

### 28. Input Validation

**Input Validation with Joi:**
```javascript
const Joi = require('joi');

// Validation schemas
const userSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),

  age: Joi.number()
    .integer()
    .min(0)
    .max(120)
    .messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age cannot be negative',
      'number.max': 'Age cannot exceed 120'
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),

  role: Joi.string()
    .valid('user', 'admin', 'moderator')
    .default('user'),

  tags: Joi.array()
    .items(Joi.string().max(20))
    .max(10)
    .messages({
      'array.max': 'Cannot have more than 10 tags',
      'string.max': 'Each tag cannot exceed 20 characters'
    }),

  preferences: Joi.object({
    theme: Joi.string().valid('light', 'dark').default('light'),
    notifications: Joi.boolean().default(true)
  }).default()
});

// Post schema
const postSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(200)
    .required(),

  content: Joi.string()
    .min(10)
    .max(10000)
    .required(),

  tags: Joi.array()
    .items(Joi.string())
    .max(5),

  published: Joi.boolean()
    .default(false),

  publishDate: Joi.date()
    .when('published', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.forbidden()
    })
});

// Validation middleware
function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors
      stripUnknown: true, // Remove unknown properties
      convert: true // Convert types
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }

    req.body = value; // Use validated/sanitized data
    next();
  };
}

// Parameter validation
function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        error: 'Invalid parameters',
        details: error.details.map(d => d.message)
      });
    }

    req.params = value;
    next();
  };
}

// Query validation
function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      convert: true
    });

    if (error) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: error.details.map(d => d.message)
      });
    }

    req.query = value;
    next();
  };
}

// Custom validation functions
const customValidations = {
  isAdult: (value, helpers) => {
    if (value < 18) {
      return helpers.error('any.custom', { message: 'Must be 18 or older' });
    }
    return value;
  },

  isValidUsername: (value, helpers) => {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
      return helpers.error('any.custom', {
        message: 'Username must be 3-20 characters, letters, numbers, and underscores only'
      });
    }
    return value;
  }
};

// Extend Joi with custom validations
const extendedJoi = Joi.extend({
  type: 'adult',
  base: Joi.number(),
  messages: {
    'adult.base': '{{#label}} must be a valid adult age'
  },
  validate(value, helpers) {
    return customValidations.isAdult(value, helpers);
  }
});

// Sanitization schemas
const sanitizeUserInput = Joi.object({
  comment: Joi.string()
    .trim()
    .max(1000)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
});

// Usage in routes
const express = require('express');
const app = express();

app.use(express.json());

// User routes
app.post('/users',
  validateBody(userSchema),
  async (req, res) => {
    // Create user with validated data
    const user = await createUser(req.body);
    res.status(201).json(user);
  }
);

app.put('/users/:id',
  validateParams(Joi.object({ id: Joi.number().integer().positive().required() })),
  validateBody(userSchema.fork(['email'], (schema) => schema.optional())), // Email optional for updates
  async (req, res) => {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  }
);

// Posts with query validation
const postQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().trim().max(100),
  sortBy: Joi.string().valid('createdAt', 'title', 'views').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

app.get('/posts',
  validateQuery(postQuerySchema),
  async (req, res) => {
    const posts = await getPosts(req.query);
    res.json(posts);
  }
);

// Sanitize user input
app.post('/comments',
  validateBody(Joi.object({
    content: Joi.string().min(1).max(1000).required()
  })),
  (req, res) => {
    const { error, value } = sanitizeUserInput.validate({
      comment: req.body.content
    });

    if (error) {
      return res.status(400).json({ error: 'Invalid content' });
    }

    // Save sanitized comment
    saveComment(value.comment);
    res.json({ message: 'Comment posted' });
  }
);

module.exports = app;
```

### 29. Helmet.js

**Security Headers with Helmet:**
```javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

// Apply basic security headers
app.use(helmet());

// Or configure specific headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));

// Custom security middleware
app.use((req, res, next) => {
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');

  // Add custom security headers
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
});

// API routes with additional security
app.use('/api', (req, res, next) => {
  // API-specific security headers
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  next();
});

module.exports = app;
```

### 30. Rate Limiting

**Rate Limiting with express-rate-limit:**
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Basic rate limiting - 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting for certain requests
  skip: (req) => req.ip === '127.0.0.1', // Skip localhost
  // Custom key generator
  keyGenerator: (req) => {
    return req.user ? req.user.id : req.ip; // Rate limit by user or IP
  }
});

app.use(limiter);

// API-specific rate limiting - stricter limits for sensitive endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many API requests, please try again later.',
  skipSuccessfulRequests: false,
  skipFailedRequests: false
});

app.use('/api/', apiLimiter);

// Authentication endpoints - very strict limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  message: {
    error: 'Too many login attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  skipSuccessfulRequests: true, // Don't count successful logins
  onLimitReached: (req) => {
    // Log suspicious activity
    console.warn(`Rate limit exceeded for IP: ${req.ip} on auth endpoint`);
  }
});

app.use('/auth/login', authLimiter);

// Custom rate limiter with Redis store
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const redisClient = redis.createClient();

const redisLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rate-limit:',
    resetExpiryOnChange: true
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
  onLimitReached: (req) => {
    console.log(`Rate limit reached for IP: ${req.ip}`);
  }
});

app.use('/api/heavy', redisLimiter);

// Sliding window rate limiter
class SlidingWindowLimiter {
  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = [];
  }

  isAllowed() {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Remove old requests outside the window
    this.requests = this.requests.filter(time => time > windowStart);

    if (this.requests.length >= this.maxRequests) {
      return false;
    }

    this.requests.push(now);
    return true;
  }
}

// Middleware using sliding window
const slidingLimiter = new SlidingWindowLimiter(60000, 10); // 10 requests per minute

app.use('/api/premium', (req, res, next) => {
  if (!slidingLimiter.isAllowed()) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: '1 minute'
    });
  }
  next();
});

// Burst handling - allow short bursts but maintain average rate
class TokenBucketLimiter {
  constructor(rate = 10, burst = 20) { // 10 requests/second, burst up to 20
    this.rate = rate;
    this.burst = burst;
    this.tokens = burst;
    this.lastRefill = Date.now();
  }

  isAllowed() {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // seconds
    const tokensToAdd = timePassed * this.rate;

    this.tokens = Math.min(this.burst, this.tokens + tokensToAdd);
    this.lastRefill = now;

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }
}

const tokenBucket = new TokenBucketLimiter(5, 10); // 5 req/sec, burst 10

app.use('/api/burst-allowed', (req, res, next) => {
  if (!tokenBucket.isAllowed()) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: 'Try again in a few seconds'
    });
  }
  next();
});

// Different limits for different user types
function getUserLimits(user) {
  if (!user) return { windowMs: 15 * 60 * 1000, max: 10 }; // Guest
  if (user.plan === 'premium') return { windowMs: 60 * 1000, max: 1000 }; // Premium
  return { windowMs: 15 * 60 * 1000, max: 100 }; // Regular user
}

app.use('/api/user-specific', (req, res, next) => {
  const limits = getUserLimits(req.user);

  // Simple in-memory store (use Redis in production)
  const key = req.user ? req.user.id : req.ip;
  const now = Date.now();

  if (!global.rateLimits) global.rateLimits = {};
  if (!global.rateLimits[key]) {
    global.rateLimits[key] = { count: 0, resetTime: now + limits.windowMs };
  }

  const userLimit = global.rateLimits[key];

  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + limits.windowMs;
  }

  if (userLimit.count >= limits.max) {
    const retryAfter = Math.ceil((userLimit.resetTime - now) / 1000);
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: `${retryAfter} seconds`
    });
  }

  userLimit.count++;
  next();
});

module.exports = app;
```

**[⬆️ Back to Top](#node.js-interview-questions)**
