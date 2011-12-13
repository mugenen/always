
## CHANGELOG

### Version 0.2.1 (master branch)

- Removed /lib/program.js requirement/segmentation
- @method initializeDevelpment (mode) segmented out

### Version 0.2.0

- Rename to from to `always`

### Version 0.1.3

- Commander was still in package.json

### Version 0.1.2

- always is free of all 3rd party module dependencies
	* Removed commander dependency (overkill)
	* Code being segmented into /lib
	* /lib/colors.js
	* /lib/options.js
- ...

### Version 0.1.1

- Display that user killed process now with CTL+C
- Removed `require colors`, 1 less dependency
- Use initial capitalized letter on [always] commands
- Yellow warnings
- [myapp.js] in green to [myapp.js] in cyan

### Version 0.1.0

- Display `always` version on process start
- console.log vs. logger for yourapp.js stdout/stderr
	- appLogger()
- Test for execvp and logger/exit on true

### Version 0.0.9

- Minor but important fix on control flow after extensive real world testing

### Version 0.0.8

- Exit on irrecoverable fatal error.
- Daemon mode `always start myapp.js` won't exit however

### Version 0.0.7

- Graceful exits on args missing
- Process.cwd() vs. __dirname

### Version 0.0.6

- Use watchFile vs. fs.watch now, as 0.6.x is buggy

### Version 0.0.5

- Commander now uses proper version #
- Minor [always] changes in logger()
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
	* Test `always` CLI
	* Teardown
- Added .gitignore

### Version 0.0.1 (initial version)

- Implementations:
	* `always myapp.js`
	* `always start myapp.js`
	* `always --version`
	* `always --help`
	
- Kill process before respawn
- Restart on file edits
- Restart on uncaughtException
- Sweet spot for development usage.
