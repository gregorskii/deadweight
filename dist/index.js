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

var cwd = process.cwd();
var configDir = _path2.default.join(cwd, 'deadweight', 'config');
var taskDir = _path2.default.join(cwd, 'deadweight', 'tasks');
var runnerFile = _path2.default.join(cwd, 'deadweight', 'runners.yml');

exports.default = function (options) {
  var runners = (0, _runners2.default)(options.runnerFile || runnerFile);
  var yargs = (0, _cli2.default)([]);
  var args = yargs.argv;
  var commands = args._;
  var tasks = (0, _tasks2.default)(options.taskDir || taskDir);
  var run = [];

  if (!commands.length) {
    var runner = runners.default;
    run = [].concat(run, runner);
  } else {
    commands.forEach(function (command) {
      var runner = runners[command];
      var task = tasks[command];

      if (runner) {
        run = [].concat(run, runner);
      } else if (task) {
        run = [].concat(run, command);
      } else {
        _logger2.default.error(_logger2.default.chalk.red('Runner not found:') + ' ' + command);
      }
    });
  }

  var config = (0, _config2.default)(options.configDir || configDir, options.projectConfig || {});

  run.forEach(function (task) {
    var taskFn = tasks[task];
    if (taskFn) {
      taskFn({
        logger: _logger2.default
      }, config)();
    }
  });

  yargs.reset();
};