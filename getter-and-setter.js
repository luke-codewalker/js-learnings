// getter and setter functions for objects

// get
// The `get` syntax binds an object property to a function that will be called when that property is looked up.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
const queue = {
  waiting: ["John", "Jane", "Bill"],
  get next() {
    return this.waiting.length > 0
      ? this.waiting[this.waiting.length - 1]
      : "queue empty";
  },

  serve() {
    return this.waiting.pop();
  }
};
console.log(queue.waiting);
console.log(queue.next);
console.log(queue.serve());
console.log(queue.next);

// Note: never define a getter with the same name as the property you are accessing, this will result in an infinte loop of the getter calling itself over and over again!

// set
// The set syntax binds an object property to a function to be called when there is an attempt to set that property.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
let locations = {
  log: [],
  set current(x) {
    this.log.push(x);
  }
};
locations.current = "Berlin";
locations.current = "Cologne";
console.log(locations.log);
console.log(locations.current);
// hmmm current is undefined that's not what we want

// It's because we have a setter but no getter for curent.
console.log(locations);
// Let's add a getter
Object.defineProperty(locations, "current", {
  get: function() {
    return this.log.length > 0 ? this.log[this.log.length - 1] : "log empty";
  }
});
// Note: you can't use an => function above because of lexical this!

locations.current = "Berlin";
locations.current = "Cologne";
console.log(locations);
console.log(locations.current);

// if we want to get rid of it again:
delete locations.current;
console.log(locations);

// you can also use a computed property name
let prop = "bar";
const obj = {
  values: [],
  set [prop](x) {
    this.values.push(x);
  }
};
obj.values.push("hi");
console.log(obj.values);
obj.bar = "hello";
console.log(obj.values);
obj[prop] = "hola";
console.log(obj.values);
// below will not work!
prop = "foo";
obj[prop] = "hallo";
console.log(obj.values);
