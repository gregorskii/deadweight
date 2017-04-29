import bunyan from 'bunyan';
import bformat from 'bunyan-format';
import chalk from 'chalk';

const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({
  name: 'Deadweight',
  stream: formatOut
});

log.chalk = chalk;

export default log;
