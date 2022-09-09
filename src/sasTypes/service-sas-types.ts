import {
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  BlobSASPermissions,
  StorageSharedKeyCredential,
  SASProtocol
} from '@azure/storage-blob';

//signedResource (sr)
// TBD: not sure how to fetch bs and bv from concatenated string versus b
export const resource = {
  c: {
    name: 'Container',
    description:
      'Grants access to the content and metadata of any blob in the container, and to the list of blobs in the container.'
  },
  b: {
    name: 'Blob',
    description: 'Grants access to the content and metadata of the blob.'
  },
  d: {
    name: 'Directory',
    description:
      'Grants access to the content and metadata of any blob in the directory, and to the list of blobs in the directory, in a storage account with a hierarchical namespace enabled. If a directory is specified for the signedResource field, the signedDirectoryDepth (sdd) parameter is also required. A directory is always nested within a container.'
  },
  bs: {
    name: 'Blob snapshot',
    description:
      'Grants access to the content and metadata of the blob snapshot, but not the base blob.'
  },
  bv: {
    name: 'Blob version',
    description:
      'Grants access to the content and metadata of the blob version, but not the base blob.'
  }
};

export const serviceSasBasicProperties = {
  sv: {
    name: 'signedVersion',
    description:
      "Indicates the version of the service that's used to construct the signature field. It also specifies the service version that handles requests that are made with this SAS."
  },
  sr: {
    name: 'signedResource',
    description:
      'Blob Storage only - The required signedResource (sr) field specifies which resources are accessible via the shared access signature. The following table describes how to refer to a blob or container resource in the SAS token.'
  },
  sip: {
    name: 'signedIp',
    description:
      "The optional signedIp (sip) field specifies an IP address or a range of IP addresses from which to accept requests. If the IP address from which the request originates doesn't match the IP address or address range that's specified on the SAS token, the request isn't authorized. When you're specifying a range of IP addresses, note that the range is inclusive. For example, specifying sip=168.1.5.65 or sip=168.1.5.60-168.1.5.70 on the SAS restricts the request to those IP addresses."
  },
  spr: {
    name: 'signedProtocol',
    description:
      "The optional signedProtocol (spr) field specifies the protocol that's permitted for a request made with the SAS. Possible values are both HTTPS and HTTP (https,http) or HTTPS only (https). The default value is https,http. Note that HTTP only isn't a permitted value."
  },
  si: {
    name: 'signedIdentifier',
    description:
      'When you specify the signedIdentifier field on the URI, you relate the specified shared access signature to a corresponding stored access policy. A stored access policy provides an additional measure of control over one or more shared access signatures, including the ability to revoke the signature if needed. Each container, queue, table, or share can have up to five stored access policies.',
    rules: [
      { name: '!exist', consequence: 'ad hoc SAS' },
      { name: 'exist', consequence: 'SAS with stored access policy' }
    ]
  },
  ses: {
    name: 'signedEncryptionScope',
    description:
      'Optional. Indicates the encryption scope to use to encrypt the request contents.'
  },
  sig: {
    name: 'signature',
    description:
      "The string-to-sign is a unique string that's constructed from the fields and that must be verified to authorize the request. The signature is a hash-based message authentication code (HMAC) that you compute over the string-to-sign and key by using the SHA256 algorithm, and then encode by using Base64 encoding."
  }
};

export const accessPolicyProperties = {
  st: {
    name: 'signedStart',
    description:
      "Optional. The time when the shared access signature becomes valid, expressed in one of the accepted ISO 8601 UTC formats. If this parameter is omitted, the current UTC time is used as the start time. In versions that are earlier than 2012-02-12, the duration between signedStart and signedExpiry can't exceed one hour unless a container policy is used. For more information about accepted UTC formats, see Format date/time values."
  },
  se: {
    name: 'signedExpiry',
    description:
      'Required. The time when the shared access signature becomes invalid, expressed in one of the accepted ISO 8601 UTC formats. You must omit this field if it has been specified in an associated stored access policy. For more information about accepted UTC formats, see Format date/time values.'
  },
  sp: {
    name: 'signedPermissions',
    description:
      'Required. The permissions that are associated with the shared access signature. The user is restricted to operations that are allowed by the permissions. You must omit this field if it has been specified in an associated stored access policy.'
  },
  spk: {
    name: 'startPk',
    description: 'Table Storage only. Start partition key.'
  },
  srk: {
    name: 'startRk',
    description:
      "Optional, start partition key.  StartPk must accompany startRk. The minimum partition and row keys that are accessible with this shared access signature. Key values are inclusive. If they're omitted, there's no lower bound on the table entities that can be accessed."
  },
  epk: { name: 'endPk', description: 'Table Storage only. End partition key.' },
  erk: {
    name: 'endRk',
    description:
      "Optional. End row key. EndPk must accompany endRk. The maximum partition and row keys that are accessible with this shared access signature. Key values are inclusive. If they're omitted, there's no upper bound on the table entities that can be accessed."
  }
};
export const blobStorageAndAzureFileResponseHeaderOverrideParameters = {
  rscc: { name: 'Cache-Control' },
  rscd: { name: 'Content-Disposition' },
  rsce: { name: 'Content-Encoding' },
  rscl: { name: 'Content-Language' },
  rsct: { name: 'Content-Type' }
};

export const blobStorageServiceContainerPermissions = [
  {
    name: 'Read',
    value: 'r',
    description:
      'Read the content, blocklist, properties, and metadata of any blob in the container or directory. Use a blob as the source of a copy operation.',
    resource: 'cdb'
  },
  {
    name: 'Add',
    value: 'a',
    description: 'Add a block to an append blob.',
    resource: 'cdb'
  },
  {
    name: 'Create',
    value: 'c',
    description:
      'Write a new blob, snapshot a blob, or copy a blob to a new blob.',
    resource: 'cdb'
  },
  {
    name: 'Write',
    value: 'w',
    description:
      'Create or write content, properties, metadata, or blocklist. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation.',
    resource: 'cdb'
  },
  {
    name: 'Delete',
    value: 'd',
    description:
      'Delete a blob. For version 2017-07-29 and later, the Delete permission also allows breaking a lease on a blob. For more information, see the Lease Blob operation.',
    resource: 'cdb'
  },
  {
    name: 'List',
    value: 'l',
    resource: 'cd',
    description: 'List blobs non-recursively.'
  },
  {
    name: 'Set Immutability Policy',
    value: 'i',
    description:
      'Set or delete the immutability policy or legal hold on a blob.',
    resource: 'cb'
  }
];

export const blobStorageServiceBlobPermissions = [
  {
    name: 'Read',
    value: 'r',
    description:
      'Read the content, blocklist, properties, and metadata of any blob in the container or directory. Use a blob as the source of a copy operation.',
    resource: 'cdb'
  },
  {
    name: 'Add',
    value: 'a',
    description: 'Add a block to an append blob.',
    resource: 'cdb'
  },
  {
    name: 'Create',
    value: 'c',
    description:
      'Write a new blob, snapshot a blob, or copy a blob to a new blob.',
    resource: 'cdb'
  },
  {
    name: 'Write',
    value: 'w',
    description:
      'Create or write content, properties, metadata, or blocklist. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation.',
    resource: 'cdb'
  },
  {
    name: 'Delete',
    value: 'd',
    description:
      'Delete a blob. For version 2017-07-29 and later, the Delete permission also allows breaking a lease on a blob. For more information, see the Lease Blob operation.',
    resource: 'cdb'
  },
  {
    name: 'Permanent delete',
    value: 'y',
    resource: 'b',
    description: 'Permanently delete a blob snapshot or version.'
  },
  {
    name: 'tags',
    value: 't',
    resource: 'b',
    description: 'Read or write the tags on a blob.'
  },
  {
    name: 'Set Immutability Policy',
    value: 'i',
    description:
      'Set or delete the immutability policy or legal hold on a blob.',
    resource: 'cb'
  }
];

export const blobStoragePermissions = {
  r: {
    name: 'read',
    resource: 'cdb',
    description:
      'Read the content, blocklist, properties, and metadata of any blob in the container or directory. Use a blob as the source of a copy operation.'
  },
  a: {
    name: 'add',
    resource: 'cdb',
    description: 'Add a block to an append blob.'
  },
  c: {
    name: 'create',
    resource: 'cdb',
    description:
      'Write a new blob, snapshot a blob, or copy a blob to a new blob.'
  },
  w: {
    name: 'write',
    resource: 'cdb',
    description:
      'Create or write content, properties, metadata, or blocklist. Snapshot or lease the blob. Resize the blob (page blob only). Use the blob as the destination of a copy operation.'
  },
  d: {
    name: 'delete',
    resource: 'cdb',
    description:
      'Delete a blob. For version 2017-07-29 and later, the Delete permission also allows breaking a lease on a blob. For more information, see the Lease Blob operation.'
  },
  x: {
    name: 'delete version',
    resource: 'cb',
    description: 'Delete a blob version.'
  },
  y: {
    name: 'permanent delete',
    resource: 'b',
    description: 'Permanently delete a blob snapshot or version.'
  },
  l: {
    name: 'list',
    resource: 'cd',
    description: 'List blobs non-recursively.'
  },
  t: {
    name: 'tags',
    resource: 'b',
    description: 'Read or write the tags on a blob.'
  },
  f: {
    name: 'find',
    resource: 'c',
    description: 'Find blobs with index tags.'
  },
  m: {
    name: 'move',
    resource: 'cdb',
    description:
      'Move a blob or a directory and its contents to a new location. This operation can optionally be restricted to the owner of the child blob, directory, or parent directory if the saoid parameter is included on the SAS token and the sticky bit is set on the parent directory.'
  },
  e: {
    name: 'execute',
    resource: 'cdb',
    description:
      "Get the system properties and, if the hierarchical namespace is enabled for the storage account, get the POSIX ACL of a blob. If the hierarchical namespace is enabled and the caller is the owner of a blob, this permission grants the ability to set the owning group, POSIX permissions, and POSIX ACL of the blob. doesn't permit the caller to read user-defined metadata."
  },
  o: {
    name: 'ownership',
    resource: 'cbd',
    description:
      'When the hierarchical namespace is enabled, this permission enables the caller to set the owner or the owning group, or to act as the owner when renaming or deleting a directory or blob within a directory that has the sticky bit set.'
  },
  p: {
    name: 'permissions',
    resource: 'cdb',
    description:
      'When the hierarchical namespace is enabled, this permission allows the caller to set permissions and POSIX ACLs on directories and blobs.'
  },
  i: {
    name: 'set immutability policy',
    resource: 'cb',
    description:
      'Set or delete the immutability policy or legal hold on a blob.'
  }
};

// Blob Storage only - "sr" - field
export const blobStorageSignedResourceProperties = {
  b: {
    name: 'blob',
    description: 'Grants access to the content and metadata of the blob.'
  },
  bv: {
    name: 'blobVersion',
    description:
      'Grants access to the content and metadata of the blob version, but not the base blob.'
  },
  bs: {
    name: 'blobSnapshot',
    description:
      'Grants access to the content and metadata of the blob snapshot, but not the base blob.'
  },
  c: {
    name: 'container',
    description:
      'Grants access to the content and metadata of any blob in the container, and to the list of blobs in the container.'
  },
  d: {
    name: 'directory',
    description:
      'Grants access to the content and metadata of any blob in the directory, and to the list of blobs in the directory, in a storage account with a hierarchical namespace enabled. If a directory is specified for the signedResource field, the signedDirectoryDepth (sdd) parameter is also required. A directory is always nested within a container.'
  }
};
