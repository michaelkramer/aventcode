# FlowType

- [Flow Type System](https://flow.org/en/docs/)

FlowType system, this makes the dynamic language statically typed. Its really important to learn what the errors mean. If sublime is setup correctly you should be able to see red dots where there is a flow error. I can't remember the Windows shortcut to view errors but you can probably find it in the Sublime topnav.

## Example of FlowType in action:

On [line 11](https://code.knledg.com/elm/sandbox/blob/master/server/ctx/users.js#L11), we see that `fetchUsers()` will return a `Promise` that will resolve eventually and return an array/list of `User` objects. The user object is on line 4-9.

This helps because then anything that calls this function, will receive an array of user objects and it will know what those user object key/value pairs are (edited)

## Adding flow to a file

1. At the top of the file add `/* @flow */` to typecheck the whole file or
1. Add `// @flow` above a function to typecheck the function

## Adding flow packages to an IDE

- For Sublime, the packages needed are: `Flow` and `SublimeLinter-flow`.
- For Atom, type: `$ apm install ide-flow` into terminal.

## Type Annotations

```javascript
  function foo(x: string, y: number): number {
    return x.length * y;
  }
```

In the above example, we annotation the param `x` as a string, `y` as a number, and say that the function will
return a new number

```javascript
function total(numbers: Array<number>) {
  ...
}

```

In the above example, numbers is an array of numbers


```javascript
const foo: string = "Hello, World!";
```

In the above example, a variable is annotated in the variable declaration statement

```javascript
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  copy(): Point {
    return new Point(this.x, this.y);
  }
}
```

```javascript
var {a, b: {c}}: {a: string, b: {c: number}} = {a: "", b: {c: 0}};
```

When using ES6 destructuring, you need to define types for each destructured key


### What if the type is dynamic?

```javascript
function foo(x) {
  return x.length;
}
```

In the above example, you can input a string, but if you input a number it would fail. You can use typeof to handle edge cases
if your function needs to be dynamic.

```javascript
function foo(x) {
  if (typeof x === 'string') {
    return x.length;
  } else {
    return x;
  }
}
```

Note: Flow will work with `typeof x === 'string'` but will not understand `_.isString(x)` (same for isObject, isArray, isNull, etc)



### Starting Flow

1. Once flow is configured in your repo, run `npm run flow` in a terminal window in the root folder.
1. It will intermittently check for flow errors in the background.
1. Type `npm run flow` again to find out if you have flow errors.

Note: If you install the sublime-plugin `Flow`, you just need to start the `flow` daemon once and sublime will notify you intermittently about errors (not necessary on save, however)


### Flow Types

1. boolean
1. number
1. string
1. array `Array<string>`
1. Object `{key: string, key2: number}`
1. Function
1. Error
1. null|undefined is `maybe` (see below)
1. mixed (Array type if you have strings/numbers/booleans)
1. void (when you don't return or return undefined or return this.setState)
1. any
1. literal types (if you pass in something with one expected value, you can use that literal value)
1. type alias

```javascript
type Suit =
  | "Diamonds"
  | "Clubs"
  | "Hearts"
  | "Spades";
type Rank =
  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | "Jack"
  | "Queen"
  | "King"
  | "Ace";
type Card = {
  suit: Suit,
  rank: Rank,
}
```

You can also import aliases from other files

```javascript
export type Foo = string;

import type {Foo} from './types';
const foo: Foo = "Hello";
```

### Maybe

You can put a question mark before the type if it can also be null/undefined

```javascript
const foo: ?string = null;
```

You can also put a question mark after a key in an object to say that key may not always exist.

```javascript
const user: {name: string, picture?: string, id: number}
```

**Important Note:** If you have an optional key in an object, any function that uses that object and it's key will need to declaratively check if the key exists and do `x` action otherwise
do `y` action

### Union Types

```javascript
let input: string | number | boolean = 'hey';

input = true;
input = 5;
```

This comes into play when you return from a function. Sometimes you return an object, sometimes you return true, sometimes you return undefined/null, and sometimes you throw an Error.
Try to limit what gets returned from functions to one or two types.

### typeof
If one variable is a clone of another variable, you can use typeof to handle defining the new var type
```javascript
const b: typeof a; // b has the same type as X. It is the same as a
```

## Typecasting

You can typecast the result of an expression by defining the type at the end of the expression

```javascript
(1 + 1 : number)

var obj = {
  name: (null: ?string)
};
```

## Declarations

```javascript
declare class Auth0Lock {
  constructor(clientId: string, domain: string): Lock;
}
declare var process: {env: {AUTH0_CLIENT_ID: string, AUTH0_DOMAIN: string}};
```

In the above example, you, as a developer, are declaring that Auth0Lock and process.env.AUTH0_CLIENT_ID / process.env.AUTH0_DOMAIN will always exist at runtime and for Flow to assume they exist. If they don't exist, a runtime error will occur that Flow can't prevent



# Resources

[Cheatsheet](http://www.saltycrane.com/blog/2016/06/flow-type-cheat-sheet/)
[Caveats](https://flowtype.org/docs/dynamic-type-tests.html#caveats)
