import chai, { expect, assert } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.chai = chai;
global.expect = expect;
global.assert = assert;
