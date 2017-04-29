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

const load = (options) => {
  const r = options.runnerFile || runnerFile;
  const t = options.taskDir || taskDir;
  const c = options.configDir || configDir;
  const p = options.projectConfig || {};

  const runners = loadRunners(r);
  const tasks = loadTasks(t);
  const config = loadConfig(c, p);

  return { runners, config, tasks };
};

const getRun = (runners, commands, tasks) => {
  let run;

  if (!commands.length) {
    run = runners.default;
  } else {
    run = commands
      .map((command) => {
        if (runners[command]) return runners[command];
        if (tasks[command]) return command;

        logger.error(
          `${logger.chalk.red('Runner or task not found:')} ${command}`
        );

        return undefined;
      })
      .filter(command => command)
    ;
  }

  return run;
};

export default (options) => {
  // TODO: this will be an attempt to let the user hook into the CLI
  const yargs = builder([]);
  const args = yargs.argv;
  const commands = args._;
  const { runners, config, tasks } = load(options);
  const run = getRun(runners, commands, tasks);

  if (run.length) {
    [].concat(...run)
      .forEach((task) => {
        const taskFn = tasks[task];
        if (taskFn) {
          taskFn({ logger }, config)();
        }
        // TODO: else log
      });
  }

  yargs.reset();
};
