'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yaml = require('../interfaces/yaml');

var _yaml2 = _interopRequireDefault(_yaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (runnerFile) {
  return (0, _yaml2.default)(runnerFile);
};