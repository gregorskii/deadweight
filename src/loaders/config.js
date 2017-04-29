/* eslint global-require: 0, import/no-dynamic-require: 0 */

import glob from 'glob';

export default (configDir, projectConfig) => {
  const configs = glob.sync(`${configDir}/**/*.js`);
  const config = {};

  configs.forEach((file) => {
    const name = /.+\/(.+)\.(js)/i.test(file) && RegExp.$1;

    // Ensure the task name can be found
    if (name) {
      // Load it
      let imported = require(file);

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
};
