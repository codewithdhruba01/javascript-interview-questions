# DOM and Browser APIs Interview Questions

## Table of Contents

### [DOM Fundamentals](#dom-fundamentals)
1. [What is the DOM?](#1-what-is-the-dom)
2. [DOM Tree Structure](#2-dom-tree-structure)
3. [DOM vs HTML](#3-dom-vs-html)
4. [DOM Methods vs Properties](#4-dom-methods-vs-properties)

### [DOM Selection](#dom-selection)
5. [getElementById vs querySelector](#5-getelementbyid-vs-queryselector)
6. [getElementsByClassName vs querySelectorAll](#6-getelementsbyclassname-vs-queryselectorall)
7. [Selecting Multiple Elements](#7-selecting-multiple-elements)

### [DOM Manipulation](#dom-manipulation)
8. [Creating Elements](#8-creating-elements)
9. [Adding/Removing Elements](#9-addingremoving-elements)
10. [Modifying Element Content](#10-modifying-element-content)
11. [Working with Attributes](#11-working-with-attributes)

### [DOM Events](#dom-events)
12. [Event Propagation](#12-event-propagation)
13. [Event Delegation](#13-event-delegation)
14. [Custom Events](#14-custom-events)
15. [Event Object](#15-event-object)

### [Browser APIs](#browser-apis)
16. [Local Storage vs Session Storage](#16-local-storage-vs-session-storage)
17. [IndexedDB](#17-indexeddb)
18. [Web Workers](#18-web-workers)
19. [Service Workers](#19-service-workers)
20. [Geolocation API](#20-geolocation-api)
21. [Notification API](#21-notification-api)
22. [Clipboard API](#22-clipboard-api)
23. [Intersection Observer](#23-intersection-observer)
24. [Fetch API](#24-fetch-api)
25. [WebSockets](#25-websockets)

---

## DOM Fundamentals

### 1. What is the DOM?

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

```javascript
// The DOM represents HTML as a tree of objects
document.body.style.backgroundColor = "lightblue";
```

**Key Points:**
- DOM is a **tree-like structure** of HTML elements
- Each element is a **node** in the tree
- JavaScript can **manipulate** these nodes
- DOM is **language-independent** but most commonly used with JavaScript

### 2. DOM Tree Structure

The DOM represents HTML as a hierarchical tree structure:

```html
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <div>
      <h1>Hello</h1>
      <p>World</p>
    </div>
  </body>
</html>
```

**Tree Structure:**
```
Document
├── html (Element)
    ├── head (Element)
    │   └── title (Element)
    └── body (Element)
        └── div (Element)
            ├── h1 (Element)
            └── p (Element)
```

### 3. DOM vs HTML

| Feature | HTML | DOM |
|---------|------|-----|
| **Nature** | Static markup | Dynamic object model |
| **Purpose** | Structure content | Interact with content |
| **Access** | View source | JavaScript manipulation |
| **Updates** | Page reload required | Real-time updates |

```javascript
// HTML is static
// DOM allows dynamic changes
const element = document.createElement('div');
element.textContent = 'Dynamic content';
document.body.appendChild(element);
```

### 4. DOM Methods vs Properties

**Properties** are values stored on objects:
```javascript
element.id = "myId";
element.className = "myClass";
element.textContent = "Hello";
```

**Methods** are functions that perform actions:
```javascript
element.appendChild(child);
element.removeChild(child);
element.addEventListener('click', handler);
```

---

## DOM Selection

### 5. getElementById vs querySelector

| Method | Returns | Performance | CSS Selectors |
|--------|---------|-------------|---------------|
| `getElementById` | Single element | Fastest | Only IDs |
| `querySelector` | First matching element | Moderate | All CSS selectors |

```javascript
// getElementById - fastest for IDs
const element = document.getElementById('myId');

// querySelector - more flexible
const element = document.querySelector('#myId');
const firstButton = document.querySelector('button');
const specificElement = document.querySelector('.class .nested');
```

### 6. getElementsByClassName vs querySelectorAll

| Method | Returns | Live Collection | Performance |
|--------|---------|-----------------|-------------|
| `getElementsByClassName` | HTMLCollection | Yes | Fast |
| `querySelectorAll` | NodeList | No | Moderate |

```javascript
// HTMLCollection (live)
const elements = document.getElementsByClassName('myClass');
// Updates automatically if DOM changes

// NodeList (static)
const elements = document.querySelectorAll('.myClass');
// Fixed snapshot of elements
```

### 7. Selecting Multiple Elements

```javascript
// Different ways to select multiple elements
const byTagName = document.getElementsByTagName('div');
const byClassName = document.getElementsByClassName('myClass');
const byName = document.getElementsByName('username');
const byQuery = document.querySelectorAll('.class, #id, [attr]');

// Converting to Array for forEach
const elements = document.querySelectorAll('.myClass');
Array.from(elements).forEach(el => console.log(el));
```

---

## DOM Manipulation

### 8. Creating Elements

```javascript
// Method 1: createElement
const div = document.createElement('div');
div.textContent = 'Hello World';
div.className = 'my-class';

// Method 2: innerHTML (less secure)
const container = document.createElement('div');
container.innerHTML = '<span>Unsafe HTML</span>';

// Method 3: insertAdjacentHTML (safer)
element.insertAdjacentHTML('beforeend', '<span>Safe HTML</span>');

// Method 4: clone existing element
const original = document.querySelector('.original');
const clone = original.cloneNode(true); // true = deep clone
```

### 9. Adding/Removing Elements

```javascript
// Adding elements
const parent = document.querySelector('#parent');
const child = document.createElement('div');

// Method 1: appendChild
parent.appendChild(child);

// Method 2: insertBefore
const reference = document.querySelector('#reference');
parent.insertBefore(child, reference);

// Method 3: append (ES6+)
parent.append(child, 'Text node', anotherElement);

// Removing elements
parent.removeChild(child);
// or
child.remove(); // Modern way
```

### 10. Modifying Element Content

```javascript
const element = document.querySelector('#myElement');

// textContent - only text
element.textContent = 'New text content';

// innerHTML - HTML content (be careful with security)
element.innerHTML = '<strong>Bold text</strong>';

// innerText - respects CSS styling
element.innerText = 'This respects CSS display';

// outerHTML - replaces entire element
element.outerHTML = '<span>Replaced</span>';
```

### 11. Working with Attributes

```javascript
const element = document.querySelector('input');

// Setting attributes
element.setAttribute('type', 'email');
element.setAttribute('placeholder', 'Enter email');

// Getting attributes
const type = element.getAttribute('type');
const placeholder = element.getAttribute('placeholder');

// Checking attributes
const hasType = element.hasAttribute('type');

// Removing attributes
element.removeAttribute('placeholder');

// Special properties for common attributes
element.id = 'myId';
element.className = 'class1 class2';
element.value = 'input value';
element.disabled = true;
```

---

## DOM Events

### 12. Event Propagation

Events propagate through three phases:

```javascript
// Phase 1: Capturing (down the DOM tree)
document.addEventListener('click', handler, true); // useCapture: true

// Phase 2: Target (at the element)
// Phase 3: Bubbling (up the DOM tree)
element.addEventListener('click', handler); // default: false (bubbling)

function handler(event) {
  console.log('Phase:', event.eventPhase);
  // 1 = Capturing, 2 = Target, 3 = Bubbling
}
```

**Stopping Propagation:**
```javascript
element.addEventListener('click', function(event) {
  event.stopPropagation(); // Stops further propagation
  event.stopImmediatePropagation(); // Stops all other handlers on same element
});
```

### 13. Event Delegation

Event delegation uses event bubbling to handle events on multiple elements with a single handler:

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```javascript
// Instead of adding listeners to each <li>
document.getElementById('list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent);
  }
});

// Benefits:
// - Memory efficient
// - Works with dynamically added elements
// - Cleaner code
```

### 14. Custom Events

```javascript
// Creating custom events
const myEvent = new Event('myCustomEvent');
const detailedEvent = new CustomEvent('userAction', {
  detail: { action: 'login', userId: 123 }
});

// Dispatching events
element.dispatchEvent(myEvent);
element.dispatchEvent(detailedEvent);

// Listening to custom events
element.addEventListener('userAction', function(event) {
  console.log('Action:', event.detail.action);
  console.log('User ID:', event.detail.userId);
});
```

### 15. Event Object

The event object contains information about the event:

```javascript
element.addEventListener('click', function(event) {
  // Event properties
  console.log('Target:', event.target);        // Element that triggered event
  console.log('Current target:', event.currentTarget); // Element with listener
  console.log('Type:', event.type);            // Event type
  console.log('Timestamp:', event.timeStamp);  // Time of event

  // Mouse events
  console.log('X, Y:', event.clientX, event.clientY); // Mouse position
  console.log('Button:', event.button);        // Mouse button pressed

  // Keyboard events
  console.log('Key:', event.key);              // Key pressed
  console.log('Code:', event.code);            // Physical key code
  console.log('Ctrl pressed:', event.ctrlKey); // Modifier keys
});
```

---

## Browser APIs

### 16. Local Storage vs Session Storage

| Feature | LocalStorage | SessionStorage |
|---------|--------------|----------------|
| **Persistence** | Survives browser restart | Lost on tab close |
| **Scope** | Per origin (all tabs) | Per tab/window |
| **Capacity** | ~5-10MB | ~5-10MB |
| **Data Type** | Strings only | Strings only |

```javascript
// LocalStorage - persistent across sessions
localStorage.setItem('user', JSON.stringify({name: 'John'}));
const user = JSON.parse(localStorage.getItem('user'));
localStorage.removeItem('user');
localStorage.clear();

// SessionStorage - per tab/window
sessionStorage.setItem('temp', 'temporary data');
const temp = sessionStorage.getItem('temp');
```

### 17. IndexedDB

IndexedDB is a low-level API for client-side storage of significant amounts of structured data:

```javascript
// Opening database
const request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: false });
};

request.onsuccess = function(event) {
  const db = event.target.result;

  // Adding data
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');
  objectStore.add({ id: 1, name: 'John', age: 30 });

  // Querying data
  const index = objectStore.index('name');
  const request = index.get('John');
  request.onsuccess = function() {
    console.log('User:', request.result);
  };
};
```

### 18. Web Workers

Web Workers allow running JavaScript in background threads:

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ command: 'start', data: largeArray });

worker.onmessage = function(event) {
  console.log('Result:', event.data);
};

// worker.js
self.onmessage = function(event) {
  if (event.data.command === 'start') {
    // Heavy computation in background
    const result = processLargeData(event.data.data);
    self.postMessage(result);
  }
};
```

### 19. Service Workers

Service Workers enable offline functionality and background sync:

```javascript
// Registering service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => console.log('SW registered'))
    .catch(error => console.log('SW registration failed'));
}

// sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

### 20. Geolocation API

```javascript
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      console.log('Accuracy:', position.coords.accuracy);
    },
    error => {
      console.error('Geolocation error:', error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    }
  );

  // Watch position
  const watchId = navigator.geolocation.watchPosition(
    position => console.log('Position changed:', position),
    error => console.error('Watch error:', error)
  );

  // Stop watching
  navigator.geolocation.clearWatch(watchId);
}
```

### 21. Notification API

```javascript
// Request permission
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    // Create notification
    const notification = new Notification('Hello!', {
      body: 'This is a notification',
      icon: '/icon.png',
      badge: '/badge.png',
      tag: 'unique-tag', // Prevents duplicate notifications
      requireInteraction: true
    });

    // Handle click
    notification.onclick = function() {
      window.focus();
      notification.close();
    };

    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000);
  }
});
```

### 22. Clipboard API

```javascript
// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy:', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

// Read from clipboard
async function readFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Clipboard text:', text);
  } catch (err) {
    console.error('Failed to read clipboard:', err);
  }
}

// Paste event
document.addEventListener('paste', event => {
  const pastedText = event.clipboardData.getData('text');
  console.log('Pasted:', pastedText);
});
```

### 23. Intersection Observer

Monitor elements entering/leaving viewport:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Element is visible');
        entry.target.classList.add('visible');
        // Lazy load images
        if (entry.target.tagName === 'IMG') {
          entry.target.src = entry.target.dataset.src;
        }
      } else {
        console.log('Element is not visible');
        entry.target.classList.remove('visible');
      }
    });
  },
  {
    root: null, // viewport
    rootMargin: '50px', // margin around root
    threshold: 0.1 // trigger when 10% visible
  }
);

// Observe elements
document.querySelectorAll('.observe-me').forEach(el => {
  observer.observe(el);
});
```

### 24. Fetch API

Modern replacement for XMLHttpRequest:

```javascript
// Basic GET request
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

// POST request with JSON
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
.then(response => response.json())
.then(data => console.log('Success:', data));

// Advanced fetch with timeout
function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { signal: controller.signal })
    .then(response => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    });
}
```

### 25. WebSockets

Real-time bidirectional communication:

```javascript
// Client-side WebSocket
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.onopen = function(event) {
  console.log('Connected to server');
  socket.send(JSON.stringify({
    type: 'join',
    room: 'chat-room'
  }));
};

// Listen for messages
socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
  displayMessage(data);
};

// Send message
function sendMessage(message) {
  socket.send(JSON.stringify({
    type: 'message',
    content: message,
    timestamp: Date.now()
  }));
}

// Handle errors
socket.onerror = function(error) {
  console.error('WebSocket error:', error);
};

// Connection closed
socket.onclose = function(event) {
  console.log('Connection closed:', event.code, event.reason);
};
```

**[⬆️ Back to Top](#dom-and-browser-apis-interview-questions)**
