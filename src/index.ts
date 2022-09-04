import Strings from './utils/strings';
import AzureStorage, { SasDecoded } from './azure-storage-sas-decoded';

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
  public static azureStorageSasToken(sasToken: string): any {
    const returnResults: any = {
      sasToken,
      options: undefined,
      optionsDecoded: undefined,
      sasType: undefined,
      formedCorrectly: false,
      successfulDecode: false,
      error: {
        message: ''
      }
    };

    try {
      if (!sasToken) throw Error('Input error: sasToken parameter is empty');

      returnResults.options = Strings.prepareSasToken(sasToken);
      const { sasTokenOptions, sasType, results, formedCorrectly } =
        AzureStorage.decodeSasToken(returnResults.options);

      returnResults.sasType = sasType;
      returnResults.formedCorrectly = formedCorrectly;

      return results;
    } catch (error: any) {
      returnResults.error.message = error?.message;
      return returnResults;
    }
  }
}
