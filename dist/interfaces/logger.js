'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _bunyanFormat = require('bunyan-format');

var _bunyanFormat2 = _interopRequireDefault(_bunyanFormat);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatOut = (0, _bunyanFormat2.default)({ outputMode: 'short' });
var log = _bunyan2.default.createLogger({
  name: 'Deadweight',
  stream: formatOut
});

log.chalk = _chalk2.default;

exports.default = log;