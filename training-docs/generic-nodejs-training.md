# NodeJS, generic training

## Importing Libraries

1. You can import an entire module: `import _ from 'lodash';`
1. Or you can import a function or object from that module: `import {each} from 'lodash';`

- It's preferred to import only the functions you need from the library

### Order of imports

- Modules that are `npm installed` (referenced in `package.json` should show up at the top of the import list in a file) and functions/modules that are relative to that project should show up underneath with an empty line between them.

#### Example

```javascript
// @flow
import {each} from 'lodash'; // function import from node_module

import {formatPhone} from 'server/lib/helpers/phone'; // relative function import
```

## Exporting

1. You can export a whole function: `export function fetchUser()`
1. You can export a variable: `export const user = {firstName: 'jason'}`
1. You can export classes as well `export class Person {}` (but we prefer to write more in a more functional style and avoid classes if possible)

## Promises

- We prefer to use `async/await` for a cleaner style, but inevitably we will work with chaining Promise functions.

- A Promise is an asyncronous action that will either return some valid datatype or an `Error`

### Example promise

```javascript
// @flow
import {db} from 'distraught';

function fetchUsers() {
  return db.ck('users')
    .limit(10)
    .then((users) => {
      // I have an array of valid users here
    })
    .catch((err) => {
      // I have an instance of an Error
    });
}

```

### Chaining Promises Using ES6 syntax

- ES6, which came out in 2015 (also called ES2015), was a new syntax that made Javascript easier to develop on. It allows things like chaining promises in a few different ways.
- In all the examples below, the result is the same, it's just written differently:

#### Example 1a

```javascript
// @flow
import {map} from 'lodash';
import {db} from 'distraught';

// Takes an array of users with snake_cased keys and camelCases those keys
function toCamelCase(records: Array<{first_name: string, last_name: string}>): Array<{firstName: string, lastName: string}> {
  return map(records, (record) => {
    return {
      firstName: record.first_name,
      lastName: record.last_name,
    };
  });
}

/**
 * [fetchUsers - notice this Flow returntype definition says the keys will be camelCased, but in the DB, they are stored snake_cased]
 */
function fetchUsers(): Promise<Array<{firstName: string, lastName: string}>> {
  return db.ck('users')
    .columns(['first_name', 'last_name'])
    .limit(10)
    .then((users) => {
      return toCamelCase(users); // We get an array and we pass the array through a function that performs a transformation on the data, and returns a new set of data
    });
}
```

#### Example 1b

```javascript
// @flow
import {map} from 'lodash';
import {db} from 'distraught';

// Takes an array of users with snake_cased keys and camelCases those keys
function toCamelCase(records: Array<{first_name: string, last_name: string}>): Array<{firstName: string, lastName: string}> {
  return map(records, (record) => {
    return {
      firstName: record.first_name,
      lastName: record.last_name,
    };
  });
}

/**
 * [fetchUsers - notice this Flow returntype definition says the keys will be camelCased, but in the DB, they are stored snake_cased]
 */
function fetchUsers(): Promise<Array<{firstName: string, lastName: string}>> {
  return db.ck('users')
    .columns(['first_name', 'last_name'])
    .limit(10)
    .then((users) => toCamelCase(users)); // Same result as before, this syntax literally says "Pass users to `toCamelCase` and return the results of that executed function"
}
```

#### Example 1c

```javascript
// @flow
import {map} from 'lodash';
import {db} from 'distraught';

// Takes an array of users with snake_cased keys and camelCases those keys
function toCamelCase(records: Array<{first_name: string, last_name: string}>): Array<{firstName: string, lastName: string}> {
  return map(records, (record) => {
    return {
      firstName: record.first_name,
      lastName: record.last_name,
    };
  });
}

/**
 * [fetchUsers - notice this Flow returntype definition says the keys will be camelCased, but in the DB, they are stored snake_cased]
 */
function fetchUsers(): Promise<Array<{firstName: string, lastName: string}>> {
  return db.ck('users')
    .columns(['first_name', 'last_name'])
    .limit(10)
    .then(toCamelCase); // Same result as before, this syntax literally says "Take whatever datatype response we get from the database query, pass it to `toCamelCase` and return the results of that executed function"
}
```

## Common Errors

### Cannot read `variable` of undefined

- This means you either have an object or an array that you are referencing a key on that object or array but the object or array variable isn't set or is set but is not of the datatype object or array.

#### Example 1

```javascript
const person = {firstName: 'Jason'};

const firstName = prson.firstName; // person spelt wrong, `prson` is undefined, so we get error: Cannot read `firstName` of undefined
```

#### Example 2

```javascript
const peopel = [];

if (people.length) {
  each(people, (person) => {
    console.log(person);
  });
}

// original array instantiation variable misspelled, here `people` is undefined so we get error: Cannot read `length` of undefined
```

## Handling Errors Gracefully

- Oftentimes, you will know that your code is capable of generating an error, but you want to return the page to the user with a flash message instead of the page just showing a big fat "Internal Server Error" message, that the user then needs to click `Back` on their browser to continue.
- Specific example, if I have a listing search and the user searches for `beds: 50000000`, my `db.ck('listings')` query is probably going to throw a `beds is not a BigInt` style error.
- To handle this, we can use `captureException` (not shown in the sandbox environment but will be available in other apps). `captureException` notifies developers that an error occurred, but we can still continue to serve content to the user. Let's took a look at this example controller function:

```javascript
// @flow
import {db} from 'distraught';

import {wrap as w} from 'server/lib/wrap';
import {captureException} from 'server/lib/exception';

function fetchListings(minBeds: integer): Promise<Array<{id: number, beds: number}>> {
  return db.ck('listings')
    .columns(['beds', 'id'])
    .where('beds', '>=', minBeds)
    .limit(1000);
}

server.app.get('/listings', async w((req: any, res: any) => {
  let listings = []; // listings defaults to an empty error
  try {
    listings = await fetchListings(req.query.minBeds);
  } catch (err) {
    captureException(err); // Developers notified of a problem
    req.flash('error', 'An error occured while fetching listings'); // user receives flash message with error
  }

  return res.render('pages/listings', {listings}); // page still renders because the Error was caught and handled
}));


```
