import 'mocha';
import { assert } from 'chai';

import { AWSSQSSendMessage } from '../src/index';

describe('AWSSQSSendMessage Class', () => {
    it('should have a getInstance init method', () => {
        assert.isFunction(AWSSQSSendMessage.getInstance);
    });
});