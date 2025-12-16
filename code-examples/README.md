# Code Examples Repository

This folder contains runnable code examples demonstrating key JavaScript interview concepts with interactive demonstrations.

## 📁 Available Examples

### [Core JavaScript](./core-js/)
- **Closures** - Counter, module pattern, private variables
- **Prototypes** - Inheritance, prototype chain
- **Type Coercion** - Implicit/explicit conversion
- **This Keyword** - Context binding patterns
- **Memory Management** - Leaks and garbage collection

### [ES6+ Features](./es6-plus/)
- **Async/Await** - Sequential vs parallel execution
- **Promises** - Chaining, error handling, static methods
- **Destructuring** - Arrays and objects
- **Spread/Rest** - Operators usage
- **Classes** - ES6 class syntax

### [Data Structures](./data-structures/)
- **Array Methods** - map, filter, reduce, find, sort
- **Advanced Arrays** - Chaining, performance tips
- **Objects** - Manipulation, property descriptors
- **Maps & Sets** - ES6 data structures

### [Async Patterns](./async-patterns/)
- **Callback Patterns** - Callback hell solutions
- **Promise Chains** - Sequential async operations
- **Generators** - Async generators
- **Event Loop** - Micro/macro tasks

### [DOM Manipulation](./dom-manipulation/)
- **Element Selection** - Query methods
- **Event Handling** - Delegation, bubbling
- **Dynamic Content** - Creation and manipulation

### [Node.js Examples](./nodejs/)
- **HTTP Server** - REST API implementation
- **File Operations** - Read/write with streams
- **Authentication** - JWT, middleware
- **Error Handling** - Global handlers

### [React Components](./react/)
- **Hooks** - useState, useEffect, useContext
- **Components** - Class vs functional
- **State Management** - Local and global state
- **Performance** - Memo, lazy loading

### [Testing Examples](./testing/)
- **Jest Tests** - Unit test patterns
- **Mocking** - Functions, modules, API calls
- **React Testing** - Component testing
- **Coverage** - Test coverage reports

## 🚀 Running Examples

### Node.js Examples
```bash
# Core JavaScript closures
node code-examples/core-js/closures.js

# ES6+ async/await patterns
node code-examples/es6-plus/async-await.js

# Array manipulation methods
node code-examples/data-structures/arrays.js

# Node.js HTTP server
node code-examples/nodejs/server.js
```

### Browser Examples
```bash
# Open in browser (requires live server)
# Core JavaScript interactive demo
open code-examples/core-js/index.html

# DOM manipulation examples
open code-examples/dom-manipulation/index.html
```

### React Examples
```bash
# Navigate to React examples
cd code-examples/react

# Install dependencies (if needed)
npm install

# Start development server
npm start
```

## 🎯 Learning Approach

### 1. **Study the Concept**
- Read the main README in each topic folder
- Understand the theoretical concepts
- Review common interview questions

### 2. **Run the Examples**
- Execute code to see concepts in action
- Observe console output and behavior
- Test edge cases by modifying code

### 3. **Interactive Learning**
- Browser examples include live demos
- Modify variables and see real-time changes
- Experiment with different scenarios

### 4. **Practice Implementation**
- Try implementing concepts without looking at examples
- Compare your solution with provided solutions
- Optimize for performance and readability

## 📊 Example Categories

### 🟢 Beginner Friendly
- Basic array methods
- Simple closures
- Variable declarations
- Basic DOM operations

### 🟡 Intermediate
- Async/await patterns
- Prototype inheritance
- React hooks
- Node.js basics

### 🔴 Advanced
- Memory management
- Custom data structures
- Performance optimization
- Complex async patterns

## 🛠️ Development Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- Modern web browser
- Text editor (VS Code recommended)

### Installing Dependencies
```bash
# Root directory
npm install

# Individual example directories (if needed)
cd code-examples/react
npm install
```

### Running Tests
```bash
# Run all tests
npm test

# Run specific test
npm test -- --testNamePattern="closures"
```

## 📈 Interview Preparation Tips

### **Practice Strategy:**
1. **Daily Practice** - Run 2-3 examples daily
2. **Code Review** - Compare with provided solutions
3. **Edge Cases** - Test with unusual inputs
4. **Performance** - Optimize your implementations
5. **Explanation** - Practice explaining code to others

### **Common Interview Patterns:**
- **Array Manipulation** - transform, filter, aggregate
- **Async Operations** - handle promises, error cases
- **Data Structures** - implement common algorithms
- **Memory Management** - avoid leaks, optimize usage
- **Event Handling** - DOM events, custom events

### **Red Flags to Avoid:**
- ❌ Modifying arrays during iteration
- ❌ Not handling async errors
- ❌ Memory leaks in closures
- ❌ Inefficient algorithms
- ❌ Not understanding `this` binding

## 🤝 Contributing

**Add New Examples:**
1. Create folder in appropriate category
2. Add `index.js` for Node.js examples
3. Add `index.html` for browser examples
4. Include comprehensive comments
5. Test across different environments

**Example Structure:**
```
code-examples/
├── category-name/
│   ├── example-name.js      # Main example file
│   ├── index.html          # Browser demo (optional)
│   ├── test.js            # Unit tests (optional)
│   └── README.md          # Explanation
```

**[🏠 Back to Main Repository](../README.md)**