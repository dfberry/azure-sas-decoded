import Strings from './strings';

describe('strings', () => {
  describe('prepareSasToken', () => {
    test('success - empty sas -> empty object', () => {
      expect(Strings.queryStringToJSON('')).toEqual({});
    });
  });
  describe('queryStringToJSON', () => {
    test('success - sas with`?` in string', () => {
      const sasToken = `?name1=value1&name2=value2`;
      expect.assertions(2);

      try {
        // @ts-ignore
        const results = Strings.queryStringToJSON(sasToken);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          'Input error: sasToken unexpectedly has a delimiter'
        );
      }
    });
    test('success - queryStringToJSON: sas without `?` in string', () => {
      const sasToken = `name1=value1&name2=value2`;
      const results = Strings.queryStringToJSON(sasToken);

      expect(results.name1).toEqual(`value1`);
      expect(results.name2).toEqual(`value2`);
    });
    test('success - "no matching name/value pairs', () => {
      const sasToken = `apple`;
      const results = Strings.queryStringToJSON(sasToken);

      expect(results).toEqual({});
    });
  });
  describe('removeQueryStringDelimiter', () => {
    test('success - removeQueryStringDelimiter: sas with `?` in string', () => {
      const sasToken = `?name1=value1&name2=value2`;
      const results = Strings.removeQueryStringDelimiter(sasToken);

      expect(results).toEqual(`name1=value1&name2=value2`);
      expect(results.length).toEqual(sasToken.length - 1);
    });
    test('success - removeQueryStringDelimiter: sas with `?` and domain in string', () => {
      const sasToken = `https://mydomain.com/asdf/asdf?name1=value1&name2=value2`;
      const results = Strings.removeQueryStringDelimiter(sasToken);

      expect(results).toEqual(`name1=value1&name2=value2`);
      expect(results.length).toEqual('name1=value1&name2=value2'.length);
    });
    test('success - removeQueryStringDelimiter: sas without `?` in string', () => {
      const sasToken = `name1=value1&name2=value2`;
      const results = Strings.removeQueryStringDelimiter(sasToken);

      expect(results.length).toEqual(sasToken.length);
      expect(results).toEqual(`name1=value1&name2=value2`);
    });
  });
});
