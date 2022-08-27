import Strings from './utils/strings';

export default class Decode {
  /**
   * Convert querystring to name/values pairs. QueryString shouldn't have `?` in it
   * @param sasToken: `name=val&name2=val2`
   * @returns
   */

  /**
   * Decodes Azure Storage SAS token
   *
   */
  public static azureStorageSasToken(sasToken: string): { [key: string]: string } {
    if (!sasToken) throw Error('Input error: sasToken parameter is empty');

    const options = Strings.prepareSasToken(sasToken);

    return options;
  }
}
