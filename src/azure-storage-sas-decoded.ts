import { BlockBlobUploadStreamOptions } from '@azure/storage-blob';

/**
 * Type of Sas token
 */
export enum SasType {
  Account = 'Account',
  Service = 'Service',
  UserDelegation = 'UserDelegation',
  Unknown = 'Unknown', // not checked yet
  Unexpected = 'Unexpected' // checked but nothing expected was found
}

export interface SasDecoded {
  sasToken: string | undefined;
  sasTokenOptions: Record<string, unknown>;
  sasType: SasType;
  results: Record<string, unknown>;
  formedCorrectly: boolean;
  error?: Error | undefined;
}

export default class AzureStorageSasDecoded {
  public static decodeSasToken = (sasTokenOptions: any): any => {
    const sasDecoded: any = {
      sasTokenOptions,
      sasType: SasType.Unknown,
      results: {},
      formedCorrectly: false
    };

    sasDecoded.results.sasType =
      AzureStorageSasDecoded.getSasType(sasTokenOptions);

    if (sasDecoded.results.sasType === SasType.Service) {
      sasDecoded.results.arePermissionsInOrder =
        AzureStorageSasDecoded.arePermissionsInOrder(sasTokenOptions.sp);
    }

    // if you get this far, sas should be considered formedCorrectly
    sasDecoded.formedCorrectly = true;

    return sasDecoded;
  };
  /**
   *  
   ss = account sas
   !ss && !sks = service sas
   !ss && sks = user sas
   * @param sas     
   * 
   * @returns 
   */
  public static getSasType(sas: Record<string, unknown>): SasType {
    if (sas?.ss) {
      return SasType.Account;
    } else if (sas?.sks) {
      return SasType.UserDelegation;
    } else {
      if (sas?.sr) {
        return SasType.Service;
      } else {
        return SasType.Unexpected;
      }
    }
  }
  public static arePermissionsInOrder(permissions: string): boolean {
    // TBD what does empty permissions mean
    if (!permissions || permissions.length === 0) return true;

    // https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas#specify-permissions
    const requiredSortOrderArray = 'racwdxltmeop'.split('');

    const sortedPermissions = permissions
      .split('')
      .sort(
        (a, b) =>
          requiredSortOrderArray.indexOf(a) - requiredSortOrderArray.indexOf(b)
      )
      .join('');

    if (permissions === sortedPermissions) return true;

    return false;
  }
}
