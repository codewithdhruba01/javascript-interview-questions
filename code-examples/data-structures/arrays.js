/**
 * JavaScript Array Methods - Interview Examples
 * Comprehensive guide to array manipulation methods
 */

// Sample data for examples
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const users = [
    { id: 1, name: 'John', age: 30, active: true },
    { id: 2, name: 'Jane', age: 25, active: false },
    { id: 3, name: 'Bob', age: 35, active: true },
    { id: 4, name: 'Alice', age: 28, active: true }
];

console.log('JavaScript Array Methods - Interview Examples\n');

// 1. forEach - Execute function for each element
console.log('1. forEach Examples:');
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

users.forEach(user => {
    console.log(`${user.name} is ${user.age} years old`);
});

// 2. map - Transform each element
console.log('\n2. Map Examples:');
const doubled = numbers.map(num => num * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);

const userNames = users.map(user => user.name.toUpperCase());
console.log('User names uppercase:', userNames);

// 3. filter - Filter elements based on condition
console.log('\n3. Filter Examples:');
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evenNumbers);

const activeUsers = users.filter(user => user.active);
console.log('Active users:', activeUsers.map(u => u.name));

const longWords = words.filter(word => word.length > 5);
console.log('Words longer than 5 chars:', longWords);

// 4. find - Find first element matching condition
console.log('\n4. Find Examples:');
const firstEven = numbers.find(num => num % 2 === 0);
console.log('First even number:', firstEven);

const userNamedJane = users.find(user => user.name === 'Jane');
console.log('User named Jane:', userNamedJane);

// 5. findIndex - Find index of first element matching condition
console.log('\n5. FindIndex Examples:');
const firstEvenIndex = numbers.findIndex(num => num % 2 === 0);
console.log('Index of first even number:', firstEvenIndex);

const bobIndex = users.findIndex(user => user.name === 'Bob');
console.log('Index of Bob:', bobIndex);

// 6. some - Check if at least one element matches condition
console.log('\n6. Some Examples:');
const hasEven = numbers.some(num => num % 2 === 0);
console.log('Has even numbers:', hasEven);

const hasInactiveUsers = users.some(user => !user.active);
console.log('Has inactive users:', hasInactiveUsers);

// 7. every - Check if all elements match condition
console.log('\n7. Every Examples:');
const allEven = numbers.every(num => num % 2 === 0);
console.log('All numbers even:', allEven);

const allActive = users.every(user => user.active);
console.log('All users active:', allActive);

// 8. reduce - Reduce array to single value
console.log('\n8. Reduce Examples:');
const sum = numbers.reduce((total, num) => total + num, 0);
console.log('Sum of numbers:', sum);

const totalAge = users.reduce((total, user) => total + user.age, 0);
console.log('Total age of users:', totalAge);

const averageAge = totalAge / users.length;
console.log('Average age:', averageAge.toFixed(1));

// Group by age range
const ageGroups = users.reduce((groups, user) => {
    const range = user.age < 30 ? 'under30' : 'over30';
    groups[range] = groups[range] || [];
    groups[range].push(user.name);
    return groups;
}, {});
console.log('Users by age group:', ageGroups);

// 9. reduceRight - Same as reduce but from right to left
console.log('\n9. ReduceRight Example:');
const wordsArray = ['Hello', 'world', 'this', 'is', 'JavaScript'];
const sentence = wordsArray.reduceRight((acc, word) => acc + ' ' + word);
console.log('Reversed sentence:', sentence.trim());

// 10. sort - Sort array elements
console.log('\n10. Sort Examples:');
const sortedNumbers = [...numbers].sort((a, b) => a - b);
console.log('Sorted numbers (asc):', sortedNumbers);

const sortedNumbersDesc = [...numbers].sort((a, b) => b - a);
console.log('Sorted numbers (desc):', sortedNumbersDesc);

const sortedUsersByAge = [...users].sort((a, b) => a.age - b.age);
console.log('Users sorted by age:', sortedUsersByAge.map(u => `${u.name}(${u.age})`));

const sortedWords = [...words].sort();
console.log('Sorted words:', sortedWords);

// 11. slice - Extract portion of array
console.log('\n11. Slice Examples:');
const firstThree = numbers.slice(0, 3);
console.log('First 3 numbers:', firstThree);

const middle = numbers.slice(3, 7);
console.log('Middle numbers (index 3-6):', middle);

const lastThree = numbers.slice(-3);
console.log('Last 3 numbers:', lastThree);

// 12. splice - Add/remove elements at specific position
console.log('\n12. Splice Examples:');
const spliceArray = [1, 2, 3, 4, 5];
console.log('Original array:', spliceArray);

// Remove 2 elements starting from index 1
const removed = spliceArray.splice(1, 2);
console.log('After splice(1, 2):', spliceArray);
console.log('Removed elements:', removed);

// Add elements at index 1
spliceArray.splice(1, 0, 'a', 'b');
console.log('After splice(1, 0, "a", "b"):', spliceArray);

// Replace elements
spliceArray.splice(2, 2, 'x', 'y');
console.log('After splice(2, 2, "x", "y"):', spliceArray);

// 13. concat - Merge arrays
console.log('\n13. Concat Examples:');
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];

const merged = array1.concat(array2, array3);
console.log('Concatenated arrays:', merged);

// 14. join - Join array elements into string
console.log('\n14. Join Examples:');
const joined = words.join(', ');
console.log('Joined with comma:', joined);

const pathString = ['home', 'user', 'documents'].join('/');
console.log('File path:', pathString);

// 15. indexOf - Find index of element
console.log('\n15. IndexOf Examples:');
const indexOf5 = numbers.indexOf(5);
console.log('Index of 5:', indexOf5);

const indexOf99 = numbers.indexOf(99);
console.log('Index of 99 (not found):', indexOf99);

// 16. lastIndexOf - Find last index of element
console.log('\n16. LastIndexOf Example:');
const repeated = [1, 2, 3, 2, 1];
console.log('Array with duplicates:', repeated);
console.log('Last index of 2:', repeated.lastIndexOf(2));

// 17. includes - Check if array contains element
console.log('\n17. Includes Examples:');
console.log('Numbers include 5:', numbers.includes(5));
console.log('Numbers include 99:', numbers.includes(99));

// 18. Array.from - Create array from iterable
console.log('\n18. Array.from Examples:');
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log('Range 1-5:', range);

const stringToArray = Array.from('hello');
console.log('String to array:', stringToArray);

// 19. Array.isArray - Check if value is array
console.log('\n19. Array.isArray Examples:');
console.log('Is numbers an array:', Array.isArray(numbers));
console.log('Is "hello" an array:', Array.isArray('hello'));
console.log('Is {} an array:', Array.isArray({}));

// 20. Advanced: Chaining methods
console.log('\n20. Method Chaining Examples:');

// Get active users over 25, sort by name, get first 2
const result1 = users
    .filter(user => user.active && user.age > 25)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 2)
    .map(user => `${user.name} (${user.age})`);

console.log('Active users >25, sorted, first 2:', result1);

// Get sum of squares of even numbers
const result2 = numbers
    .filter(num => num % 2 === 0)
    .map(num => num * num)
    .reduce((sum, square) => sum + square, 0);

console.log('Sum of squares of even numbers:', result2);

// Group words by length
const result3 = words.reduce((groups, word) => {
    const length = word.length;
    groups[length] = groups[length] || [];
    groups[length].push(word);
    return groups;
}, {});

console.log('Words grouped by length:', result3);

// 21. Performance considerations
console.log('\n21. Performance Tips:');

// Avoid creating functions in loops (for older browsers)
console.log('❌ Bad - function in loop:');
numbers.forEach(function (num) {
    console.log(num * 2);
});

console.log('✅ Good - function outside loop:');
const double = num => num * 2;
numbers.forEach(num => console.log(double(num)));

// Use appropriate methods for large arrays
console.log('\nLarge array operations:');
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// find vs filter performance
console.time('find');
const found = largeArray.find(num => num === 99999);
console.timeEnd('find');

console.time('filter');
const filtered = largeArray.filter(num => num > 99990);
console.timeEnd('filter');

// 22. Common pitfalls and solutions
console.log('\n22. Common Pitfalls:');

// Pitfall 1: Modifying array during iteration
console.log('❌ Modifying during forEach:');
const original = [1, 2, 3, 4, 5];
original.forEach((num, index, arr) => {
    if (num % 2 === 0) {
        arr.splice(index, 1); // This can cause problems!
    }
});
console.log('Unexpected result:', original);

// Solution: Use filter
const evenNumbers2 = [1, 2, 3, 4, 5].filter(num => num % 2 === 0);
console.log('✅ Correct result:', evenNumbers2);

// Pitfall 2: Sparse arrays
console.log('\nSparse arrays:');
const sparse = new Array(5);
sparse[2] = 'hello';
console.log('Sparse array:', sparse);
console.log('Length:', sparse.length);
console.log('Has index 0:', sparse.hasOwnProperty(0));

// 23. Custom array methods (for learning)
console.log('\n23. Custom Array Methods:');

// Custom map implementation
Array.prototype.myMap = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            result[i] = callback(this[i], i, this);
        }
    }
    return result;
};

const customMapped = [1, 2, 3].myMap(num => num * 3);
console.log('Custom map result:', customMapped);

// Custom filter implementation
Array.prototype.myFilter = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

const customFiltered = [1, 2, 3, 4, 5, 6].myFilter(num => num > 3);
console.log('Custom filter result:', customFiltered);

console.log('\n🎉 Array methods examples completed!');

// Export for testing
module.exports = {
    numbers,
    words,
    users,
    // Export some functions for testing
    customMapped,
    customFiltered
};
