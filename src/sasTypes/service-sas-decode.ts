import {
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  BlobSASPermissions,
  StorageSharedKeyCredential,
  SASProtocol
} from '@azure/storage-blob';

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

// if known basic properties match incoming properties,
// return basic property content
function decodeProperties(sasTokenKeys: string[], serviceProperties: any) {
  const foundProperties: any = {};

  if (sasTokenKeys.length === 0) return {};

  // basic property names
  const servicePropertyKeys = Object.keys(serviceProperties);

  for (let i = 0; i < servicePropertyKeys.length - 1; i++) {
    // get element name
    const elementName = servicePropertyKeys[i];

    // found match
    if (sasTokenKeys.includes(elementName)) {
      foundProperties[elementName] = serviceProperties[elementName];
    }
  }
  return foundProperties;
}

export function decodeServiceTokenQueryString(sasToken: any) {
  let sasServiceOptionsDecoded: any = {};

  const incomingKeys: string[] = Object.keys(sasToken);
  if (incomingKeys.length === 0) {
    return {};
  }

  // basic permissions
  sasServiceOptionsDecoded = {
    ...decodeProperties(incomingKeys, serviceSasBasicProperties)
  };

  // access policy
  sasServiceOptionsDecoded = {
    ...sasServiceOptionsDecoded,
    ...decodeProperties(incomingKeys, accessPolicyProperties)
  };

  // headers
  sasServiceOptionsDecoded = {
    ...sasServiceOptionsDecoded,
    ...decodeProperties(
      incomingKeys,
      blobStorageAndAzureFileResponseHeaderOverrideParameters
    )
  };

  // signed permissions
  if (incomingKeys.includes('sp')) {
    const incomingPermissions = sasToken?.sp?.split('');
    if (incomingPermissions) {
      sasServiceOptionsDecoded.sp.permissions = decodeProperties(
        incomingPermissions,
        blobStoragePermissions
      );
    }
  }
  // signed resource
  if (incomingKeys.includes('sr')) {
    const incomingResource = sasToken?.sr?.split('');
    if (incomingResource) {
      sasServiceOptionsDecoded.sr.resources = decodeProperties(
        incomingResource,
        resource
      );
    }
  }
  return sasServiceOptionsDecoded;
}

export function arePermissionsInOrder(permissions: string): boolean {
  // TBD what does empty permissions mean
  if (!permissions || permissions.length === 0) return true;

  // https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas#specify-permissions
  const requiredSortOrderArray = 'racwdxltmeopi'.split('');

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
