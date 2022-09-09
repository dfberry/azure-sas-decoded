import { BlockBlobUploadStreamOptions } from '@azure/storage-blob';
import {
  decodeServiceTokenQueryString,
  arePermissionsInOrder
} from './sasTypes/service-sas-decode';
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
  public static decodeSasToken = (
    sasToken: string,
    sasTokenOptions: any
  ): any => {
    const sasDecoded: any = {
      sasTokenOptions,
      sasType: SasType.Unknown,
      results: {},
      formedCorrectly: false
    };

    // Get Sas Type
    const sasType = AzureStorageSasDecoded.getSasType(sasTokenOptions);

    let arePermissionsInOrderResult = null;

    // Get information based on SAS type
    if (sasType === SasType.Service) {
      arePermissionsInOrderResult = arePermissionsInOrder(sasTokenOptions.sp);
    }

    const sasProperties = decodeServiceTokenQueryString(sasTokenOptions);

    // if you get this far, sas should be considered formedCorrectly
    const formedCorrectly = true;

    return {
      sasType,
      arePermissionsInOrder: arePermissionsInOrderResult,
      sasProperties,
      formedCorrectly
    };
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
}
