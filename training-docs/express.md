# Express

- [Express](http://expressjs.com/en/api.html)

Express is the underlying webserver. All of the functionality is usually found in the `router.js` file and in the `/controllers` folder

## Request Data From User

- If a form was POST'ed, check `req.body` for the POST data
- If a GET page was called with filters, check `req.query` for the GET params
- If a page has request params that matched (ex: `server.app.get('/users/:userId')`), check `req.params` for the variable you expect such as `req.params.userId`.
