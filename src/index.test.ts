import { allowedNodeEnvironmentFlags } from 'process';
import Decode from './index';
import sasTokens from '../data/sas-tokens.json';

describe('index', () => {
  describe('token list', () => {
    test.each(sasTokens)(
      `given Id:$id - $name`,
      ({ sas, type, formedCorrectly, realToken, error }) => {
        const results: any = Decode.azureStorageSasToken(sas);

        if (type) {
          expect(results.sasType).toEqual(type);
        }

        if (results.error && typeof results.error === 'object') {
          expect(JSON.stringify(results.error)).toEqual(JSON.stringify(error));
        }
      }
    );
  });
});
