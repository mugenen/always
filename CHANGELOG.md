
## CHANGELOG

### Version 0.0.2

- Removed help options that are for later implementation
- Added a test suite
	* Setup
	* Test `nitrix` cli
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