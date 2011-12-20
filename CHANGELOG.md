
0.4.1 / 2011-12-19 
==================

  * Merge branch 'develop'
  * vows added
  * remove tests while updating test suite
  * travis
  * only travis on master
  * new tests
  * new tests, bump speculum dep to 0.1.0
  * rename topic
  * new tests converting to `speculum
  * removed vows, added speculum
  * vows


0.3.1 / 2011-12-18 
==================

  * simplified switch
  * setup for `always start app.js`
  * new description, setup for 0.3.0 (daemonization)
  * dates on the changelog

0.3.0 / 2011-12-16
==================

  * Changed description
  * aemon created
	* `always start myapp.js`
	* `always list`
		=> <my_daemonized_apps>
  * pdated tests for Daemonization

0.2.3 / 2011-12-14
==================

  * watch relevant files in main app directory
	* .js/.json/.ejs/.yaml
  * walk => watch the file tree recursively on down

0.2.2 / 2011-12-11
==================

   * /lib/monitor.js (new (EventEmitter))

0.2.1 / 2011-12-11
==================

  * removed /lib/program.js requirement/segmentation
  * @method initializeDevelpment (mode) segmented out
  * @method help
 * @method version

 0.2.0 / 2011-12-11
===================

 * rename to from to `always`

0.1.3 / 2011-12-11
==================

  * commander was still in package.json 

0.1.2 / 2011-12-11
==================

  * always is free of all 3rd party module dependencies
	* Removed commander dependency (overkill)
	* Code being segmented into /lib
	* /lib/colors.js
	* /lib/options.js

0.1.1 / 2011-12-16
==================

  * display that user killed process now with CTL+C
  * removed `require colors`, 1 less dependency
  * use initial capitalized letter on [always] commands
  * yellow warnings
  * [myapp.js] in green to [myapp.js] in cyan

0.1.0 / 2011-12-11
==================

  * display `always` version on process start
  * console.log vs. logger for yourapp.js stdout/stderr
	- appLogger()
  * test for execvp and logger/exit on true

0.0.9 / 2011-12-11
==================

  * minor but important fix on control flow after extensive real world testing

0.0.8 / 2011-12-11
==================

  * exit on irrecoverable fatal error.
  * daemon mode `always start myapp.js` won't exit however

0.0.7 / 2011-12-11
==================

  * graceful exits on args missing
  * process.cwd() vs. __dirname

0.0.6 / 2011-12-11
==================

  * use watchFile vs. fs.watch now, as 0.6.x is buggy

0.0.5 / 2011-12-11
==================

  * commander now uses proper version #
  * minor [always] changes in logger()
  * remove special characters such as \n \r >s from child

0.0.4 / 2011-12-11
==================

  * testing for running app.js before teardown
  * removed duplicated console.log
  * cleaned `has changed` responses
  * fixed path bug

0.0.3 / 2011-12-11
==================

  * kill node process on test teardown
  * restart/Cleanup on 
  * keep everything in bin vs. lib
  * `restartTimeout`/1s/1000ms restart on irrecoverable `exit`
  * readme improvements

0.0.2 / 2011-12-11
==================

  * removed help options that are for later implementation
  * added a complete automated vows test suite
	* Setup
	* Test `always` CLI
	* Teardown
  * added .gitignore

0.0.1 / 2011-12-11
==================

  * implementations:
	* `always myapp.js`
	* `always start myapp.js`
	* `always --version`
	* `always --help`
	
  * kill process before respawn
  * restart on file edits
  * restart on uncaughtException
  * sweet spot for development usage.
