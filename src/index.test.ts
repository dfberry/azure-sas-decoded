import { allowedNodeEnvironmentFlags } from 'process';
import Decode from './index';
import sasTokens from '../data/sas-tokens.json';

describe('index', () => {
  describe('token list', () => {
    test.each(sasTokens)(
      `given Id:$id - $name`,
      ({
        sas,
        sasType,
        formedCorrectly,
        realToken,
        sasProperties,
        areServiceSasPermissionsInOrder,
        error
      }) => {
        const results: any = Decode.azureStorageSasToken(sas);

        if (sasType) {
          expect(results.sasType).toEqual(sasType);
        }

        if (sasType === 'Service') {
          expect(results.arePermissionsInOrder).toEqual(
            areServiceSasPermissionsInOrder
          );
        }

        expect(JSON.stringify(results.sasProperties)).toEqual(JSON.stringify(sasProperties));

        if (results.error && typeof results.error === 'object') {
          expect(JSON.stringify(results.error)).toEqual(JSON.stringify(error));
        }
      }
    );
  });
});
