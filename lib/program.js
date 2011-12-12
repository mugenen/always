
/*!
  @class program
  Setup methods for a CLI program
 */

var program = {
  args : null,
  name : null,
  version : null,
  commands : []
};

exports.args = function(args){
  program.args = args;
};

exports.version = function(v){
  program.versionNumber = v;
};

exports.add = function(command, description, action) {
  var newCommand = [
    command,
    description,
    action
  ]
  program.commands.push(newCommand);
};

/* EOF */