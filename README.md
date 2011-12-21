
# Always - [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/always.png)](http://travis-ci.org/edwardhotchkiss/always)

> CLI & Daemon tool to run a NodeJS process, restarting on file changes & crashes

## Installation

```bash
$ [sudo] npm install always -g
```

## Usage (Realtime Editing & Development)

```bash
$ always app.js
```

## Usage (Daemonized Process)

```bash
$ always start app.js
$ always list
$ => [always]  [0]  12.14.1/00:01:44 PM    app.js    00:00:01:23
```

## Help

```bash
Usage: always <options> <app.js>
=> always app.js

Options:
  -v, --version    current `always` version
  -h, --help       help!
```

## Run Tests

``` bash
$ npm test
```

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
