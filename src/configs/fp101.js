/*Or as Julian Birch says:
So what the heck is a functor? Well, really it's just something you can map over and it makes sense.
*/
// Intro to algebraic programming

var add = function(x, y) {
  return x + y;
}
var multiply = function(x, y) {
  return x * y;
}

// associative
add(add(x, y), z) === add(x, add(y, z))

// commutative
add(x, y) === add(y, x)

// identity
add(x, 0) === x

// distributive
multiply(x, add(y, z)) === add(multiply(x, y), multiply(x, z))


// Side aside:
// The philosophy of functional programming postulates that side effects are a primary cause of incorrect behavior.
// Side effects disqualify a function from being pure.
// And it makes sense: pure functions, by definition,
// must always return the same output given the same input,
// which is not possible to guarantee when dealing with matters outside our local function.
/*
Side effects may include, but are not limited to:
  changing the file system
  inserting a record into a database
  making an http call
  mutations
  printing to the screen / logging
  obtaining user input
  querying the DOM
  accessing system state
*/
// It is not that we're forbidden to use them, rather we want to contain them and run them in a controlled way.

// impure
var minimum = 21;
var checkAge = function(age) {
  return age >= minimum;
};

// pure
var checkAge = function(age) {
  var minimum = 21;
  return age >= minimum;
};


// ex1
// old old school
var getServerStuff = function(callback) {
  return ajaxCall(function(json) {
    return callback(json);
  });
};

// better
// this line
return ajaxCall(function(json) {
  return callback(json);
});

// is the same as this line
return ajaxCall(callback);

// so refactor getServerStuff
var getServerStuff = function(callback) {
  return ajaxCall(callback);
};

// ...which is equivalent to this
var getServerStuff = ajaxCall; // <-- look mum, no ()'s


/// ----- more examples ----- ///


// specific to our current blog
var validArticles = function(articles) {
  return articles.filter(function(article) {
    return article !== null && article !== undefined;
  });
};

// vastly more relevant for future projects
var compact = function(xs) {
  return xs.filter(function(x) {
    return x !== null && x !== undefined;
  });
};


/// ----- Some exercises ----- ///
var _ = require('ramda'); // lodash/fp also cool


// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

var words = function(str) {
  return _.split(' ', str);
};

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = undefined;


// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

var filterQs = function(xs) {
  return _.filter(function(x) {
    return match(/q/i, x);
  }, xs);
};


// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function(x, y) {
  return x >= y ? x : y;
};

// REFACTOR THIS ONE:
var max = function(xs) {
  return _.reduce(function(acc, x) {
    return _keepHighest(acc, x);
  }, -Infinity, xs);
};


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = undefined;


// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
var take = undefined;


/// === wizardry list below ===///
/*
  Isomorphism
  ---
  compose (to, from) === identity
  compose (from, to) === identity

  Nature of isomorphism:
    Same information, different shape
*/
const firstToSecond = f => {
  return {
    top: f.y,
    left: t.x
  }
}
const secondToFirst = s => {
  return {
    y: s.top,
    x: s.left
  }
}
/*
  Catamorphism
  ---

  Natural transfromation
  ---
  compose (nt, map(f)) === compose(map(f), nt)


  Sequencers
  ---

  traverse = (f, of) => compose(sequence(of),map(f))

*/


const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const kupus = x => g => g.bind(x)

const konj = (str) =>
  Box(str.split(''))
  // .map(r => r.map(kupus))
  .inspect()
  .fold()
