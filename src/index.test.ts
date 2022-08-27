import { allowedNodeEnvironmentFlags } from 'process';
import Decode from './index';

describe('index', () => {
  test('success - azureStorageSasToken returns JSON object', () => {
    let sasToken: string = 'name1=value1&name2=value2';

    // @ts-ignore
    const results: any = Decode.azureStorageSasToken(sasToken);

    expect(results.name1).toEqual(`value1`);
    expect(results.name2).toEqual(`value2`);
  });
  test('fail - azureStorageSasToken:empty sas token parameter string throws error', () => {
    let sasToken: string;
    expect.assertions(2);

    try {
      // @ts-ignore
      const result: any = Decode.azureStorageSasToken(sasToken);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Input error: sasToken parameter is empty'
      );
    }
  });
});
