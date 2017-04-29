'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cli = require('./interfaces/cli');

var _cli2 = _interopRequireDefault(_cli);

var _logger = require('./interfaces/logger');

var _logger2 = _interopRequireDefault(_logger);

var _runners = require('./loaders/runners');

var _runners2 = _interopRequireDefault(_runners);

var _config = require('./loaders/config');

var _config2 = _interopRequireDefault(_config);

var _tasks = require('./loaders/tasks');

var _tasks2 = _interopRequireDefault(_tasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cwd = process.cwd();
var configDir = _path2.default.join(cwd, 'deadweight', 'config');
var taskDir = _path2.default.join(cwd, 'deadweight', 'tasks');
var runnerFile = _path2.default.join(cwd, 'deadweight', 'runners.yml');

var load = function load(options) {
  var r = options.runnerFile || runnerFile;
  var t = options.taskDir || taskDir;
  var c = options.configDir || configDir;
  var p = options.projectConfig || {};

  var runners = (0, _runners2.default)(r);
  var tasks = (0, _tasks2.default)(t);
  var config = (0, _config2.default)(c, p);

  return { runners: runners, config: config, tasks: tasks };
};

var getRun = function getRun(runners, commands, tasks) {
  var run = void 0;

  if (!commands.length) {
    run = runners.default;
  } else {
    run = commands.map(function (command) {
      if (runners[command]) return runners[command];
      if (tasks[command]) return command;

      _logger2.default.error(_logger2.default.chalk.red('Runner or task not found:') + ' ' + command);

      return undefined;
    }).filter(function (command) {
      return command;
    });
  }

  return run;
};

exports.default = function (options) {
  // TODO: this will be an attempt to let the user hook into the CLI
  var yargs = (0, _cli2.default)([]);
  var args = yargs.argv;
  var commands = args._;

  var _load = load(options),
      runners = _load.runners,
      config = _load.config,
      tasks = _load.tasks;

  var run = getRun(runners, commands, tasks);

  if (run.length) {
    var _ref;

    (_ref = []).concat.apply(_ref, _toConsumableArray(run)).forEach(function (task) {
      var taskFn = tasks[task];
      if (taskFn) {
        taskFn({ logger: _logger2.default }, config)();
      }
      // TODO: else log
    });
  }

  yargs.reset();
};