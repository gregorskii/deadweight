/* eslint import/first: 0 */

import path from 'path';

import deadweight from '../dist';
import projectConfig from './deadweight/dwt.config';

const pathsConfig = {
  runnerFile: path.join(__dirname, 'deadweight', 'runners.yml'),
  configDir: path.join(__dirname, 'deadweight', 'config'),
  taskDir: path.join(__dirname, 'deadweight', 'tasks')
};

deadweight(Object.assign({}, pathsConfig, {
  projectConfig
}));
