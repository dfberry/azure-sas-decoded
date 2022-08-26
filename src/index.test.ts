import { allowedNodeEnvironmentFlags } from 'process';
import Decode from './index';

describe('index', () => {
  test('azureStorageSasToken:empty sas token parameter string fails', () => {
    const decode = new Decode();
    let sasToken: string;
    expect.assertions(2);

    try {
      // @ts-ignore
      decode.azureStorageSasToken(sasToken);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Input error: sasToken parameter is empty'
      );
    }
  });
  test('QueryStringToJSON: sas without `?` in string', () => {
    const decode = new Decode();
    const sasToken = `name1=value1&name2=value2`;
    const results = decode.QueryStringToJSON(sasToken);

    expect(results.name1).toEqual(`value1`);
    expect(results.name2).toEqual(`value2`);
  });
  test('removeQueryStringDelimiter: sas with `?` in string', () => {
    const decode = new Decode();
    const sasToken = `?name1=value1&name2=value2`;
    const results = decode.removeQueryStringDelimiter(sasToken);

    expect(results).toEqual(`name1=value1&name2=value2`);
    expect(results.length).toEqual(sasToken.length - 1);
  });
  test('removeQueryStringDelimiter: sas with domain and `?` in string', () => {
    const decode = new Decode();
    const sasToken = `https://mydomain.com/asdf/asdf?name1=value1&name2=value2`;
    const results = decode.removeQueryStringDelimiter(sasToken);

    expect(results).toEqual(`name1=value1&name2=value2`);
    expect(results.length).toEqual('name1=value1&name2=value2'.length);
  });
  test('removeQueryStringDelimiter: sas without `?` in string', () => {
    const decode = new Decode();
    const sasToken = `name1=value1&name2=value2`;
    const results = decode.removeQueryStringDelimiter(sasToken);

    expect(results.length).toEqual(sasToken.length);
    expect(results).toEqual(`name1=value1&name2=value2`);
  });
});
