// `Object.assign()` method

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// The `Object.assign()` method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.

const target = { a: 1 };
const source = { a: 2, b: 3 };
const result = Object.assign(target, source);
console.log(target, source, result);
console.log(result === target);

// It will also modify the target object! So if you want to merge into a new object you need to use a new empty object as target
const target2 = { a: 1 };
const source2 = { a: 2, b: 3 };
const result2 = Object.assign({}, target2, source2);
console.log(target2, source2, result2);
console.log(result2 === target2);
// Note how properties get overwritten by the same property of objects later in the order they are passed into `Object.assign()`

// This way you can also copy an object
const original = { foo: "bar" };
const copy = Object.assign({}, original);
console.log(original, copy);
console.log(original === copy);

// Attention! `Object.assign()` does NOT deep clone
// meaning nested objects are only copied by reference
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj1, obj2);
obj1.a = 1;
console.log(obj1, obj2);
obj1.b.c = 1; // changes c in both objects!
console.log(obj1, obj2);

// Deep clone of values can be achieved using JSON
const obj3 = JSON.parse(JSON.stringify(obj1));
console.log(obj1, obj3);
obj1.b.c = 5; // does NOT change c in obj3
console.log(obj1, obj3);

// Copying accessors (getters and setters) is also tricky! The computed value gets copied not the function itself
const first = {
  a: 1,
  get b() {
    return this.a + 2;
  }
};
const second = Object.assign({}, first);
console.log(first.b);
console.log(second.b);
first.a = 3; // first.b will still be 3 the value originally computed
console.log(first.b);
console.log(second.b);
console.log(first, second);

// if you pass primitive values to the assignment they will get wrapped into objects but only appear if they have own enumerable properties (like strings, with their indices)
const string = "str";
const number = 15;
const boolean = false;
const test = Object.assign({}, string, number, boolean);
console.log(test);
