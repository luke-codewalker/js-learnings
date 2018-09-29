// a look at Symbols introduced in ES2015
// ressources:
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// - https://medium.freecodecamp.org/some-of-javascripts-most-useful-features-can-be-tricky-let-me-explain-them-4003d7bbed32

// symbols are primitive data types whose values are unique
// they are created using the Symbol() function (which is similar to a class but is not a full one
// as you can't do new Symbol())
const mySymbol = Symbol();
console.log(mySymbol);

// you can also return the primitive value like so (mostly done automatically by Javascript)
console.log(mySymbol.valueOf());
console.log(typeof mySymbol.valueOf() === "symbol");
console.log(typeof mySymbol === "symbol");

// or see it as a string
console.log(mySymbol.toString());
console.log(typeof mySymbol.toString() === "string");

// you can give a symbol a description
const describedSymbol = Symbol("enter description here");
console.log(describedSymbol);

// symbols with the same description are still unique!
console.log(Symbol("test") === Symbol("test"));

// you can use symbols as object properties also known as keyed properties
const obj = { a: 1, b: 2 };
const sym = Symbol("c");
obj[sym] = 3;
console.log(obj[sym]);

// it will not appear in iteration/enumeration though
for (const key in obj) {
  console.log(`${key} : ${obj[key]}`);
}
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.keys(obj));
// that's what this method is for:
console.log(Object.getOwnPropertySymbols(obj));

// Symbol behaves like a singleton if we use the Symbol.for() method
// if it is called with a key it will either create a new symbol for that key if it doesnt't exist yet
const symbol = Symbol.for("some key you want to search or create a symbol for");
// if a symbol for that key exists it will just return that symbol
const sameSymbol = Symbol.for(
  "some key you want to search or create a symbol for"
);

console.log(symbol === sameSymbol);

// you can also get the key for a symbol created twith the for() method
console.log(Symbol.keyFor(symbol));

// "Well-known symbols" expose formerly hidden language behavior by using built-in Symbols
// as properties of objects (for example [Symbol.iterator] for iterator behavior, see `iterators.js`)
console.log([1, 2, 3][Symbol.iterator]);

// Example: the String.prototype.search method look for a [Symbol.search] in the object
// it is passed to execute the search
const re = new RegExp("a");
console.log(re[Symbol.search]);
console.log("banana".search(re));

// this means we can also pass our own custom object and it will be used by search as long
// as it has the right symbol
const hopelessSearch = {
  [Symbol.search]: () => "can't find anything"
};

console.log("banana".search(hopelessSearch));

// We can also use this to extend and modify built in classes
// not that this will do us any good!
class globalRegExp extends RegExp {
  [Symbol.search](str) {
    const indices = [];
    let result = this.exec(str);
    while (result !== null) {
      indices.push(result.index);
      result = this.exec(str);
    }
    return indices;
  }
}

// constructing oure new global regex search
const gre = new globalRegExp("n", "g");

// standard methods still work
console.log("banana".match(gre));
console.log(/n/g.exec("banana"));

// search now folows our custom behavior
console.log("banana".search(gre));
// which is not the default behavior
console.log("banana".search(new RegExp("n", "g")));
