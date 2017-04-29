'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (modules) {
  var builder = _yargs2.default.describe('Deadweight').usage('Usage: $0 <command> [options]').help('h').alias('h', 'help');

  modules.forEach(function (module) {
    builder.command(module);
  });

  return builder;
};