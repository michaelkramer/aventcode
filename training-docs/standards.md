# Code Standards

## Filesystem

- The filesystem should always have lowercase filenames with hyphens separating words

### Good

- `long-file-name.js`

### Bad

- `longFileName.js`
- `long_file_name.js`

## Variable Naming

- When working with the database, it's ok to use `snake_cased` variables, but if you are returning results from the database you should `camelCase` the variable names. Template (pug) variables should never be `snake_cased`
