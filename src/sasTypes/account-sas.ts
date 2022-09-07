import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  AccountSASServices,
  AccountSASResourceTypes,
  StorageSharedKeyCredential,
  SASProtocol
} from '@azure/storage-blob';

import { AZURE_CONFIG } from '../azure-config';

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
