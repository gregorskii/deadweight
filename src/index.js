import path from 'path';

import builder from './interfaces/cli';
import logger from './interfaces/logger';
import loadRunners from './loaders/runners';
import loadConfig from './loaders/config';
import loadTasks from './loaders/tasks';

const cwd = process.cwd();
const configDir = path.join(cwd, 'deadweight', 'config');
const taskDir = path.join(cwd, 'deadweight', 'tasks');
const runnerFile = path.join(cwd, 'deadweight', 'runners.yml');

export default (options) => {
  const runners = loadRunners(options.runnerFile || runnerFile);
  const yargs = builder([]);
  const args = yargs.argv;
  const commands = args._;
  const tasks = loadTasks(options.taskDir || taskDir);
  let run = [];

  if (!commands.length) {
    const runner = runners.default;
    run = [].concat(run, runner);
  } else {
    commands.forEach((command) => {
      const runner = runners[command];
      const task = tasks[command];

      if (runner) {
        run = [].concat(run, runner);
      } else if (task) {
        run = [].concat(run, command);
      } else {
        logger.error(`${logger.chalk.red('Runner not found:')} ${command}`);
      }
    });
  }

  const config = loadConfig(
    options.configDir || configDir, options.projectConfig || {}
  );

  run.forEach((task) => {
    const taskFn = tasks[task];
    if (taskFn) {
      taskFn(
        {
          logger
        },
        config
      )();
    }
  });

  yargs.reset();
};
