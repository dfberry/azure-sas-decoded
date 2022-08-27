import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  AccountSASServices,
  AccountSASResourceTypes,
  StorageSharedKeyCredential,
  SASProtocol
} from '@azure/storage-blob';

import { AZURE_CONFIG } from './azure-config';
export function isInOrder(permissions: string) {
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
export function listBlobContainersWithAccountToken() {
  // the permissions order matters
  // if the L appears in the list before the R, the error returned is
  // "Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.""

  const minimumRequired = {
    name: 'listBlobContainer',
    ss: 'b', // blob storage
    sp: 'l', // permissions
    srt: 's' // service
  };

  return minimumRequired;
}

interface EncodeParametersAccountSasFromKey {
  SasType: string;
  ResourceName: string;
  ResourceKey: string;
  ResourceType: string;
  StorageType: string;
  AccountSasPermissions: string;
  NowMinusMinutes: Date;
  NowPlusMinutes: Date;
}

export const decodeAccountSasToken = (sasToken: string) => {
  // const sasOptionsDecoded: any = {

  //     sr: { name: "Resource Type", value: sasOptions?.sr || undefined},
  //     srt: { name: "Resource Type", value: sasOptions?.srt || undefined},

  //     sp: { name: "Permissions", value: AccountSASPermissions.parse(sasOptions?.sp || "")},

  //     st: { name: "Time when token starts", value: sasOptions?.st || undefined },
  //     se: { name: "Time when token expires", value: sasOptions?.se || undefined },
  //     sv: { name: "Version", value: sasOptions?.sv || undefined},
  //     sig: { name: "Signature", value: sasOptions?.sig || undefined },
  //     spr: { name: "Required request protocol", value: sasOptions?.spr || undefined },

  //     skoid: { name: "User-delegation", value: sasOptions?.skoid || undefined }

  // };
  return sasToken;
};
