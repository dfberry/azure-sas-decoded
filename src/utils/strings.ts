export default class Strings {
  public static prepareSasToken(sasToken: string): { [key: string]: string } {
    if (!sasToken || sasToken.length === 0) return {};

    // remove querystring delimiter
    sasToken = Strings.removeQueryStringDelimiter(sasToken);

    // break apart pairs
    const pairs: { [key: string]: string } =
      Strings.queryStringToJSON(sasToken);

    return pairs;
  }

  public static queryStringToJSON(sasToken: string): {
    [key: string]: string;
  } {
    if (!sasToken || sasToken.length === 0) return {};
    if (sasToken.includes('?'))
      throw Error('Input error: sasToken unexpectedly has a delimiter');

    const pairs = sasToken.split('&');
    if (!pairs || pairs.length < 2) return {};

    const result: { [key: string]: string } = {};
    pairs.forEach(function (pair: string) {
      const pairArray: string[] = pair.split('=');
      result[pairArray[0]] = decodeURIComponent(pairArray[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  }

  public static removeQueryStringDelimiter(sasToken: string): string {
    if (!sasToken || sasToken.length === 0) return sasToken;

    const pos = sasToken.indexOf('?');

    // Query string delimiter included in sas token string
    if (pos !== -1) {
      sasToken = sasToken.slice(pos + 1, sasToken.length);
    }

    return sasToken;
  }
}
