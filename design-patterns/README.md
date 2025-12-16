# JavaScript Design Patterns Interview Questions

## Table of Contents

### [Creational Patterns](#creational-patterns)
1. [Singleton Pattern](#1-singleton-pattern)
2. [Factory Pattern](#2-factory-pattern)
3. [Constructor Pattern](#3-constructor-pattern)
4. [Prototype Pattern](#4-prototype-pattern)
5. [Module Pattern](#5-module-pattern)

### [Structural Patterns](#structural-patterns)
6. [Adapter Pattern](#6-adapter-pattern)
7. [Decorator Pattern](#7-decorator-pattern)
8. [Facade Pattern](#8-facade-pattern)
9. [Composite Pattern](#9-composite-pattern)
10. [Proxy Pattern](#10-proxy-pattern)

### [Behavioral Patterns](#behavioral-patterns)
11. [Observer Pattern](#11-observer-pattern)
12. [Strategy Pattern](#12-strategy-pattern)
13. [Command Pattern](#13-command-pattern)
14. [Iterator Pattern](#14-iterator-pattern)
15. [State Pattern](#15-state-pattern)
16. [Chain of Responsibility](#16-chain-of-responsibility)

### [Modern JavaScript Patterns](#modern-javascript-patterns)
17. [Revealing Module Pattern](#17-revealing-module-pattern)
18. [Mixin Pattern](#18-mixin-pattern)
19. [Dependency Injection](#19-dependency-injection)
20. [Publisher-Subscriber Pattern](#20-publisher-subscriber-pattern)

---

## Creational Patterns

### 1. Singleton Pattern

**Purpose**: Ensure only one instance of a class exists and provide global access to it.

```javascript
// Basic Singleton
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.data = {};
    Database.instance = this;
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key];
  }
}

// ES6 Singleton with static instance
class Singleton {
  static instance = null;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = 'Singleton data';
    Singleton.instance = this;
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// Usage
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - same instance

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true
```

**Real-world Example:**
```javascript
class Logger {
  static instance = null;

  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    this.logs = [];
    Logger.instance = this;
  }

  log(message) {
    this.logs.push(`${new Date().toISOString()}: ${message}`);
    console.log(message);
  }

  getLogs() {
    return this.logs;
  }
}

const logger1 = new Logger();
const logger2 = new Logger();
logger1.log('First message');
logger2.log('Second message');
console.log(logger1.getLogs()); // Both messages in same array
```

### 2. Factory Pattern

**Purpose**: Create objects without specifying the exact class of object that will be created.

```javascript
// Simple Factory
class CarFactory {
  createCar(type) {
    switch (type) {
      case 'sedan':
        return new Sedan();
      case 'suv':
        return new SUV();
      case 'sports':
        return new SportsCar();
      default:
        throw new Error('Unknown car type');
    }
  }
}

class Sedan {
  drive() { return 'Driving a sedan'; }
}

class SUV {
  drive() { return 'Driving an SUV'; }
}

class SportsCar {
  drive() { return 'Driving a sports car'; }
}

// Usage
const factory = new CarFactory();
const sedan = factory.createCar('sedan');
const suv = factory.createCar('suv');
console.log(sedan.drive()); // 'Driving a sedan'
```

**Abstract Factory:**
```javascript
class UIFactory {
  createButton() { throw new Error('Must implement createButton'); }
  createCheckbox() { throw new Error('Must implement createCheckbox'); }
}

class WindowsFactory extends UIFactory {
  createButton() { return new WindowsButton(); }
  createCheckbox() { return new WindowsCheckbox(); }
}

class MacFactory extends UIFactory {
  createButton() { return new MacButton(); }
  createCheckbox() { return new MacCheckbox(); }
}

class WindowsButton {
  render() { return '<button>Windows Button</button>'; }
}

class MacButton {
  render() { return '<button>Mac Button</button>'; }
}

// Usage
function createUI(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  return { button, checkbox };
}

const windowsUI = createUI(new WindowsFactory());
const macUI = createUI(new MacFactory());
```

### 3. Constructor Pattern

**Purpose**: Create objects using constructor functions, similar to classes.

```javascript
// Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

Person.prototype.haveBirthday = function() {
  this.age++;
  return `Happy birthday! I'm now ${this.age}`;
};

// Usage
const john = new Person('John', 30);
console.log(john.greet()); // 'Hello, I'm John'
john.haveBirthday();
console.log(john.age); // 31
```

**Constructor with Private Members:**
```javascript
function BankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  this.deposit = function(amount) {
    balance += amount;
    return balance;
  };

  this.withdraw = function(amount) {
    if (amount > balance) {
      throw new Error('Insufficient funds');
    }
    balance -= amount;
    return balance;
  };

  this.getBalance = function() {
    return balance;
  };
}

// Usage
const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300
console.log(account.balance); // undefined (private)
```

### 4. Prototype Pattern

**Purpose**: Create objects based on a template object through cloning.

```javascript
// Prototype pattern
const carPrototype = {
  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    return this;
  },

  drive() {
    return `Driving ${this.year} ${this.make} ${this.model}`;
  },

  clone() {
    return Object.create(this);
  }
};

// Usage
const car1 = Object.create(carPrototype).init('Toyota', 'Camry', 2020);
const car2 = car1.clone().init('Honda', 'Civic', 2021);

console.log(car1.drive()); // 'Driving 2020 Toyota Camry'
console.log(car2.drive()); // 'Driving 2021 Honda Civic'
console.log(car1.clone === car2.clone); // true - same method reference
```

**ES6 Class with Prototype:**
```javascript
class Shape {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

// Usage
const circle1 = new Circle(5);
circle1.move(10, 20);
const circle2 = circle1.clone();
circle2.radius = 10;

console.log(circle1.area()); // ~78.5
console.log(circle2.area()); // ~314.16
```

### 5. Module Pattern

**Purpose**: Encapsulate code into self-contained modules with private and public members.

```javascript
// IIFE Module Pattern
const Calculator = (function() {
  // Private variables and functions
  let memory = 0;

  function validateNumber(num) {
    if (typeof num !== 'number') {
      throw new Error('Argument must be a number');
    }
  }

  // Public API
  return {
    add(a, b) {
      validateNumber(a);
      validateNumber(b);
      return a + b;
    },

    subtract(a, b) {
      validateNumber(a);
      validateNumber(b);
      return a - b;
    },

    getMemory() {
      return memory;
    },

    setMemory(value) {
      validateNumber(value);
      memory = value;
    }
  };
})();

// Usage
console.log(Calculator.add(5, 3)); // 8
Calculator.setMemory(42);
console.log(Calculator.getMemory()); // 42
console.log(Calculator.memory); // undefined (private)
```

**ES6 Module Pattern:**
```javascript
// mathUtils.js
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

export { add, multiply, PI };

// calculator.js
import { add, multiply } from './mathUtils.js';

export class Calculator {
  static sum(numbers) {
    return numbers.reduce(add, 0);
  }

  static product(numbers) {
    return numbers.reduce(multiply, 1);
  }
}

// Usage
import { Calculator } from './calculator.js';
console.log(Calculator.sum([1, 2, 3, 4])); // 10
```

---

## Structural Patterns

### 6. Adapter Pattern

**Purpose**: Allow incompatible interfaces to work together.

```javascript
// Old API
class OldAPI {
  getUserData() {
    return {
      fullName: 'John Doe',
      birthDate: '1990-01-01'
    };
  }
}

// New API expects different format
class NewAPI {
  fetchUser() {
    return {
      name: 'Jane Smith',
      age: 25
    };
  }
}

// Adapter to make OldAPI compatible with new interface
class APIAdapter {
  constructor(api) {
    this.api = api;
  }

  fetchUser() {
    const data = this.api.getUserData();
    // Transform old format to new format
    return {
      name: data.fullName,
      age: new Date().getFullYear() - new Date(data.birthDate).getFullYear()
    };
  }
}

// Usage
const oldAPI = new OldAPI();
const adapter = new APIAdapter(oldAPI);

function processUser(api) {
  const user = api.fetchUser();
  console.log(`User: ${user.name}, Age: ${user.age}`);
}

processUser(new NewAPI()); // Works with new API
processUser(adapter);      // Works with old API through adapter
```

### 7. Decorator Pattern

**Purpose**: Add behavior to objects dynamically without affecting other objects.

```javascript
// Base component
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return 'Coffee';
  }
}

// Decorator base class
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 1.5;
  }

  description() {
    return super.description() + ', Milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 0.5;
  }

  description() {
    return super.description() + ', Sugar';
  }
}

class WhippedCreamDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 2;
  }

  description() {
    return super.description() + ', Whipped Cream';
  }
}

// Usage
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhippedCreamDecorator(coffee);

console.log(coffee.description()); // 'Coffee, Milk, Sugar, Whipped Cream'
console.log(coffee.cost()); // 8.5
```

**Function Decorator:**
```javascript
function logger(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with args:`, args);
    const result = fn.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
}

function timing(fn) {
  return function(...args) {
    const start = Date.now();
    const result = fn.apply(this, args);
    const end = Date.now();
    console.log(`${fn.name} took ${end - start}ms`);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = logger(timing(add));
loggedAdd(5, 3);
// Output:
// Calling add with args: [5, 3]
// add took 0ms
// Result: 8
```

### 8. Facade Pattern

**Purpose**: Provide a simplified interface to a complex subsystem.

```javascript
// Complex subsystems
class CPU {
  freeze() { console.log('CPU: Freezing'); }
  jump(position) { console.log(`CPU: Jumping to ${position}`); }
  execute() { console.log('CPU: Executing'); }
}

class Memory {
  load(position, data) { console.log(`Memory: Loading ${data} at ${position}`); }
}

class HardDrive {
  read(lba, size) { console.log(`HDD: Reading ${size} bytes from ${lba}`); }
}

// Facade - simplifies computer startup
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    this.cpu.freeze();
    this.memory.load('BOOT_ADDRESS', this.hardDrive.read('BOOT_SECTOR', 'SECTOR_SIZE'));
    this.cpu.jump('BOOT_ADDRESS');
    this.cpu.execute();
    console.log('Computer started successfully!');
  }
}

// Usage
const computer = new ComputerFacade();
computer.start();
// Instead of manually calling cpu.freeze(), memory.load(), etc.
```

### 9. Composite Pattern

**Purpose**: Compose objects into tree structures to represent part-whole hierarchies.

```javascript
// Component interface
class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }

  add(component) {
    throw new Error('Cannot add to a file');
  }

  remove(component) {
    throw new Error('Cannot remove from a file');
  }

  getSize() {
    throw new Error('Must implement getSize');
  }

  display(depth = 0) {
    throw new Error('Must implement display');
  }
}

// Leaf - File
class File extends FileSystemComponent {
  constructor(name, size) {
    super(name);
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  display(depth = 0) {
    console.log(`${'  '.repeat(depth)}📄 ${this.name} (${this.size}KB)`);
  }
}

// Composite - Directory
class Directory extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getSize() {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }

  display(depth = 0) {
    console.log(`${'  '.repeat(depth)}📁 ${this.name}/`);
    this.children.forEach(child => child.display(depth + 1));
  }
}

// Usage
const root = new Directory('root');
const documents = new Directory('documents');
const pictures = new Directory('pictures');

root.add(documents);
root.add(pictures);
root.add(new File('readme.txt', 10));

documents.add(new File('resume.pdf', 500));
documents.add(new File('letter.docx', 200));

pictures.add(new File('vacation.jpg', 2048));
pictures.add(new File('family.png', 1024));

root.display();
// Output:
// 📁 root/
//   📁 documents/
//     📄 resume.pdf (500KB)
//     📄 letter.docx (200KB)
//   📁 pictures/
//     📄 vacation.jpg (2048KB)
//     📄 family.png (1024KB)
//   📄 readme.txt (10KB)

console.log(`Total size: ${root.getSize()}KB`); // 4282KB
```

### 10. Proxy Pattern

**Purpose**: Provide a surrogate or placeholder for another object to control access to it.

```javascript
// Subject interface
class Internet {
  connectTo(url) {
    console.log(`Connecting to ${url}`);
  }
}

// Real subject
class RealInternet extends Internet {
  connectTo(url) {
    console.log(`Real connection to ${url}`);
  }
}

// Proxy
class InternetProxy extends Internet {
  constructor() {
    super();
    this.realInternet = new RealInternet();
    this.bannedSites = ['badsite.com', 'blocked.com'];
  }

  connectTo(url) {
    if (this.bannedSites.includes(url)) {
      throw new Error(`Access denied to ${url}`);
    }
    this.realInternet.connectTo(url);
  }
}

// Usage
const internet = new InternetProxy();
internet.connectTo('google.com');     // Works
internet.connectTo('badsite.com');     // Throws error
```

**Caching Proxy:**
```javascript
class Calculator {
  factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * this.factorial(n - 1);
  }
}

class CalculatorProxy {
  constructor() {
    this.calculator = new Calculator();
    this.cache = new Map();
  }

  factorial(n) {
    if (this.cache.has(n)) {
      console.log(`Returning cached result for ${n}`);
      return this.cache.get(n);
    }

    const result = this.calculator.factorial(n);
    this.cache.set(n, result);
    return result;
  }
}

// Usage
const calc = new CalculatorProxy();
console.log(calc.factorial(5)); // Calculated
console.log(calc.factorial(5)); // Cached
```

---

## Behavioral Patterns

### 11. Observer Pattern

**Purpose**: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received: ${data}`);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello Observers!');
// Output:
// Observer 1 received: Hello Observers!
// Observer 2 received: Hello Observers!

subject.unsubscribe(observer1);
subject.notify('Observer 1 unsubscribed');
// Output:
// Observer 2 received: Observer 1 unsubscribed
```

### 12. Strategy Pattern

**Purpose**: Define a family of algorithms, encapsulate each one, and make them interchangeable.

```javascript
// Strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error('Must implement pay method');
  }
}

// Concrete strategies
class CreditCardPayment extends PaymentStrategy {
  constructor(cardNumber, expiryDate) {
    super();
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
  }

  pay(amount) {
    console.log(`Paid $${amount} with credit card ${this.cardNumber}`);
  }
}

class PayPalPayment extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }

  pay(amount) {
    console.log(`Paid $${amount} via PayPal account ${this.email}`);
  }
}

class BankTransferPayment extends PaymentStrategy {
  constructor(accountNumber) {
    super();
    this.accountNumber = accountNumber;
  }

  pay(amount) {
    console.log(`Transferred $${amount} to account ${this.accountNumber}`);
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }

  addItem(item) {
    this.items.push(item);
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }

  checkout() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    if (this.paymentStrategy) {
      this.paymentStrategy.pay(total);
    } else {
      console.log('Please select a payment method');
    }
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Book', price: 20 });
cart.addItem({ name: 'Pen', price: 5 });

cart.setPaymentStrategy(new CreditCardPayment('1234-5678-9012-3456', '12/25'));
cart.checkout(); // Paid $25 with credit card 1234-5678-9012-3456

cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
cart.checkout(); // Paid $25 via PayPal account user@example.com
```

### 13. Command Pattern

**Purpose**: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

```javascript
// Command interface
class Command {
  execute() {
    throw new Error('Must implement execute');
  }

  undo() {
    throw new Error('Must implement undo');
  }
}

// Concrete commands
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.on();
  }

  undo() {
    this.light.off();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.off();
  }

  undo() {
    this.light.on();
  }
}

// Receiver
class Light {
  on() {
    console.log('Light is ON');
  }

  off() {
    console.log('Light is OFF');
  }
}

// Invoker
class RemoteControl {
  constructor() {
    this.history = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command.undo();
    }
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();

const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);

remote.executeCommand(lightOn);   // Light is ON
remote.executeCommand(lightOff);  // Light is OFF
remote.undo();                    // Light is ON (undo last command)
```

### 14. Iterator Pattern

**Purpose**: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

```javascript
// Iterator interface
class Iterator {
  hasNext() {
    throw new Error('Must implement hasNext');
  }

  next() {
    throw new Error('Must implement next');
  }
}

// Concrete iterator
class ArrayIterator extends Iterator {
  constructor(array) {
    super();
    this.array = array;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.array.length;
  }

  next() {
    if (this.hasNext()) {
      return this.array[this.index++];
    }
    throw new Error('No more elements');
  }
}

// Aggregate
class IterableCollection {
  constructor(items) {
    this.items = items;
  }

  createIterator() {
    return new ArrayIterator(this.items);
  }

  // ES6 Iterator protocol
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;

    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { done: true };
      }
    };
  }
}

// Usage
const collection = new IterableCollection([1, 2, 3, 4, 5]);

// Using custom iterator
const iterator = collection.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}

// Using ES6 for...of
for (const item of collection) {
  console.log(item);
}
```

### 15. State Pattern

**Purpose**: Allow an object to alter its behavior when its internal state changes.

```javascript
// State interface
class State {
  insertCoin(vendingMachine) {
    throw new Error('Must implement insertCoin');
  }

  ejectCoin(vendingMachine) {
    throw new Error('Must implement ejectCoin');
  }

  selectProduct(vendingMachine) {
    throw new Error('Must implement selectProduct');
  }

  dispense(vendingMachine) {
    throw new Error('Must implement dispense');
  }
}

// Concrete states
class NoCoinState extends State {
  insertCoin(vendingMachine) {
    console.log('Coin inserted');
    vendingMachine.setState(vendingMachine.hasCoinState);
  }

  ejectCoin(vendingMachine) {
    console.log('No coin to eject');
  }

  selectProduct(vendingMachine) {
    console.log('Please insert coin first');
  }

  dispense(vendingMachine) {
    console.log('Please insert coin first');
  }
}

class HasCoinState extends State {
  insertCoin(vendingMachine) {
    console.log('Already have coin');
  }

  ejectCoin(vendingMachine) {
    console.log('Coin ejected');
    vendingMachine.setState(vendingMachine.noCoinState);
  }

  selectProduct(vendingMachine) {
    console.log('Product selected');
    vendingMachine.setState(vendingMachine.soldState);
  }

  dispense(vendingMachine) {
    console.log('Select product first');
  }
}

class SoldState extends State {
  insertCoin(vendingMachine) {
    console.log('Please wait, dispensing product');
  }

  ejectCoin(vendingMachine) {
    console.log('Too late, already dispensing');
  }

  selectProduct(vendingMachine) {
    console.log('Already selected');
  }

  dispense(vendingMachine) {
    console.log('Product dispensed');
    vendingMachine.setState(vendingMachine.noCoinState);
  }
}

// Context
class VendingMachine {
  constructor() {
    this.noCoinState = new NoCoinState();
    this.hasCoinState = new HasCoinState();
    this.soldState = new SoldState();
    this.currentState = this.noCoinState;
  }

  setState(state) {
    this.currentState = state;
  }

  insertCoin() {
    this.currentState.insertCoin(this);
  }

  ejectCoin() {
    this.currentState.ejectCoin(this);
  }

  selectProduct() {
    this.currentState.selectProduct(this);
  }

  dispense() {
    this.currentState.dispense(this);
  }
}

// Usage
const machine = new VendingMachine();
machine.selectProduct();     // Please insert coin first
machine.insertCoin();        // Coin inserted
machine.selectProduct();     // Product selected
machine.dispense();         // Product dispensed
```

### 16. Chain of Responsibility

**Purpose**: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.

```javascript
// Handler interface
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler; // For method chaining
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Concrete handlers
class LowLevelSupport extends Handler {
  handle(request) {
    if (request.level === 'low') {
      return `Low level support handled: ${request.message}`;
    }
    return super.handle(request);
  }
}

class MediumLevelSupport extends Handler {
  handle(request) {
    if (request.level === 'medium') {
      return `Medium level support handled: ${request.message}`;
    }
    return super.handle(request);
  }
}

class HighLevelSupport extends Handler {
  handle(request) {
    if (request.level === 'high') {
      return `High level support handled: ${request.message}`;
    }
    return super.handle(request);
  }
}

class Manager extends Handler {
  handle(request) {
    if (request.level === 'manager') {
      return `Manager handled: ${request.message}`;
    }
    return super.handle(request);
  }
}

// Usage
const low = new LowLevelSupport();
const medium = new MediumLevelSupport();
const high = new HighLevelSupport();
const manager = new Manager();

// Chain the handlers
low.setNext(medium).setNext(high).setNext(manager);

const requests = [
  { level: 'low', message: 'Password reset' },
  { level: 'medium', message: 'Bug report' },
  { level: 'high', message: 'System crash' },
  { level: 'manager', message: 'Budget increase' },
  { level: 'unknown', message: 'Alien invasion' }
];

requests.forEach(request => {
  const result = low.handle(request);
  console.log(result || `No handler found for: ${request.message}`);
});
```

---

## Modern JavaScript Patterns

### 17. Revealing Module Pattern

**Purpose**: Improve on the module pattern by explicitly revealing only the properties and methods we want to be publicly available.

```javascript
const Calculator = (function() {
  // Private variables and functions
  let memory = 0;
  let history = [];

  function validateNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new Error('Argument must be a valid number');
    }
  }

  function logOperation(operation, result) {
    history.push({ operation, result, timestamp: new Date() });
  }

  function add(a, b) {
    validateNumber(a);
    validateNumber(b);
    const result = a + b;
    logOperation(`${a} + ${b}`, result);
    return result;
  }

  function subtract(a, b) {
    validateNumber(a);
    validateNumber(b);
    const result = a - b;
    logOperation(`${a} - ${b}`, result);
    return result;
  }

  function multiply(a, b) {
    validateNumber(a);
    validateNumber(b);
    const result = a * b;
    logOperation(`${a} × ${b}`, result);
    return result;
  }

  function divide(a, b) {
    validateNumber(a);
    validateNumber(b);
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    const result = a / b;
    logOperation(`${a} ÷ ${b}`, result);
    return result;
  }

  function getMemory() {
    return memory;
  }

  function setMemory(value) {
    validateNumber(value);
    memory = value;
  }

  function clearMemory() {
    memory = 0;
  }

  function getHistory() {
    return [...history];
  }

  function clearHistory() {
    history = [];
  }

  // Reveal only the public API
  return {
    add,
    subtract,
    multiply,
    divide,
    getMemory,
    setMemory,
    clearMemory,
    getHistory,
    clearHistory
  };
})();

// Usage
console.log(Calculator.add(5, 3));        // 8
console.log(Calculator.multiply(4, 2));   // 8
Calculator.setMemory(42);
console.log(Calculator.getMemory());      // 42
console.log(Calculator.getHistory());     // Array of operations
```

### 18. Mixin Pattern

**Purpose**: Add properties and methods to objects without using inheritance.

```javascript
// Mixin functions
const flyMixin = {
  fly() {
    console.log(`${this.name} is flying!`);
  }
};

const swimMixin = {
  swim() {
    console.log(`${this.name} is swimming!`);
  }
};

const walkMixin = {
  walk() {
    console.log(`${this.name} is walking!`);
  }
};

// Base class
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating.`);
  }
}

// Applying mixins
class Bird extends Animal {
  constructor(name) {
    super(name);
  }

  // Mix in fly capability
  fly = flyMixin.fly;
}

class Fish extends Animal {
  constructor(name) {
    super(name);
  }

  // Mix in swim capability
  swim = swimMixin.swim;
}

class Duck extends Animal {
  constructor(name) {
    super(name);
  }
}

// Mix in multiple capabilities
Object.assign(Duck.prototype, flyMixin, swimMixin, walkMixin);

// Usage
const bird = new Bird('Tweety');
const fish = new Fish('Nemo');
const duck = new Duck('Donald');

bird.fly();     // Tweety is flying!
fish.swim();    // Nemo is swimming!
duck.fly();     // Donald is flying!
duck.swim();    // Donald is swimming!
duck.walk();    // Donald is walking!
```

### 19. Dependency Injection

**Purpose**: Pass dependencies to objects rather than having objects create them internally.

```javascript
// Service interfaces
class DatabaseInterface {
  save(data) { throw new Error('Must implement save'); }
  find(id) { throw new Error('Must implement find'); }
}

class EmailServiceInterface {
  send(to, subject, body) { throw new Error('Must implement send'); }
}

// Concrete implementations
class MongoDatabase extends DatabaseInterface {
  save(data) {
    console.log(`Saving to MongoDB:`, data);
    return { id: Date.now(), ...data };
  }

  find(id) {
    console.log(`Finding in MongoDB: ${id}`);
    return { id, name: 'Mock User' };
  }
}

class SendGridEmailService extends EmailServiceInterface {
  send(to, subject, body) {
    console.log(`Sending email via SendGrid to ${to}: ${subject}`);
  }
}

// High-level module with dependency injection
class UserService {
  constructor(database, emailService) {
    this.database = database;
    this.emailService = emailService;
  }

  createUser(userData) {
    const user = this.database.save(userData);
    this.emailService.send(
      userData.email,
      'Welcome!',
      `Welcome ${userData.name}!`
    );
    return user;
  }

  getUser(id) {
    return this.database.find(id);
  }
}

// Dependency injection container
class DIContainer {
  constructor() {
    this.services = new Map();
  }

  register(name, factory) {
    this.services.set(name, factory);
  }

  get(name) {
    const factory = this.services.get(name);
    return factory(this);
  }
}

// Usage
const container = new DIContainer();

// Register services
container.register('database', () => new MongoDatabase());
container.register('emailService', () => new SendGridEmailService());
container.register('userService', (c) => new UserService(
  c.get('database'),
  c.get('emailService')
));

// Resolve and use service
const userService = container.get('userService');
const user = userService.createUser({
  name: 'John Doe',
  email: 'john@example.com'
});
```

### 20. Publisher-Subscriber Pattern

**Purpose**: Loose coupling between objects that communicate through events.

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event ${event}:`, error);
      }
    });
  }

  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
}

// Usage example: News system
class NewsPublisher extends EventEmitter {
  publishNews(headline, content) {
    console.log(`Publishing: ${headline}`);
    this.emit('news', { headline, content, timestamp: new Date() });
  }
}

class NewsSubscriber {
  constructor(name) {
    this.name = name;
  }

  receiveNews(news) {
    console.log(`${this.name} received news: ${news.headline}`);
  }
}

// Create publisher and subscribers
const publisher = new NewsPublisher();
const subscriber1 = new NewsSubscriber('John');
const subscriber2 = new NewsSubscriber('Jane');
const subscriber3 = new NewsSubscriber('Bob');

// Subscribe to news events
publisher.on('news', subscriber1.receiveNews.bind(subscriber1));
publisher.on('news', subscriber2.receiveNews.bind(subscriber2));

// One-time subscription
publisher.once('news', subscriber3.receiveNews.bind(subscriber3));

// Publish news
publisher.publishNews('Breaking News!', 'Something happened...');
publisher.publishNews('Weather Update', 'Sunny today!');

// Unsubscribe
publisher.off('news', subscriber1.receiveNews.bind(subscriber1));
publisher.publishNews('Sports News', 'Team won!'); // Only Jane gets this
```

**[⬆️ Back to Top](#javascript-design-patterns-interview-questions)**
