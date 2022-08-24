const {
    generateAccountSASQueryParameters,
    AccountSASPermissions,
    AccountSASServices,
    AccountSASResourceTypes,
    StorageSharedKeyCredential,
    SASProtocol,
  } = require("@azure/storage-blob");
  
  import { AZURE_CONFIG } from "./azure-config";
  export function isInOrder(permissions:string){

    // TBD what does empty permissions mean
    if(!permissions || permissions.length===0) return true;

    // https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas#specify-permissions
    const requiredSortOrderArray = "racwdxltmeop".split("");

    const sortedPermissions = (permissions.split("").sort((a, b) => requiredSortOrderArray.indexOf(a) - requiredSortOrderArray.indexOf(b))).join("");

    if(permissions === sortedPermissions) return true;

    return false;

}
  export function listBlobContainersWithAccountToken(){

    // the permissions order matters
    // if the L appears in the list before the R, the error returned is
    // "Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.""

    const minimumRequired = {
    "name": "listBlobContainer",
    "ss": "b",                              // blob storage
    "sp":"l",                              // permissions
    "srt":"s"                              // service
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
  
  export function createAccountSasToken(encodeParameters: any) {
    const sasTokenUrl = getAccountSasToken(
      encodeParameters.ResourceName,
      encodeParameters.ResourceKey,
      encodeParameters.StorageType,
      encodeParameters.ResourceType,
      encodeParameters.AccountSasPermissions,
      encodeParameters.NowMinusMinutes,
      encodeParameters.NowPlusMinutes
    );
    console.log(`Account SAS URL:\n\n ${sasTokenUrl}`);
  }
  export async function createAccountSasTokenFromTask() {
    console.log("Account SAS token");
    const encodeParameters = {} as EncodeParametersAccountSasFromKey;
    encodeParameters.SasType = "account";
  
    // known requirements
    const taskOptions = listBlobContainersWithAccountToken();
    encodeParameters.StorageType = taskOptions.ss;
    encodeParameters.ResourceType = taskOptions.srt;
    encodeParameters.AccountSasPermissions = taskOptions.sp;
  
    // // required input
    // encodeParameters.ResourceName = await InputResourceName(
    //   AZURE_CONFIG.AZURE_STORAGE_RESOURCE_NAME as string
    // );
    // encodeParameters.ResourceKey = await InputResourceKey(
    //   AZURE_CONFIG.AZURE_STORAGE_RESOURCE_KEY as string
    // );
    // encodeParameters.NowMinusMinutes = new Date(
    //   new Date().valueOf() -
    //     (await InputStartTimeBeforeNowInMinutes()) * 60 * 1000
    // );
    // encodeParameters.NowPlusMinutes = new Date(
    //   new Date().valueOf() +
    //     (await InputExpireTimeAfterNowInMinutes()) * 60 * 1000
    // );
  
    createAccountSasToken(encodeParameters);
  }
  export async function createAccountSasTokenFromOptions() {
    const encodeParameters = {} as EncodeParametersAccountSasFromKey;
  
    // encodeParameters.ResourceName = await InputResourceName(
    //   AZURE_CONFIG.AZURE_STORAGE_RESOURCE_NAME as string
    // );
    // encodeParameters.ResourceKey = await InputResourceKey(
    //   AZURE_CONFIG.AZURE_STORAGE_RESOURCE_KEY as string
    // );
    // encodeParameters.StorageType = await InputStorageType();
    // encodeParameters.ResourceType = await InputResourceType();
    // encodeParameters.AccountSasPermissions = await InputAccountSasPermissions();
  
    // encodeParameters.NowMinusMinutes = new Date(
    //   new Date().valueOf() -
    //     (await InputStartTimeBeforeNowInMinutes()) * 60 * 1000
    // );
    // encodeParameters.NowPlusMinutes = new Date(
    //   new Date().valueOf() +
    //     (await InputExpireTimeAfterNowInMinutes()) * 60 * 1000
    // );
  
    const sasTokenUrl = getAccountSasToken(
      encodeParameters.ResourceName,
      encodeParameters.ResourceKey,
      encodeParameters.StorageType,
      encodeParameters.ResourceType,
      encodeParameters.AccountSasPermissions,
      encodeParameters.NowMinusMinutes,
      encodeParameters.NowPlusMinutes
    );
    console.log(`Account SAS URL:\n\n ${sasTokenUrl}`);
  }
  
  export const getAccountSasToken = (
    accountName: string,
    accountKey: string,
    services: string,
    resourceTypes: string,
    permissions: string,
    startsOn: Date,
    expiresOn: Date
  ) => {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey
    );
    const sasOptions = {
      services: AccountSASServices.parse(services).toString(), // blobs, tables, queues, files
      resourceTypes: AccountSASResourceTypes.parse(resourceTypes).toString(), // service, container, object
      permissions: AccountSASPermissions.parse(permissions), // permissions
      protocol: SASProtocol.Https,
      startsOn,
      expiresOn,
    };
  
    const sasToken = generateAccountSASQueryParameters(
      sasOptions,
      sharedKeyCredential
    ).toString();
  
    return `https://${accountName}.blob.core.windows.net/?${sasToken}`;
  };
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
  