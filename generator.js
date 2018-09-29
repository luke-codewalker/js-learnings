// ressource: https://jakearchibald.com/2014/iterators-gonna-iterate/
// take a look at `iterators.js` first

// generators are just a more elegant way of defining iterators
// note the asterisk
function* generate(userIds) {
  yield 1;
  yield 2;
  yield 3;
}

// generate() provides an iterator
for (const num of generate()) {
  console.log(num);
}

// which means we can also spread it
console.log([...generate()]);

// generators can be nested
function* letters() {
  yield "a";
  yield "b";
}

function* numbers() {
  yield 1;
  // note the * after yield
  yield* letters();
  yield 2;
}

console.log([...numbers()]);

// yield* can also deal with iterables not only generators:
function* interrupt() {
  yield "my name is";
  yield* ["EXCUSE", "ME"];
  yield "john";
}
console.log([...interrupt()]);

// yield can only be called directly under a generator functions scope not nested
// this will throw an error:
// function* fail(array) {
//   array.forEach(element => {
//     yield element + 1;
//   });
// }
// but this will work:
function* addOne(array) {
  for (const element of array) {
    yield element + 1;
  }
}
console.log([...addOne([1, 2, 3])]);

// but now let's make this even more awesome and combine the powers of yield*
// and the fact that arrays are automatically iterables
function* capitalize(array) {
  yield* array.map(string => string.toUpperCase());
}
console.log([...capitalize(["heLLo", "worLd"])]);
