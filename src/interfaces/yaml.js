import yml from 'js-yaml';
import fs from 'fs';

export default (file) => {
  let parsed;

  try {
    parsed = yml.load(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw err;
  }

  return parsed;
};
