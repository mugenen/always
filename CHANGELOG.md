
## CHANGELOG

### Version 0.0.7

- Graceful exits on args missing


### Version 0.0.6

- Use watchFile vs. fs.watch now, as 0.6.x is buggy

### Version 0.0.5

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
