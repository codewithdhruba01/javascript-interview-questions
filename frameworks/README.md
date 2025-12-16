# JavaScript Frameworks Interview Questions

## Table of Contents

### [React Fundamentals](#react-fundamentals)
1. [What is React?](#1-what-is-react)
2. [JSX vs JavaScript](#2-jsx-vs-javascript)
3. [Virtual DOM](#3-virtual-dom)
4. [Component Lifecycle](#4-component-lifecycle)
5. [Props vs State](#5-props-vs-state)

### [React Hooks](#react-hooks)
6. [useState Hook](#6-usestate-hook)
7. [useEffect Hook](#7-useeffect-hook)
8. [useContext Hook](#8-usecontext-hook)
9. [useReducer Hook](#9-usereducer-hook)
10. [Custom Hooks](#10-custom-hooks)

### [React Advanced](#react-advanced)
11. [Higher-Order Components](#11-higher-order-components)
12. [Render Props](#12-render-props)
13. [Context API](#13-context-api)
14. [Error Boundaries](#14-error-boundaries)
15. [React.memo](#15-reactmemo)

### [Vue.js Fundamentals](#vuejs-fundamentals)
16. [Vue.js Overview](#16-vuejs-overview)
17. [Vue Instance](#17-vue-instance)
18. [Template Syntax](#18-template-syntax)
19. [Computed Properties](#19-computed-properties)
20. [Watchers](#20-watchers)

### [Vue.js Advanced](#vuejs-advanced)
21. [Vue CLI](#21-vue-cli)
22. [Single File Components](#22-single-file-components)
23. [Vue Router](#23-vue-router)
24. [Vuex (State Management)](#24-vuex-state-management)
25. [Composition API](#25-composition-api)

### [Angular Fundamentals](#angular-fundamentals)
26. [Angular Overview](#26-angular-overview)
27. [Components and Modules](#27-components-and-modules)
28. [Templates and Directives](#28-templates-and-directives)
29. [Services and Dependency Injection](#29-services-and-dependency-injection)
30. [Angular CLI](#30-angular-cli)

---

## React Fundamentals

### 1. What is React?

**React** is a JavaScript library for building user interfaces, particularly web applications. It's maintained by Facebook (Meta) and focuses on building reusable UI components.

**Key Features:**
- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like, React handles the DOM updates
- **Virtual DOM**: Efficiently updates only the parts of the DOM that changed
- **One-Way Data Flow**: Data flows down from parent to child components
- **JSX**: Syntax extension that allows writing HTML-like code in JavaScript

```jsx
// Simple React component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Class component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Usage
const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

### 2. JSX vs JavaScript

**JSX** (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.

```jsx
// JSX
const element = (
  <div className="greeting">
    <h1>Hello, world!</h1>
    <p>Welcome to React.</p>
  </div>
);

// Equivalent JavaScript (what JSX compiles to)
const element = React.createElement(
  'div',
  { className: 'greeting' },
  React.createElement('h1', null, 'Hello, world!'),
  React.createElement('p', null, 'Welcome to React.')
);
```

**JSX Rules:**
- Always return a single root element
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- Self-closing tags must end with `/>`
- JavaScript expressions in curly braces `{}`

### 3. Virtual DOM

**Virtual DOM** is a lightweight representation of the actual DOM in memory. React uses it to optimize DOM manipulation.

```jsx
// When state changes, React:
// 1. Creates a new Virtual DOM tree
// 2. Compares it with the previous Virtual DOM (diffing)
// 3. Calculates the minimal set of changes needed
// 4. Updates only those parts in the real DOM (reconciliation)

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
    // React updates only the counter text, not the entire component
  };

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

**Benefits:**
- **Performance**: Minimizes direct DOM manipulation
- **Efficiency**: Batches updates for optimal rendering
- **Cross-platform**: Can render to different platforms (web, mobile, etc.)

### 4. Component Lifecycle

**Class Component Lifecycle Methods:**

```jsx
class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    console.log('Constructor: Component being created');
    this.state = { data: null };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps: Props changed');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount: Component mounted');
    // Perfect for API calls
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate: Should re-render?');
    return true; // or false to prevent re-render
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate: Before DOM update');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate: Component updated');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount: Component will be removed');
    // Cleanup: remove event listeners, cancel requests
  }

  render() {
    console.log('render: Rendering component');
    return <div>Lifecycle Demo</div>;
  }
}
```

**Lifecycle Phases:**
1. **Mounting**: Constructor → getDerivedStateFromProps → render → componentDidMount
2. **Updating**: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
3. **Unmounting**: componentWillUnmount

### 5. Props vs State

| Feature | Props | State |
|---------|-------|-------|
| **Definition** | Data passed from parent | Internal component data |
| **Mutability** | Read-only | Can be changed |
| **Owner** | Parent component | Component itself |
| **Updates** | Parent re-renders | Component re-renders |
| **Default values** | defaultProps | Initial state |

```jsx
// Props example
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// Default props
UserCard.defaultProps = {
  age: 18
};

// State example
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isLoading: false
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

---

## React Hooks

### 6. useState Hook

**useState** allows you to add state to functional components.

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declare state variable and setter
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  const increment = () => {
    setCount(count + 1); // Direct value
    setCount(prevCount => prevCount + 1); // Function (better for async)
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>

      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

**State with Objects/Arrays:**
```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateField = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), text, completed: false }
    ]);
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={e => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <button onClick={() => addTodo('New todo')}>Add Todo</button>
    </div>
  );
}
```

### 7. useEffect Hook

**useEffect** handles side effects in functional components.

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect runs after every render
  useEffect(() => {
    console.log('Component rendered');
  });

  // Effect runs only once (on mount)
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array

  // Effect runs when id changes
  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // Dependency array

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup effect
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer running');
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
      console.log('Timer cleaned up');
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
}
```

### 8. useContext Hook

**useContext** allows consuming context values in functional components.

```jsx
// Create context
const ThemeContext = React.createContext('light');
const UserContext = React.createContext(null);

// Provider component
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John', role: 'admin' });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={user}>
        <Toolbar />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Consuming context
function Toolbar() {
  return (
    <div>
      <ThemeButton />
      <UserInfo />
    </div>
  );
}

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff'
      }}
    >
      Toggle Theme
    </button>
  );
}

function UserInfo() {
  const user = useContext(UserContext);

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

### 9. useReducer Hook

**useReducer** is an alternative to useState for complex state logic.

```jsx
import React, { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>
        Set to 10
      </button>
    </div>
  );
}

// Complex state with useReducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        text: action.payload,
        completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  return (
    <div>
      {/* Todo UI */}
    </div>
  );
}
```

### 10. Custom Hooks

**Custom hooks** allow you to extract and reuse stateful logic.

```jsx
// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'John');

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

// Custom hook for API calls
function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

---

## React Advanced

### 11. Higher-Order Components

**HOC** is a function that takes a component and returns a new component with additional props or behavior.

```jsx
// Basic HOC
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

// In parent component
<UserListWithLoading isLoading={loading} users={users} />
```

**HOC with Authentication:**
```jsx
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      checkAuth().then(setUser).finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Checking authentication...</div>;
    if (!user) return <div>Please log in</div>;

    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile = withAuth(Profile);
```

### 12. Render Props

**Render Props** is a pattern where a component receives a function as a prop and calls it to render content.

```jsx
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          Mouse position: {x}, {y}
        </div>
      )}
    />
  );
}

// With children as function
<MouseTracker>
  {({ x, y }) => <div>Mouse: {x}, {y}</div>}
</MouseTracker>
```

**Data Fetching with Render Props:**
```jsx
class DataFetcher extends React.Component {
  state = { data: null, loading: true, error: null };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch(this.props.url);
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  render() {
    return this.props.children(this.state);
  }
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <UserList users={data} />;
  }}
</DataFetcher>
```

### 13. Context API

**Context** provides a way to pass data through the component tree without having to pass props down manually.

```jsx
// Create context
const ThemeContext = React.createContext();

// Provider component
class ThemeProvider extends React.Component {
  state = { theme: 'light' };

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light'
    });
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          toggleTheme: this.toggleTheme
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

// Consumer component (class)
class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <button
            style={{
              background: theme === 'light' ? '#fff' : '#333',
              color: theme === 'light' ? '#000' : '#fff'
            }}
            onClick={toggleTheme}
          >
            Toggle Theme
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}

// Hook-based consumer
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff'
      }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>My App</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}
```

### 14. Error Boundaries

**Error Boundaries** catch JavaScript errors anywhere in the component tree and display fallback UI.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}

// Functional error boundary with hooks (React 18+)
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error('Error:', error, errorInfo);
      setHasError(true);
    };

    // This is a simplified version. In practice, you'd use error boundaries
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <div>Something went wrong.</div>;
  }

  return children;
}
```

### 15. React.memo

**React.memo** prevents re-rendering of functional components if props haven't changed.

```jsx
// Without memo - re-renders every time parent re-renders
function ExpensiveComponent({ data, onClick }) {
  console.log('ExpensiveComponent rendered');
  return (
    <div>
      <h2>Data: {data.value}</h2>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

// With memo - only re-renders when props change
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data, onClick }) {
  console.log('ExpensiveComponent rendered');
  return (
    <div>
      <h2>Data: {data.value}</h2>
      <button onClick={onClick}>Click me</button>
    </div>
  );
});

// Custom comparison function
const ExpensiveComponent = React.memo(
  function ExpensiveComponent({ data, onClick }) {
    console.log('ExpensiveComponent rendered');
    return (
      <div>
        <h2>Data: {data.value}</h2>
        <button onClick={onClick}>Click me</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if data.value changed
    return prevProps.data.value === nextProps.data.value;
  }
);

// Usage in parent component
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ value: 'initial' });

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Re-render parent: {count}
      </button>
      <ExpensiveComponent
        data={data}
        onClick={handleClick}
      />
    </div>
  );
}
```

---

## Vue.js Fundamentals

### 16. Vue.js Overview

**Vue.js** is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable and focuses on the view layer.

**Key Features:**
- **Reactive**: Automatically updates the DOM when data changes
- **Component-Based**: Build reusable UI components
- **Directive-Based**: Use directives like v-if, v-for for DOM manipulation
- **Lightweight**: Small bundle size compared to other frameworks
- **Easy Learning Curve**: Simple API and clear documentation

```html
<!-- index.html -->
<div id="app">
  <h1>{{ message }}</h1>
  <button @click="changeMessage">Change Message</button>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    changeMessage() {
      this.message = 'Message changed!';
    }
  }
});
</script>
```

### 17. Vue Instance

**Vue Instance** is the root of every Vue application.

```javascript
// Create Vue instance
const vm = new Vue({
  // Options object
  el: '#app', // Mount element

  // Data
  data: {
    message: 'Hello Vue!',
    count: 0,
    user: {
      name: 'John',
      age: 30
    }
  },

  // Computed properties
  computed: {
    fullName() {
      return this.user.name + ' Doe';
    },
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  },

  // Methods
  methods: {
    increment() {
      this.count++;
    },
    greet() {
      alert('Hello from Vue!');
    }
  },

  // Watchers
  watch: {
    count(newVal, oldVal) {
      console.log(`Count changed from ${oldVal} to ${newVal}`);
    }
  },

  // Lifecycle hooks
  created() {
    console.log('Instance created');
  },
  mounted() {
    console.log('Instance mounted');
  },
  updated() {
    console.log('Instance updated');
  },
  destroyed() {
    console.log('Instance destroyed');
  }
});

// Accessing instance
console.log(vm.message); // 'Hello Vue!'
vm.increment(); // count becomes 1
```

### 18. Template Syntax

**Vue templates** use declarative syntax for rendering data to the DOM.

```html
<div id="app">
  <!-- Text interpolation -->
  <p>{{ message }}</p>
  <p>{{ message.toUpperCase() }}</p>

  <!-- Raw HTML -->
  <div v-html="htmlContent"></div>

  <!-- Attributes -->
  <div v-bind:class="className">Dynamic class</div>
  <div :class="className">Shorthand</div>

  <!-- Conditionals -->
  <div v-if="show">Content shown</div>
  <div v-else-if="maybe">Maybe shown</div>
  <div v-else>Not shown</div>

  <!-- Loops -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}. {{ item.name }}
    </li>
  </ul>

  <!-- Events -->
  <button v-on:click="handleClick">Click me</button>
  <button @click="handleClick">Shorthand</button>

  <!-- Two-way binding -->
  <input v-model="message" />
  <textarea v-model="message"></textarea>

  <!-- Modifiers -->
  <form @submit.prevent="handleSubmit">
    <input v-model.trim="message" />
    <button type="submit">Submit</button>
  </form>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    message: 'Hello',
    htmlContent: '<strong>Bold text</strong>',
    className: 'active',
    show: true,
    maybe: false,
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]
  },
  methods: {
    handleClick() {
      this.message = 'Button clicked!';
    },
    handleSubmit() {
      console.log('Form submitted:', this.message);
    }
  }
});
</script>
```

### 19. Computed Properties

**Computed properties** are cached and only re-evaluated when their dependencies change.

```javascript
new Vue({
  el: '#app',
  data: {
    firstName: 'John',
    lastName: 'Doe',
    todos: [
      { text: 'Learn Vue', done: true },
      { text: 'Build app', done: false },
      { text: 'Deploy app', done: false }
    ]
  },

  computed: {
    // Getter only
    fullName() {
      console.log('Computing fullName...');
      return this.firstName + ' ' + this.lastName;
    },

    // Getter and setter
    fullNameReversed: {
      get() {
        return this.firstName + ' ' + this.lastName;
      },
      set(newValue) {
        const parts = newValue.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[1];
      }
    },

    // Computed with dependency
    completedTodos() {
      return this.todos.filter(todo => todo.done);
    },

    pendingTodos() {
      return this.todos.filter(todo => !todo.done);
    },

    completionRate() {
      return Math.round((this.completedTodos.length / this.todos.length) * 100);
    }
  },

  methods: {
    addTodo(text) {
      this.todos.push({ text, done: false });
    }
  }
});
```

### 20. Watchers

**Watchers** allow you to perform async operations when data changes.

```javascript
new Vue({
  el: '#app',
  data: {
    question: '',
    answer: 'Ask me something!'
  },

  watch: {
    // Basic watcher
    question(newQuestion, oldQuestion) {
      this.answer = 'Thinking...';
      this.debouncedGetAnswer();
    },

    // Deep watcher for objects/arrays
    someObject: {
      handler(newVal, oldVal) {
        console.log('Object changed:', newVal);
      },
      deep: true
    },

    // Immediate watcher (runs on initialization)
    counter: {
      handler(newVal) {
        console.log('Counter changed to:', newVal);
      },
      immediate: true
    }
  },

  created() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },

  methods: {
    getAnswer() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)';
        return;
      }

      this.answer = 'Thinking...';
      // Simulate API call
      setTimeout(() => {
        const answers = [
          'Yes', 'No', 'Maybe', 'Ask again later'
        ];
        this.answer = answers[Math.floor(Math.random() * answers.length)];
      }, 1000);
    }
  }
});
```

---

## Vue.js Advanced

### 21. Vue CLI

**Vue CLI** is the standard tooling for Vue.js development.

```bash
# Install Vue CLI
npm install -g @vue/cli

# Create new project
vue create my-project

# Add plugins
vue add router
vue add vuex
vue add typescript

# Development server
npm run serve

# Build for production
npm run build

# Run tests
npm run test:unit
npm run test:e2e
```

**Project Structure:**
```
my-vue-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── store/
│   └── assets/
├── tests/
├── .gitignore
├── babel.config.js
├── package.json
└── vue.config.js
```

### 22. Single File Components

**Single File Components** (.vue files) encapsulate template, script, and styles.

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card" :class="{ active: isActive }">
    <img :src="user.avatar" :alt="user.name" />
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <p v-if="user.bio">{{ user.bio }}</p>
    </div>
    <button @click="toggleActive">
      {{ isActive ? 'Deactivate' : 'Activate' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
      this.$emit('toggle', this.user.id);
    }
  },
  computed: {
    displayName() {
      return this.user.name.toUpperCase();
    }
  }
};
</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
}

.user-card.active {
  border-color: #42b883;
  background-color: #f8f9fa;
}

.user-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}
</style>
```

### 23. Vue Router

**Vue Router** handles client-side routing for Vue applications.

```javascript
// router.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import User from './views/User.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history', // Use history mode for clean URLs
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      props: true, // Pass route params as props
      children: [
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'posts',
          component: UserPosts
        }
      ]
    },
    {
      path: '*',
      redirect: '/' // Catch-all route
    }
  ]
});

// Navigation guards
router.beforeEach((to, from, next) => {
  // Check authentication
  const isAuthenticated = checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
```

**Using Router in Components:**
```vue
<template>
  <div>
    <!-- Navigation -->
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link :to="`/user/${userId}`">Profile</router-link>
    </nav>

    <!-- Route content -->
    <router-view />

    <!-- Named router-view for children -->
    <router-view name="sidebar" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 123
    };
  },
  methods: {
    goToUser() {
      // Programmatic navigation
      this.$router.push(`/user/${this.userId}`);
      // or
      this.$router.push({ name: 'user', params: { id: this.userId } });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
```

### 24. Vuex (State Management)

**Vuex** is the official state management library for Vue.js applications.

```javascript
// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    todos: [],
    user: null
  },

  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    }
  },

  mutations: {
    increment(state) {
      state.count++;
    },
    setUser(state, user) {
      state.user = user;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    toggleTodo(state, id) {
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.done = !todo.done;
      }
    }
  },

  actions: {
    async fetchUser({ commit }) {
      try {
        const response = await fetch('/api/user');
        const user = await response.json();
        commit('setUser', user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },

    async addTodoAsync({ commit }, text) {
      const todo = {
        id: Date.now(),
        text,
        done: false
      };
      commit('addTodo', todo);
    },

    incrementAsync({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('increment');
          resolve();
        }, 1000);
      });
    }
  },

  modules: {
    // Sub-modules can be added here
  }
});
```

**Using Vuex in Components:**
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="incrementAsync">+ Async</button>

    <div v-if="user">
      <h2>Welcome, {{ user.name }}!</h2>
    </div>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="toggleTodo(todo.id)">Toggle</button>
      </li>
    </ul>

    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add todo" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      newTodo: ''
    };
  },

  computed: {
    // Map state to computed properties
    ...mapState(['count', 'todos', 'user']),

    // Map getters
    ...mapGetters(['doneTodosCount'])
  },

  methods: {
    // Map mutations
    ...mapMutations(['toggleTodo']),

    // Map actions
    ...mapActions(['incrementAsync']),

    // Custom methods
    increment() {
      this.$store.commit('increment');
    },

    addTodo() {
      if (this.newTodo.trim()) {
        this.$store.dispatch('addTodoAsync', this.newTodo.trim());
        this.newTodo = '';
      }
    }
  },

  // Fetch user on component creation
  async created() {
    await this.$store.dispatch('fetchUser');
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
```

### 25. Composition API

**Composition API** is a set of APIs that allows us to write Vue components using imported functions instead of declaring options.

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue';

export default {
  name: 'CompositionExample',

  setup() {
    // Reactive references
    const count = ref(0);
    const title = ref('Composition API Example');

    // Reactive object
    const state = reactive({
      loading: true,
      error: null,
      posts: []
    });

    // Computed properties
    const doubleCount = computed(() => count.value * 2);
    const isEven = computed(() => count.value % 2 === 0);

    // Methods
    const increment = () => {
      count.value++;
    };

    const decrement = () => {
      count.value--;
    };

    const fetchPosts = async () => {
      try {
        state.loading = true;
        const response = await fetch('/api/posts');
        state.posts = await response.json();
      } catch (err) {
        state.error = err.message;
      } finally {
        state.loading = false;
      }
    };

    // Watchers
    watch(count, (newCount, oldCount) => {
      console.log(`Count changed from ${oldCount} to ${newCount}`);
    });

    watch(
      () => state.posts,
      (newPosts) => {
        console.log(`Posts updated: ${newPosts.length} posts`);
      },
      { deep: true }
    );

    // Lifecycle hooks
    onMounted(() => {
      console.log('Component mounted');
      fetchPosts();
    });

    // Expose reactive data and methods
    return {
      title,
      count,
      doubleCount,
      isEven,
      increment,
      decrement,
      loading: computed(() => state.loading),
      error: computed(() => state.error),
      posts: computed(() => state.posts)
    };
  }
};
</script>
```

---

## Angular Fundamentals

### 26. Angular Overview

**Angular** is a platform and framework for building client applications in HTML and TypeScript. It's developed and maintained by Google.

**Key Features:**
- **TypeScript**: Built with TypeScript for better tooling
- **Component-Based**: Everything is a component
- **Dependency Injection**: Built-in DI system
- **RxJS**: Reactive programming with observables
- **CLI**: Powerful command-line interface
- **Ivy**: Next-generation compilation and rendering

**Basic Angular App:**
```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <input [(ngModel)]="title" placeholder="Enter title">
    <button (click)="changeTitle()">Change Title</button>
  `
})
export class AppComponent {
  title = 'My Angular App';

  changeTitle() {
    this.title = 'Title Changed!';
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 27. Components and Modules

**Components** are the building blocks of Angular applications.

```typescript
// user.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <div class="user-card">
      <img [src]="user.avatar" [alt]="user.name">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="onDelete.emit(user.id)">Delete</button>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ddd;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
    }
  `]
})
export class UserComponent {
  @Input() user: User;
  @Output() onDelete = new EventEmitter<number>();
}

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Users</h1>
    <app-user
      *ngFor="let user of users; trackBy: trackByUserId"
      [user]="user"
      (onDelete)="deleteUser($event)">
    </app-user>
  `
})
export class AppComponent {
  users: User[] = [
    { id: 1, name: 'John', email: 'john@example.com', avatar: 'avatar1.jpg' },
    { id: 2, name: 'Jane', email: 'jane@example.com', avatar: 'avatar2.jpg' }
  ];

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}
```

**Modules:**
```typescript
// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule],
  providers: [UserService],
  exports: [UserComponent] // Make components available to other modules
})
export class UserModule { }

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule // Import feature module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 28. Templates and Directives

**Template Syntax:**
```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- Interpolation -->
    <h1>{{ title }}</h1>
    <p>{{ getMessage() }}</p>

    <!-- Property binding -->
    <img [src]="imageUrl" [alt]="title">
    <input [value]="name" (input)="onNameChange($event)">

    <!-- Two-way binding -->
    <input [(ngModel)]="name">

    <!-- Structural directives -->
    <div *ngIf="showContent">
      Content is visible
    </div>

    <div *ngIf="user; else loading">
      Welcome, {{ user.name }}!
    </div>
    <ng-template #loading>
      Loading user...
    </ng-template>

    <ul>
      <li *ngFor="let item of items; trackBy: trackByIndex; let i = index">
        {{ i }}. {{ item.name }}
      </li>
    </ul>

    <!-- Attribute directives -->
    <div [ngClass]="{'active': isActive, 'disabled': !enabled}">
      Dynamic classes
    </div>

    <div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">
      Dynamic styles
    </div>
  `
})
export class AppComponent {
  title = 'Angular App';
  imageUrl = 'logo.png';
  name = 'John';
  showContent = true;
  isActive = true;
  enabled = true;
  textColor = 'blue';
  fontSize = 16;

  user: any = null;
  items = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
  ];

  getMessage() {
    return 'Hello from method!';
  }

  onNameChange(event: any) {
    this.name = event.target.value;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
```

**Custom Directives:**
```typescript
// highlight.directive.ts
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight = '';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }
}

// app.component.html
<p appHighlight="yellow">This text is highlighted</p>
<p [appHighlight]="color">Dynamic highlight</p>
```

### 29. Services and Dependency Injection

**Services:**
```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Singleton service
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

// logger.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string) {
    console.error(`[ERROR]: ${message}`);
  }
}
```

**Dependency Injection:**
```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">{{ error }}</div>
    <div *ngIf="users">
      <h1>Users</h1>
      <ul>
        <li *ngFor="let user of users">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  `
})
export class AppComponent implements OnInit {
  users: any[] = [];
  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.logger.log(`Loaded ${users.length} users`);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.logger.error(err.message);
        this.loading = false;
      }
    });
  }
}

// Custom provider
@Injectable()
export class ConfigService {
  apiUrl = 'https://api.example.com';
}

// Providing at component level
@Component({
  selector: 'app-custom',
  providers: [
    { provide: ConfigService, useClass: ConfigService },
    { provide: 'API_URL', useValue: 'https://custom-api.com' }
  ]
})
export class CustomComponent {
  constructor(
    private config: ConfigService,
    @Inject('API_URL') private apiUrl: string
  ) {}
}
```

### 30. Angular CLI

**Angular CLI** provides commands for creating and managing Angular applications.

```bash
# Install Angular CLI
npm install -g @angular/cli

# Create new application
ng new my-angular-app
ng new my-app --routing --style=scss --skip-tests

# Generate components, services, etc.
ng generate component user-list
ng g c user-detail --skip-tests
ng g s user --spec=false
ng g guard auth
ng g interceptor auth
ng g pipe capitalize

# Development server
ng serve
ng serve --port 4201 --open

# Build for production
ng build
ng build --prod --aot

# Run tests
ng test
ng test --watch=false --browsers=ChromeHeadless

# Run e2e tests
ng e2e

# Generate new app/library in workspace
ng generate application admin
ng generate library shared
```

**Angular.json Configuration:**
```json
{
  "projects": {
    "my-app": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "skipTests": true
        }
      },
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/my-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": ["src/scripts.js"]
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "my-app:build:production"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
```

**[⬆️ Back to Top](#javascript-frameworks-interview-questions)**
