// ressource: https://jakearchibald.com/2014/iterators-gonna-iterate/

// arrays in Javascript are iterators
// which means you can use them in a for...of loop
for (const num of [1, 2, 3]) {
  console.log(num);
}

// taking a closer look at it:
const numbers = [1, 2, 3];
console.log(numbers[Symbol.iterator]);
console.log(numbers[Symbol.iterator]());

// whatever is defined under Symbol.iterator is used by for...of to get the next value in the iteration
// but we can also do so manually
const numberIterator = numbers[Symbol.iterator]();
// calling Symbol.iterator gives us back an object with the next method
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
// this also reveals what an iterator must do: return an object with value and done

// this is enough to construct our own:
class Characters {
  constructor(str) {
    this.str = str;
    this.index = -1;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.index < this.str.length - 1) {
          this.index++;
          return {
            done: false,
            value: this.str[this.index]
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  }
}

const letters = new Characters("this is just a test");
for (const letter of letters) {
  console.log(letter);
}
