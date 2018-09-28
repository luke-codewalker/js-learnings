// base class
class Rectangle {
  // constructor function: how must a new instance be constructed, can have default parameters
  constructor(width, height, unit = "m") {
    this.width = width;
    this.height = height;
    this.unit = unit;
  }

  // methods that every instance will have
  getArea() {
    return `${this.width * this.height} ${this.unit}^2`;
  }
}

const rect = new Rectangle(4, 3);
console.log(rect.getArea());

// creating subclasses
// a new class with all properties and methods of the parent class
class Square extends Rectangle {
  constructor(length) {
    // calling the constructor of the parent class
    // super must be called befor this. can be used
    super(length, length);
  }

  // static methods are available on the class not the instance
  static speak() {
    return "I'm a ■";
  }
}

const sq = new Square(5);
// methods of parent class available
console.log(sq.getArea());
// properties of parent class available
console.log(sq.width);

// static method of class
console.log(Square.speak());
// not available on instance
console.log(sq.speak());
