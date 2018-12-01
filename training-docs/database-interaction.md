# Database Interaction

## Knex

- [KnexJS](http://knexjs.org/)

This is our library for querying from Postgres. You can see it in use on [lines 12-13](https://code.knledg.com/elm/sandbox/blob/master/server/ctx/users.js)

In their docs, they will reference `knex('users')`, but through Distraught we have `db.ck('users')` where `db.ck` defines a specific database to query against.

All of the syntax in there docs will be available though, so we can use these docs to learn how to fetch data from Postgres


## Database / PGWeb

- You should be be able to go to [localhost:8081](http://localhost:8081) (if on dockertools, use the dockertool ip address) to view PGWeb
- Database migrations are specified in the migrations folder. They are usually ran and applied in chronological order. Every migration has two sections `up` and `down`. When you run an `up` migration, you are specifying changes to the database you want applied. `down` is usually used for rolling back a change.
- With database migrations, you should be able to `up` and `down` migrate multiple times locally without errors, if you didn't receive errors as you try migrating/rolling-back multiple times, you have a good migration.
