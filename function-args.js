// Different ways of handling arguments in functions

// "Normal" way
function foo(a, b) {
  return a + b;
}
console.log(foo(1, 2));

// Using 'arguments'
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
function bar(a, b) {
  return arguments[0] + arguments[1];
}
console.log(bar(3, 4));

function noArgBar() {
  return arguments[0] + arguments[1];
}
console.log(noArgBar(3, 4));

// arguments is Array-like but does NOT have Array methods!
function restLikeBar() {
  console.log(`${arguments.length} arguments passed`);
  let sum = 0;
  for (arg of arguments) {
    sum += arg;
  }
  return sum;
}
console.log(restLikeBar(3, 4));
console.log(restLikeBar(1, 4, 9, 1));

// Using the 'rest parameter'
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
function rest(...args) {
  return args.reduce((sum, arg) => sum + arg);
}
console.log(rest(9, 2));
console.log(rest(9, 2, 3));
console.log(rest(1, 2, 3, 4, 5));

// Using default parameters
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
function multiply(a, b = 1) {
  return a * b;
}
console.log(multiply(5));
console.log(multiply(5, 2));

// only the last parameter can be a rest parameter
function prepend(start, ...args) {
  return args.map(arg => start + arg);
}
console.log(prepend("...", "a", "b", "c"));
