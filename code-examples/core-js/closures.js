/**
 * JavaScript Closures - Interview Examples
 * Closures allow functions to access variables from their outer scope
 */

// Example 1: Basic Closure
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log('Count:', counter.getCount()); // 0
counter.increment();
counter.increment();
console.log('Count after increments:', counter.getCount()); // 2

// Example 2: Module Pattern
const Calculator = (function() {
  let memory = 0; // Private

  function validateNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new Error('Input must be a valid number');
    }
  }

  return {
    add: function(a, b) {
      validateNumber(a);
      validateNumber(b);
      const result = a + b;
      console.log(`${a} + ${b} = ${result}`);
      return result;
    },

    multiply: function(a, b) {
      validateNumber(a);
      validateNumber(b);
      return a * b;
    },

    storeInMemory: function(value) {
      validateNumber(value);
      memory = value;
      console.log(`Stored ${value} in memory`);
    },

    recallMemory: function() {
      console.log(`Recalled ${memory} from memory`);
      return memory;
    },

    clearMemory: function() {
      memory = 0;
      console.log('Memory cleared');
    }
  };
})();

// Usage
Calculator.add(5, 3); // 5 + 3 = 8
Calculator.storeInMemory(42);
Calculator.recallMemory(); // Recalled 42 from memory

// Example 3: Event Handlers with Closures
function createButtonHandler(buttonId) {
  const button = document.getElementById(buttonId);

  if (!button) {
    console.error(`Button with id '${buttonId}' not found`);
    return null;
  }

  let clickCount = 0;

  button.addEventListener('click', function() {
    clickCount++;
    console.log(`Button '${buttonId}' clicked ${clickCount} times`);
    button.textContent = `Clicked ${clickCount} times`;
  });

  return {
    getClickCount: function() {
      return clickCount;
    },
    reset: function() {
      clickCount = 0;
      button.textContent = 'Click me!';
      console.log(`Button '${buttonId}' reset`);
    }
  };
}

// For browser environment - this would work in HTML
// const handler = createButtonHandler('myButton');

// Example 4: Function Factory
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log('Double of 5:', double(5));     // 10
console.log('Triple of 5:', triple(5));     // 15
console.log('Quadruple of 5:', quadruple(5)); // 20

// Example 5: Private Methods with Closures
function createPerson(name, age) {
  // Private variables
  let _name = name;
  let _age = age;

  // Private method
  function _validateAge(newAge) {
    if (newAge < 0 || newAge > 150) {
      throw new Error('Invalid age');
    }
  }

  // Public interface
  return {
    getName: function() {
      return _name;
    },

    setName: function(newName) {
      if (typeof newName !== 'string' || newName.trim() === '') {
        throw new Error('Name must be a non-empty string');
      }
      _name = newName.trim();
    },

    getAge: function() {
      return _age;
    },

    setAge: function(newAge) {
      _validateAge(newAge); // Using private method
      _age = newAge;
    },

    celebrateBirthday: function() {
      _age++;
      console.log(`Happy birthday! ${_name} is now ${_age} years old!`);
      return _age;
    },

    toString: function() {
      return `${_name} (${_age} years old)`;
    }
  };
}

const person = createPerson('John Doe', 30);
console.log(person.toString()); // John Doe (30 years old)
person.celebrateBirthday();     // Happy birthday! John Doe is now 31 years old!
person.setName('Jane Doe');
console.log(person.toString()); // Jane Doe (31 years old)

// Example 6: Common Closure Gotchas
console.log('\n--- Closure Gotchas ---');

// Gotcha 1: Loop with var (creates closure over the same variable)
function createButtonsWithVar() {
  const buttons = [];

  for (var i = 0; i < 3; i++) {
    buttons.push({
      id: i,
      onClick: function() {
        console.log('Button', i, 'clicked'); // Always logs 3!
      }
    });
  }

  return buttons;
}

// Gotcha 2: Fixed with let (block scope)
function createButtonsWithLet() {
  const buttons = [];

  for (let i = 0; i < 3; i++) {
    buttons.push({
      id: i,
      onClick: function() {
        console.log('Button', i, 'clicked'); // Correctly logs 0, 1, 2
      }
    });
  }

  return buttons;
}

// Gotcha 3: Fixed with IIFE
function createButtonsWithIIFE() {
  const buttons = [];

  for (var i = 0; i < 3; i++) {
    (function(index) {
      buttons.push({
        id: index,
        onClick: function() {
          console.log('Button', index, 'clicked'); // Correctly logs 0, 1, 2
        }
      });
    })(i);
  }

  return buttons;
}

// Demo
const buttonsVar = createButtonsWithVar();
const buttonsLet = createButtonsWithLet();
const buttonsIIFE = createButtonsWithIIFE();

console.log('Testing var loop:');
buttonsVar[0].onClick(); // Button 3 clicked (wrong!)
buttonsVar[1].onClick(); // Button 3 clicked (wrong!)

console.log('Testing let loop:');
buttonsLet[0].onClick(); // Button 0 clicked (correct!)
buttonsLet[1].onClick(); // Button 1 clicked (correct!)

console.log('Testing IIFE loop:');
buttonsIIFE[0].onClick(); // Button 0 clicked (correct!)
buttonsIIFE[1].onClick(); // Button 1 clicked (correct!)

console.log('\n--- Memory Considerations ---');
// Closures can cause memory leaks if not careful
function createLeakyClosure() {
  const largeData = new Array(1000000).fill('data'); // 1M elements

  return function() {
    console.log('Closure still holds', largeData.length, 'items');
    return largeData.length;
  };
}

// The largeData array will stay in memory as long as the returned function exists
const leakyFunction = createLeakyClosure();
leakyFunction(); // Still holds data

// To free memory, remove references
// delete leakyFunction; // Would allow garbage collection
