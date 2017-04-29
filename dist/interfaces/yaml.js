'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (file) {
  var parsed = void 0;

  try {
    parsed = _jsYaml2.default.load(_fs2.default.readFileSync(file, 'utf8'));
  } catch (err) {
    throw err;
  }

  return parsed;
};