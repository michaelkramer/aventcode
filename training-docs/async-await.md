# Async / Await

- [Async/Await](https://www.google.com/search?q=nodejs+async+vs+await&oq=nodejs+async+vs+await&aqs=chrome..69i57j0l5.2728j0j4&sourceid=chrome&ie=UTF-8)

Javascript, unlike most languages, is asyncronous by default. So if you request data from a 3rd party vendor, or from the database, and you don't tell the code to stop, it keeps processing.

Originally, javascript used callbacks to handle waiting for data to get returned, which isn't even in this article since its such an outdated way to wait for data to get returned.

Node.js incepted `Promises`, to say "wait for this data to return before continuing", but it still is kind of a messy syntax. (You can see that at the beginning of this article)

So in the last year, async/await came out. It helps clean up the syntax a lot. If you know you need to wait for data to get returned from a third party or from the database, you can put `await` in front of the function call, and it will treat that as a synchronous call.

There are some syntax caveats/underlying principles that aren't hard to learn, but will help a lot in using async/await which the article covers

[Sample usage in the sandbox](https://code.knledg.com/elm/sandbox/blob/master/server/web/controllers/index.js#L17)
