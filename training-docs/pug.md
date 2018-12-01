# Pug

- [Pug](https://pugjs.org/api/getting-started.html)

PugJS is used for our `/views` folder. Pugjs is the same project as Jade, it was renamed due to a trademark issue.

You can visit [HTML2Jade](http://html2jade.org/) to see how it works under the hood. With PugJS indentation and syntax are important to pay attention to
otherwise you will generate syntax errors and the pug view won't compile

## Code Standards In Pug files

- If a DOM element is going to be used in a test, its class should be prefixed with `.ref__<name>`
- If a DOM element is going to be used by jQuery, its class should be prefixed with `.jq__<name>`

This helps designers and engineers know that we should not ever delete those classes because they are being used somewhere by either a test of jQuery.
