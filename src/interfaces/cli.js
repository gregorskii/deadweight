import yargs from 'yargs';

export default (modules) => {
  const builder = yargs.describe('Deadweight')
    .usage('Usage: $0 <command> [options]')
    .help('h')
    .alias('h', 'help');

  modules.forEach(module => builder.command(module);

  return builder;
};
