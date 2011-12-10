# nitrix

> A CLI & Daemon tool to run a NodeJS process Forever, restarting on file changes & crashes with piping to stdout or log files.

## Installation

```bash
$ [sudo] npm install nitrix -g
```

## Usage

### Realtime Editing & Development

```bash
$ nitrix app.js
```

## Run Tests

``` bash
$ npm test
```

## CHANGELOG

### Version 0.0.5 (master, in progress)

- Commander now uses proper version #
- Minor [nitrix] changes in logger()
- Remove special characters such as \n \r >s from child

### Version 0.0.4

- Testing for running app.js before teardown
- Removed duplicated console.log
- Cleaned `has changed` responses
- Fixed path bug

### Version 0.0.3

- Kill node process on test teardown
- Restart/Cleanup on 
- Keep everything in bin vs. lib
- `restartTimeout`/1s/1000ms restart on irrecoverable `exit`
- Readme improvements

### Version 0.0.2

- Removed help options that are for later implementation
- Added a complete automated vows test suite
	* Setup
	* Test `nitrix` CLI
	* Teardown
- Added .gitignore

### Version 0.0.1 (initial version)

- Implementations:
	* `nitrix myapp.js`
	* `nitrix start myapp.js`
	* `nitrix --version`
	* `nitrix --help`
	
- Kill process before respawn
- Restart on file edits
- Restart on uncaughtException
- Sweet spot for development usage.
  
## License (MIT)

Copyright (c) 2011, Edward Hotchkiss.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author: [Edward Hotchkiss][0]

[0]: http://ingklabs.com/
