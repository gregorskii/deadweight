process.env.NODE_ENV = 'test';

const path = require('path');

module.exports = (wallaby) => {
  process.env.NODE_PATH += path.delimiter +
    path.join(wallaby.projectCacheDir, 'src') +
    path.delimiter +
    path.join(wallaby.projectCacheDir
  );

  return {
    debug: true,
    testFramework: 'mocha',
    files: [
      'src/**/*.js',
      'src/**/*.json',
      'test/unit/spec/helpers/**/*.js?(x)',
      '!src/**/*-spec.js'
    ],
    tests: [
      'src/**/*-spec.js'
    ],
    env: {
      type: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    setup: () => {
      // eslint-disable-next-line global-require
      require('./test/unit/spec/helpers');
    }
  };
};
