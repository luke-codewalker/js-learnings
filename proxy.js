// The Proxy object

// The Proxy object is used to define custom behavior for fundamental operations(e.g. property lookup, assignment, enumeration, function invocation, etc).
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

// for example we can intercept the lookup of a poperty
const interceptor = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : "Not the droid you're looking for!";
  }
};
const original = { R2D2: "beep" };
const droids = new Proxy(original, interceptor);
console.log(droids.R2D2);
console.log(original.R2D2);
console.log(droids.C3PO);
console.log(original.C3PO);

// we can also forward all operations to another object by specifying nothing in the handler
const target = {};
const forwarded = new Proxy(target, {});
forwarded.test = 5;
console.log(forwarded.test);
console.log(target.test);

// this allows for example to validate input before it is assigned to an object
let credentials = { username: "", password: "" };
let validator = {
  set: function(obj, prop, value) {
    console.log({ prop, value });

    if (prop === "username") {
      if (value.length <= 5) {
        console.log("Username must be at least 5 characters long");
      } else {
        obj[prop] = value;
        return true;
      }
    } else if (prop === "password") {
      if (!value.match(/\d+/g)) {
        console.log("Password must contain at least one numeric character");
      } else {
        obj[prop] = value;
      }
    } else {
      console.log("Trying to set disallowed property!");
    }
  }
};

let signup = new Proxy(credentials, validator);

// using the proxy
signup.username = "abc";
signup.password = "abc";
signup.email = "jd@mail.com";
console.log(signup);

signup.username = "JohnDoe";
signup.password = "p4ssw0rd";
console.log(signup);

// you can still skip using the proxy and thus circumvent any validation
credentials.username = "abc";
credentials.password = "abc";
console.log(credentials);
