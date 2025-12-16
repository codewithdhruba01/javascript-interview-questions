# JavaScript Testing Interview Questions

## Table of Contents

### [Testing Fundamentals](#testing-fundamentals)
1. [Why Testing Matters](#1-why-testing-matters)
2. [Testing Types](#2-testing-types)
3. [Testing Pyramid](#3-testing-pyramid)
4. [Test-Driven Development (TDD)](#4-test-driven-development-tdd)

### [Jest Testing Framework](#jest-testing-framework)
5. [Jest Setup and Configuration](#5-jest-setup-and-configuration)
6. [Writing Basic Tests](#6-writing-basic-tests)
7. [Matchers and Assertions](#7-matchers-and-assertions)
8. [Mocking](#8-mocking)
9. [Async Testing](#9-async-testing)

### [React Testing](#react-testing)
10. [React Testing Library](#10-react-testing-library)
11. [Testing Components](#11-testing-components)
12. [Testing Hooks](#12-testing-hooks)
13. [Testing User Interactions](#13-testing-user-interactions)

### [Testing Best Practices](#testing-best-practices)
14. [Test Organization](#14-test-organization)
15. [Test Coverage](#15-test-coverage)
16. [Continuous Integration](#16-continuous-integration)

---

## Testing Fundamentals

### 1. Why Testing Matters

**Benefits of Testing:**
- **Bug Prevention**: Catch bugs early in development
- **Code Quality**: Forces better code structure and design
- **Refactoring Confidence**: Safe to refactor with tests
- **Documentation**: Tests serve as code examples
- **Regression Prevention**: Prevents old bugs from reappearing

**Real-world Impact:**
```javascript
// Without tests - risky changes
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// With tests - confident refactoring
function calculateTotal(items) {
  if (!Array.isArray(items)) throw new Error('Items must be an array');
  return items.reduce((sum, item) => {
    if (typeof item.price !== 'number') throw new Error('Invalid price');
    return sum + item.price;
  }, 0);
}
```

### 2. Testing Types

| Type | Scope | Speed | Purpose |
|------|-------|-------|---------|
| **Unit Tests** | Single function/class | Fast | Test individual units |
| **Integration Tests** | Multiple units | Medium | Test unit interactions |
| **End-to-End Tests** | Full application | Slow | Test complete workflows |

**Unit Test Example:**
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// math.test.js
import { add } from './math';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
```

**Integration Test Example:**
```javascript
// userService.js
export class UserService {
  constructor(database) {
    this.database = database;
  }

  async createUser(userData) {
    const user = await this.database.save(userData);
    await this.sendWelcomeEmail(user.email);
    return user;
  }
}

// userService.integration.test.js
import { UserService } from './userService';

test('creates user and sends welcome email', async () => {
  const mockDatabase = { save: jest.fn() };
  const mockEmailService = { sendWelcomeEmail: jest.fn() };
  const service = new UserService(mockDatabase, mockEmailService);

  const userData = { name: 'John', email: 'john@example.com' };
  await service.createUser(userData);

  expect(mockDatabase.save).toHaveBeenCalledWith(userData);
  expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(userData.email);
});
```

### 3. Testing Pyramid

```
     /\
    /  \
   / E2E \
  /--------\
 / Integration \
/--------------\
|    Unit      |
|   Tests      |
|              |
---------------
```

**Guidelines:**
- **70% Unit Tests**: Fast, isolated, many tests
- **20% Integration Tests**: Test component interactions
- **10% E2E Tests**: Critical user journeys only

### 4. Test-Driven Development (TDD)

**TDD Cycle:**
1. **Red**: Write failing test
2. **Green**: Make test pass with minimal code
3. **Refactor**: Improve code while keeping tests green

**Example:**
```javascript
// Step 1: Write failing test
test('returns empty string for empty array', () => {
  expect(formatNames([])).toBe('');
});

// Step 2: Make it pass
function formatNames(names) {
  if (names.length === 0) return '';
  // TODO: implement rest
}

// Step 3: Add more tests and implement
test('formats single name', () => {
  expect(formatNames(['John'])).toBe('John');
});

test('formats two names', () => {
  expect(formatNames(['John', 'Jane'])).toBe('John and Jane');
});

function formatNames(names) {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  // Continue...
}
```

---

## Jest Testing Framework

### 5. Jest Setup and Configuration

**Installation:**
```bash
npm install --save-dev jest
```

**Basic Configuration:**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // or 'node'
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
```

**Package.json Scripts:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### 6. Writing Basic Tests

**Test Structure:**
```javascript
// describe blocks group related tests
describe('Calculator', () => {
  // beforeEach runs before each test
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  // Individual test cases
  test('adds two numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(calculator.subtract(5, 3)).toBe(2);
  });

  // Nested describe for organization
  describe('edge cases', () => {
    test('handles zero', () => {
      expect(calculator.add(0, 5)).toBe(5);
    });

    test('handles negative numbers', () => {
      expect(calculator.add(-2, 3)).toBe(1);
    });
  });
});
```

### 7. Matchers and Assertions

**Common Matchers:**
```javascript
// Equality
expect(result).toBe(5);           // Strict equality (===)
expect(result).toEqual({a: 1});   // Deep equality for objects
expect(result).toStrictEqual({a: 1}); // Strict deep equality

// Truthiness
expect(result).toBeTruthy();
expect(result).toBeFalsy();
expect(result).toBeNull();
expect(result).toBeUndefined();
expect(result).toBeDefined();

// Numbers
expect(result).toBeGreaterThan(5);
expect(result).toBeLessThan(10);
expect(result).toBeCloseTo(3.14159, 2); // For floating point

// Strings
expect(message).toMatch(/error/);
expect(message).toContain('Hello');

// Arrays
expect(array).toContain('item');
expect(array).toHaveLength(3);
expect(array).toEqual(expect.arrayContaining(['a', 'b']));

// Objects
expect(object).toHaveProperty('name');
expect(object).toHaveProperty('name', 'John');

// Exceptions
expect(() => riskyFunction()).toThrow();
expect(() => riskyFunction()).toThrow('Error message');
expect(() => riskyFunction()).toThrow(/error/i);
```

### 8. Mocking

**Function Mocking:**
```javascript
// Mock a simple function
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockReturnValueOnce(1).mockReturnValueOnce(2);

expect(mockFn()).toBe(1);
expect(mockFn()).toBe(2);
expect(mockFn()).toBe(42);

// Check if function was called
const sendEmail = jest.fn();
sendEmail('user@example.com', 'Welcome!');

expect(sendEmail).toHaveBeenCalledWith('user@example.com', 'Welcome!');
expect(sendEmail).toHaveBeenCalledTimes(1);

// Mock implementation
const fetchUser = jest.fn().mockImplementation((id) => {
  return Promise.resolve({ id, name: 'John' });
});

// Or use mockResolvedValue for promises
const fetchUser = jest.fn().mockResolvedValue({ id: 1, name: 'John' });
```

**Module Mocking:**
```javascript
// Mock entire module
jest.mock('./api');
const api = require('./api');

// Mock specific methods
api.fetchUser.mockResolvedValue({ id: 1, name: 'John' });

// Mock with factory function
jest.mock('./database', () => ({
  connect: jest.fn(),
  query: jest.fn().mockResolvedValue([{ id: 1 }])
}));

// Mock class
jest.mock('./UserService');
const UserService = require('./UserService');

UserService.mockImplementation(() => ({
  getUser: jest.fn().mockResolvedValue({ name: 'John' })
}));
```

**Timer Mocking:**
```javascript
// Mock timers
jest.useFakeTimers();

test('calls callback after 1 second', () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);

  // Fast-forward time
  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalledTimes(1);
});

// Mock Date
const mockDate = new Date('2023-01-01');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

expect(new Date()).toEqual(mockDate);
```

### 9. Async Testing

**Testing Promises:**
```javascript
// Test resolved promise
test('resolves with user data', () => {
  const userService = new UserService();
  return userService.getUser(1).then(user => {
    expect(user).toEqual({ id: 1, name: 'John' });
  });
});

// Using async/await (preferred)
test('resolves with user data', async () => {
  const userService = new UserService();
  const user = await userService.getUser(1);
  expect(user).toEqual({ id: 1, name: 'John' });
});

// Testing promise rejection
test('rejects with error for invalid id', async () => {
  const userService = new UserService();
  await expect(userService.getUser(-1)).rejects.toThrow('Invalid user ID');
});

// Mock async functions
const apiCall = jest.fn().mockResolvedValue('success');
const failingApiCall = jest.fn().mockRejectedValue(new Error('API Error'));

test('handles successful API call', async () => {
  const result = await apiCall();
  expect(result).toBe('success');
});

test('handles API error', async () => {
  await expect(failingApiCall()).rejects.toThrow('API Error');
});
```

---

## React Testing

### 10. React Testing Library

**Setup:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

**Configuration:**
```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom'
};
```

### 11. Testing Components

**Basic Component Test:**
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByText('Click me');
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick when clicked', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**Testing with Props:**
```javascript
import { render, screen } from '@testing-library/react';
import Card from './Card';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'avatar.jpg'
};

test('renders user card correctly', () => {
  render(<Card user={mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
  expect(screen.getByAltText('John Doe')).toHaveAttribute('src', 'avatar.jpg');
});
```

### 12. Testing Hooks

**Testing Custom Hooks:**
```javascript
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test('should decrement counter', () => {
  const { result } = renderHook(() => useCounter(5));

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(4);
});
```

**Testing useEffect:**
```javascript
import { renderHook } from '@testing-library/react';
import useDataFetcher from './useDataFetcher';

const mockApi = {
  fetchData: jest.fn()
};

jest.mock('./api', () => mockApi);

test('fetches data on mount', () => {
  mockApi.fetchData.mockResolvedValue('data');
  const { result } = renderHook(() => useDataFetcher());

  expect(result.current.loading).toBe(true);
  expect(mockApi.fetchData).toHaveBeenCalledTimes(1);
});
```

### 13. Testing User Interactions

**Form Testing:**
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('submits form with valid data', async () => {
  const user = userEvent.setup();
  const mockSubmit = jest.fn();
  render(<LoginForm onSubmit={mockSubmit} />);

  await user.type(screen.getByLabelText('Email'), 'john@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: 'Login' }));

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123'
    });
  });
});

test('shows validation errors', async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={jest.fn()} />);

  await user.click(screen.getByRole('button', { name: 'Login' }));

  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByText('Password is required')).toBeInTheDocument();
});
```

**Async Operations:**
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import DataList from './DataList';

test('loads and displays data', async () => {
  render(<DataList />);

  // Initial loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  // Loading indicator should be gone
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});
```

---

## Testing Best Practices

### 14. Test Organization

**File Structure:**
```
src/
  components/
    Button/
      Button.js
      Button.test.js
    Form/
      Form.js
      Form.test.js
  hooks/
    useCounter/
      useCounter.js
      useCounter.test.js
  utils/
    formatters/
      formatters.js
      formatters.test.js
```

**Test Naming Conventions:**
```javascript
// Good: Descriptive and follows pattern
test('displays error message when login fails')
test('calculates total price correctly')
test('renders loading spinner during API call')

// Bad: Not descriptive
test('test 1')
test('should work')
test('check function')
```

**Test Grouping:**
```javascript
describe('User Authentication', () => {
  describe('Login Form', () => {
    test('validates email format', () => { /* ... */ });
    test('validates password strength', () => { /* ... */ });
    test('submits form on valid input', () => { /* ... */ });
  });

  describe('API Integration', () => {
    test('sends correct request to login endpoint', () => { /* ... */ });
    test('handles network errors gracefully', () => { /* ... */ });
  });
});
```

### 15. Test Coverage

**Coverage Types:**
- **Statement Coverage**: Every statement executed
- **Branch Coverage**: Every branch (if/else) taken
- **Function Coverage**: Every function called
- **Line Coverage**: Every line executed

**Jest Coverage Configuration:**
```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/serviceWorker.js'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

**Coverage Report Example:**
```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |      100 |     100 |     100 |
 utils.js          |     100 |      100 |     100 |     100 |
  formatDate       |     100 |      100 |     100 |     100 |
  calculateTotal   |     100 |      100 |     100 |     100 |
 components/       |     100 |      100 |     100 |     100 |
  Button.js        |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------
```

### 16. Continuous Integration

**GitHub Actions Example:**
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

**Pre-commit Hooks:**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": [
      "eslint --fix",
      "jest --findRelatedTests"
    ]
  }
}
```

**[⬆️ Back to Top](#javascript-testing-interview-questions)**
