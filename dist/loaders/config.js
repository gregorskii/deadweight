'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (configDir, projectConfig) {
  var configs = _glob2.default.sync(configDir + '/**/*.js');
  var config = {};

  configs.forEach(function (file) {
    var name = /.+\/(.+)\.(js)/i.test(file) && RegExp.$1;

    // Ensure the task name can be found
    if (name) {
      // Load it
      var imported = require(file);

      if (Object.hasOwnProperty.call(imported, 'default')) {
        imported = imported.default;
      }

      // If the export is a function pass it the current projectConfig
      if (typeof imported === 'function') {
        config[name] = imported(projectConfig);
      } else {
        config[name] = imported;
      }
    }
  });

  // Merge the config into the `projectConfig`
  return Object.assign({}, config, projectConfig);
}; /* eslint global-require: 0, import/no-dynamic-require: 0 */