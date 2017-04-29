'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint global-require: 0, import/no-dynamic-require: 0 */

exports.default = function (taskDir) {
  var taskPaths = _glob2.default.sync(taskDir + '/**/*.js');
  var tasks = [];

  // Get all tasks, iterate over them and index them with the name and the function
  taskPaths.forEach(function (file) {
    var imported = require(file);
    var name = _path2.default.parse(file).name;

    // Check if the user is using `module.exports` in their tasks, with import
    // above task will come in with a .default
    if (Object.hasOwnProperty.call(imported, 'default')) {
      imported = imported.default;
    }

    if (typeof imported === 'function') {
      tasks[name] = imported;
    }
  });

  return tasks;
};