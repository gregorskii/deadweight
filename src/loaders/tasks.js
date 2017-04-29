/* eslint global-require: 0, import/no-dynamic-require: 0 */

import glob from 'glob';
import path from 'path';

export default (taskDir) => {
  const taskPaths = glob.sync(`${taskDir}/**/*.js`);
  const tasks = [];

  // Get all tasks, iterate over them and index them with the name and the function
  taskPaths.forEach((file) => {
    let imported = require(file);
    const name = path.parse(file).name;

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
