
/*!
  __defineGetter__(<ANSI supported color>, fn
  http://en.wikipedia.org/wiki/ANSI_escape_code#CSI_codes
 */

['magenta','yellow','green','blue','cyan','red'].forEach(function(color) {
  String.prototype.__defineGetter__(color, function(){
    var options = {
      'magenta' : '\u001b[35m',
      'yellow' : '\u001b[33m',
      'green' : '\u001b[32m',
      'blue' : '\u001b[34m',
      'cyan' : '\u001b[36m',
      'reset' : '\u001b[0m',
      'red' : '\u001b[31m'
    };
    return options[color]+this+options['reset'];
  });
});

/* EOF */