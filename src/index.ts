export default class Decode {
  /**
   * Convert querystring to name/values pairs. QueryString shouldn't have `?` in it
   * @param sasToken: `name=val&name2=val2`
   * @returns
   */

  public QueryStringToJSON(sasToken: string): { [key: string]: string } {
    if (!sasToken) throw Error('Input error: sasToken parameter is empty');

    const pairs = sasToken.split('&');
    if (!pairs) throw Error('Split error: no pairs found');

    const result: { [key: string]: string } = {};
    pairs.forEach(function (pair: string) {
      const pairArray: string[] = pair.split('=');
      result[pairArray[0]] = decodeURIComponent(pairArray[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  }

  public removeQueryStringDelimiter(sasToken: string): string {
    const pos = sasToken.indexOf('?');

    // Query string delimiter included in sas token string
    if (pos !== -1) {
      sasToken = sasToken.slice(pos + 1, sasToken.length);
    }

    return sasToken;
  }

  /**
   * Decodes Azure Storage SAS token
   *
   */
  public azureStorageSasToken(sasToken: string): { [key: string]: string } {
    if (!sasToken) throw Error('Input error: sasToken parameter is empty');

    // remove querystring delimiter
    sasToken = this.removeQueryStringDelimiter(sasToken);

    // break apart pairs
    const pairs: { [key: string]: string } = this.QueryStringToJSON(sasToken);

    return pairs;
  }
}
