/*

https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas

A service SAS can't grant access to certain operations:

Containers, queues, and tables can't be created, deleted, or listed.
Container metadata and properties can't be read or written.
Queues can't be cleared, and their metadata can't be written.
Containers can't be leased.

To construct a SAS that grants access to these operations, use an account SAS. For more information, see Create an account SAS.

When you construct the SAS, you must include permissions in the following order:

racwdxltmeop
*/
import {
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  BlobSASPermissions,
  StorageSharedKeyCredential,
  SASProtocol
} from '@azure/storage-blob';

import { debug } from 'console';
import { decode } from 'punycode';
import { AZURE_CONFIG } from '../azure-config';
import { isGeneratorFunction } from 'util/types';

import {
  resource,
  serviceSasBasicProperties,
  accessPolicyProperties,
  blobStorageAndAzureFileResponseHeaderOverrideParameters,
  blobStorageServiceContainerPermissions,
  blobStorageServiceBlobPermissions,
  blobStoragePermissions,
  blobStorageSignedResourceProperties
} from './service-sas-types';

interface EncodeParametersServiceSasFromKey {
  SasType: string;
  ResourceName: string;
  ResourceKey: string;
  StorageType: string;
  ContainerName: string;
  BlobName?: string;
  ServiceSasPermissions: string;
  NowMinusMinutes: Date;
  NowPlusMinutes: Date;
}

export async function createServiceSasTokenFromOptions() {
  const encodeParameters = {} as EncodeParametersServiceSasFromKey;

  // // select 1 service only
  // encodeParameters.StorageType = await InputStorageType();

  // encodeParameters.ResourceName = await InputResourceName(
  //   AZURE_CONFIG.AZURE_STORAGE_RESOURCE_NAME as string
  // );
  // encodeParameters.ResourceKey = await InputResourceKey(
  //   AZURE_CONFIG.AZURE_STORAGE_RESOURCE_KEY as string
  // );

  // encodeParameters.ContainerName = await InputContainerName();
  // encodeParameters.BlobName = await InputBlobName();

  // if (!encodeParameters.BlobName) {
  //   // account key - container only
  //   encodeParameters.ServiceSasPermissions = await InputServiceSasPermissions(
  //     "container permissions", blobStorageServiceContainerPermissions
  //   );
  // } else {
  //   // account key - blob only
  //   encodeParameters.ServiceSasPermissions = await InputServiceSasPermissions(
  //     "blob permissions", blobStorageServiceBlobPermissions
  //   );
  // }

  // encodeParameters.NowMinusMinutes = new Date(
  //   new Date().valueOf() -
  //     (await InputStartTimeBeforeNowInMinutes()) * 60 * 1000
  // );
  // encodeParameters.NowPlusMinutes = new Date(
  //   new Date().valueOf() +
  //     (await InputExpireTimeAfterNowInMinutes()) * 60 * 1000
  // );

  const sasTokenUrl = getServiceSasToken(
    encodeParameters.ResourceName,
    encodeParameters.ResourceKey,
    encodeParameters.ContainerName,
    encodeParameters.ServiceSasPermissions,
    encodeParameters.NowMinusMinutes,
    encodeParameters.NowPlusMinutes,
    encodeParameters.BlobName
  );
}

export function getServiceSasToken(
  accountName: string,
  accountKey: string,
  containerName: string,
  permissions: string,
  startsOn: Date,
  expiresOn: Date,
  blobName?: string
) {
  try {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey
    );

    const sasOptions: any = {
      containerName,
      permissions: undefined,
      protocol: SASProtocol.Https,
      startsOn,
      expiresOn
    };

    // only set blob name if it is set in the input
    if (blobName) {
      sasOptions.blobName = blobName;
      (sasOptions.permissions = BlobSASPermissions.parse(permissions)),
        console.log(
          `Scoped to blob named '${blobName}' permissions: ${sasOptions.permissions}\n`
        );
    } else {
      (sasOptions.permissions = ContainerSASPermissions.parse(permissions)), // permissions
        console.log(
          `Scoped to container named '${containerName}' permissions: ${sasOptions.permissions}\n`
        );
    }

    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      sharedKeyCredential
    ).toString();

    if (blobName) {
      return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
    } else {
      return `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;
    }
  } catch (err: any) {
    console.log(`generateBlobSASQueryParameters ${err.message}`);
  }
}

// signed resource
// if(incomingKeys.includes("sr")){
//     // @ts-ignore
//     const incomingResourcs = Object.keys(incomingKeys?.sr)
//     sasServiceOptionsDecoded = { ...sasServiceOptionsDecoded, ...decodeProperties(incomingKeys, incomingResourcs)}
//     console.log("signed resource");
// }

// return sasServiceOptionsDecoded;
