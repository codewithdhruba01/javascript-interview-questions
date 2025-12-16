# JavaScript Performance Optimization Interview Questions

## Table of Contents

### [Performance Fundamentals](#performance-fundamentals)
1. [Performance Metrics](#1-performance-metrics)
2. [Critical Rendering Path](#2-critical-rendering-path)
3. [Performance Budget](#3-performance-budget)
4. [Performance Monitoring](#4-performance-monitoring)

### [JavaScript Optimization](#javascript-optimization)
5. [Memory Management](#5-memory-management)
6. [Garbage Collection](#6-garbage-collection)
7. [Debouncing and Throttling](#7-debouncing-and-throttling)
8. [Code Splitting](#8-code-splitting)

### [DOM and Rendering](#dom-and-rendering)
9. [DOM Manipulation Optimization](#9-dom-manipulation-optimization)
10. [Virtual DOM](#10-virtual-dom)
11. [Layout and Paint Optimization](#11-layout-and-paint-optimization)
12. [Animation Performance](#12-animation-performance)

### [Network Optimization](#network-optimization)
13. [HTTP Caching](#13-http-caching)
14. [Resource Hints](#14-resource-hints)
15. [Bundle Analysis](#15-bundle-analysis)
16. [Lazy Loading](#16-lazy-loading)

---

## Performance Fundamentals

### 1. Performance Metrics

**Core Web Vitals:**
- **LCP (Largest Contentful Paint)**: Time to load largest content element (should be < 2.5s)
- **FID (First Input Delay)**: Time from user interaction to response (should be < 100ms)
- **CLS (Cumulative Layout Shift)**: Visual stability of page (should be < 0.1)

**Other Key Metrics:**
- **FCP (First Contentful Paint)**: Time to first content
- **TTI (Time to Interactive)**: Time when page becomes fully interactive
- **TBT (Total Blocking Time)**: Sum of blocking periods after FCP

**Measuring Performance:**
```javascript
// Use Performance API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.startTime, entry.duration);
  }
});

observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });

// Mark and measure custom timings
performance.mark('start-render');
renderComponent();
performance.mark('end-render');
performance.measure('render-time', 'start-render', 'end-render');

console.log(performance.getEntriesByName('render-time')[0].duration);
```

### 2. Critical Rendering Path

**Steps in CRP:**
1. **HTML Parsing**: Build DOM tree
2. **CSS Parsing**: Build CSSOM tree
3. **Render Tree**: Combine DOM + CSSOM
4. **Layout**: Calculate positions and sizes
5. **Paint**: Draw pixels to screen
6. **Composite**: Layer composition

**Optimization Techniques:**
```html
<!-- Critical CSS inline -->
<style>
  .hero { background: red; color: white; }
  /* Only critical styles here */
</style>

<!-- Non-critical CSS async -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

```javascript
// Optimize JavaScript loading
<script>
  // Small inline script for critical JS
  function init() {
    // Critical initialization
  }
</script>

<script src="app.js" defer></script> <!-- Non-blocking -->
```

### 3. Performance Budget

**Setting Budgets:**
```javascript
// webpack performance hints
module.exports = {
  performance: {
    hints: 'warning',
    maxEntrypointSize: 400000, // 400KB
    maxAssetSize: 200000,      // 200KB
  }
};
```

**Bundle Analyzer:**
```javascript
// webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

**Performance Budget Tools:**
```javascript
// Lighthouse CI
// .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: https://example.com
          budgetPath: ./budget.json
```

### 4. Performance Monitoring

**Real User Monitoring (RUM):**
```javascript
// Basic performance monitoring
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];

  const metrics = {
    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
    tcp: perfData.connectEnd - perfData.connectStart,
    ssl: perfData.secureConnectionStart ? perfData.connectEnd - perfData.secureConnectionStart : 0,
    ttfb: perfData.responseStart - perfData.requestStart,
    download: perfData.responseEnd - perfData.responseStart,
    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
    loaded: perfData.loadEventEnd - perfData.loadEventStart
  };

  // Send to analytics
  sendToAnalytics('page_performance', metrics);
});
```

**Error Tracking:**
```javascript
// Global error handler
window.addEventListener('error', (event) => {
  const error = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack
  };

  sendToAnalytics('javascript_error', error);
});

// Promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  const error = {
    message: event.reason?.message || 'Unhandled promise rejection',
    stack: event.reason?.stack
  };

  sendToAnalytics('promise_rejection', error);
});
```

---

## JavaScript Optimization

### 5. Memory Management

**Memory Leaks to Avoid:**
```javascript
// 1. Closures can cause memory leaks
function createLeak() {
  const largeData = new Array(1000000).fill('data');

  return function() {
    console.log(largeData.length); // largeData stays in memory
  };
}

// Solution: Clean up references
function createNoLeak() {
  let largeData = new Array(1000000).fill('data');

  return function() {
    console.log(largeData.length);
    largeData = null; // Allow garbage collection
  };
}

// 2. Event listeners
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.handleClick);
  }

  destroy() {
    document.removeEventListener('click', this.handleClick);
  }
}

// 3. Timers
class TimerComponent {
  constructor() {
    this.timer = setInterval(() => {
      console.log('tick');
    }, 1000);
  }

  destroy() {
    clearInterval(this.timer);
  }
}
```

**Memory Profiling:**
```javascript
// Chrome DevTools Memory tab
// 1. Take heap snapshot
// 2. Look for detached DOM nodes
// 3. Check for growing memory usage
// 4. Use allocation timeline

// Programmatic memory monitoring
if (performance.memory) {
  setInterval(() => {
    console.log('Memory usage:', {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    });
  }, 1000);
}
```

### 6. Garbage Collection

**GC Concepts:**
- **Mark and Sweep**: Mark reachable objects, sweep unreachable
- **Generational GC**: New objects vs old objects
- **Incremental GC**: GC in small chunks to avoid pauses

**Optimizing for GC:**
```javascript
// Avoid creating objects in loops
// Bad
for (let i = 0; i < 100000; i++) {
  const obj = { data: i }; // Creates 100k objects
  process(obj);
}

// Good
const obj = { data: null };
for (let i = 0; i < 100000; i++) {
  obj.data = i; // Reuse object
  process(obj);
}

// Use object pools for frequently created objects
class BulletPool {
  constructor(size = 100) {
    this.pool = [];
    this.index = 0;
    for (let i = 0; i < size; i++) {
      this.pool.push(new Bullet());
    }
  }

  get() {
    if (this.index >= this.pool.length) {
      this.pool.push(new Bullet());
    }
    return this.pool[this.index++];
  }

  release(bullet) {
    bullet.reset();
    this.pool[--this.index] = bullet;
  }
}
```

### 7. Debouncing and Throttling

**Debouncing:**
```javascript
// Delays execution until after delay has passed
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  searchAPI(query);
}, 300);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

**Throttling:**
```javascript
// Ensures function executes at most once per interval
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

// Usage
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

**RequestAnimationFrame Throttling:**
```javascript
// For animations and scroll events
function rafThrottle(func) {
  let ticking = false;
  return function(...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
}
```

### 8. Code Splitting

**Dynamic Imports:**
```javascript
// Route-based splitting
const routes = {
  home: () => import('./pages/Home.js'),
  about: () => import('./pages/About.js'),
  dashboard: () => import('./pages/Dashboard.js')
};

function loadRoute(route) {
  routes[route]().then(module => {
    const Page = module.default;
    renderPage(Page);
  });
}

// Component-based splitting
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**Webpack Code Splitting:**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all'
        }
      }
    }
  }
};
```

---

## DOM and Rendering

### 9. DOM Manipulation Optimization

**DocumentFragment:**
```javascript
// Bad: Multiple DOM insertions
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li); // 1000 DOM operations
}

// Good: Batch with DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
list.appendChild(fragment); // 1 DOM operation
```

**Efficient DOM Updates:**
```javascript
// Cache DOM queries
class TodoList {
  constructor() {
    this.list = document.getElementById('todo-list');
    this.template = document.getElementById('todo-template');
  }

  addTodo(text) {
    const clone = this.template.content.cloneNode(true);
    clone.querySelector('.todo-text').textContent = text;
    this.list.appendChild(clone);
  }
}

// Use CSS classes instead of style manipulation
// Bad
element.style.display = 'none';
element.style.display = 'block';

// Good
element.classList.add('hidden');
element.classList.remove('hidden');
```

### 10. Virtual DOM

**Virtual DOM Concept:**
```javascript
// Virtual DOM representation
const virtualTree = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello World'] },
    {
      type: 'ul',
      props: {},
      children: [
        { type: 'li', props: {}, children: ['Item 1'] },
        { type: 'li', props: {}, children: ['Item 2'] }
      ]
    }
  ]
};

// Diffing algorithm
function diff(oldTree, newTree) {
  // Compare trees and generate patches
  const patches = [];

  if (oldTree.type !== newTree.type) {
    patches.push({ type: 'REPLACE', newNode: newTree });
  } else {
    // Compare props and children
    const propPatches = diffProps(oldTree.props, newTree.props);
    if (propPatches.length) {
      patches.push({ type: 'PROPS', props: propPatches });
    }

    const childPatches = diffChildren(oldTree.children, newTree.children);
    if (childPatches.length) {
      patches.push({ type: 'CHILDREN', patches: childPatches });
    }
  }

  return patches;
}
```

**React Virtual DOM:**
```jsx
// React handles virtual DOM automatically
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
// Only changed elements update in real DOM
```

### 11. Layout and Paint Optimization

**Layout Thrashing:**
```javascript
// Bad: Forces layout multiple times
const elements = document.querySelectorAll('.item');

elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + 'px'; // Reads layout
  el.style.height = el.offsetHeight + 10 + 'px'; // Reads layout again
});

// Good: Batch reads, then writes
const elements = document.querySelectorAll('.item');

// Read phase
const widths = Array.from(elements).map(el => el.offsetWidth);
const heights = Array.from(elements).map(el => el.offsetHeight);

// Write phase
elements.forEach((el, index) => {
  el.style.width = widths[index] + 10 + 'px';
  el.style.height = heights[index] + 10 + 'px';
});
```

**CSS Containment:**
```css
/* Contain layout, style, and paint */
.contained-element {
  contain: layout style paint;
}

/* Or contain all */
.contained-element {
  contain: strict;
}
```

**will-change Property:**
```css
/* Tell browser about upcoming changes */
.moving-element {
  will-change: transform;
}

/* Reset when done */
.moving-element:not(.moving) {
  will-change: auto;
}
```

### 12. Animation Performance

**Use Transform Instead of Position:**
```css
/* Good: Uses GPU acceleration */
.animated {
  transform: translateX(100px);
  transition: transform 0.3s ease;
}

/* Bad: Causes layout recalculation */
.animated {
  left: 100px;
  transition: left 0.3s ease;
}
```

**RequestAnimationFrame:**
```javascript
// Smooth 60fps animation
function animate() {
  const element = document.getElementById('animated');
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    element.style.transform = `translateX(${progress * 0.1}px)`;

    if (progress < 2000) { // Animate for 2 seconds
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
```

---

## Network Optimization

### 13. HTTP Caching

**Cache Headers:**
```javascript
// Express.js cache headers
app.get('/api/data', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=3600', // 1 hour
    'ETag': generateETag(data),
    'Last-Modified': new Date().toUTCString()
  });
  res.json(data);
});

// Conditional requests
app.get('/api/data', (req, res) => {
  const etag = req.headers['if-none-match'];
  const lastModified = req.headers['if-modified-since'];

  if (etag === currentETag || lastModified === currentLastModified) {
    res.status(304).end(); // Not modified
  } else {
    res.set({
      'ETag': currentETag,
      'Last-Modified': currentLastModified,
      'Cache-Control': 'public, max-age=3600'
    });
    res.json(data);
  }
});
```

**Service Worker Caching:**
```javascript
// sw.js
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/app.js',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Cache hit
        }
        return fetch(event.request); // Cache miss
      })
  );
});
```

### 14. Resource Hints

**Preload Critical Resources:**
```html
<!-- Preload critical CSS -->
<link rel="preload" href="critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- Preload critical JS -->
<link rel="preload" href="critical.js" as="script">

<!-- Preload fonts -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://cdn.example.com">
```

**Module Preloading:**
```html
<!-- Preload ES modules -->
<link rel="modulepreload" href="utils.js">
<link rel="modulepreload" href="component.js">
```

### 15. Bundle Analysis

**Webpack Bundle Analyzer:**
```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generate HTML file
      openAnalyzer: false
    })
  ]
};
```

**Common Issues to Look For:**
- **Large Dependencies**: Consider lazy loading or alternatives
- **Duplicate Code**: Check for code duplication
- **Unused Code**: Remove dead code
- **Large Assets**: Optimize images, fonts

### 16. Lazy Loading

**Image Lazy Loading:**
```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded image">

<!-- JavaScript lazy loading -->
<img data-src="image.jpg" alt="Lazy loaded image">
```

```javascript
// Intersection Observer for lazy loading
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

**Component Lazy Loading:**
```javascript
// React lazy loading
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Vue lazy loading
const LazyComponent = () => import('./HeavyComponent.vue');

new Vue({
  components: {
    LazyComponent
  }
});
```

**[⬆️ Back to Top](#javascript-performance-optimization-interview-questions)**
