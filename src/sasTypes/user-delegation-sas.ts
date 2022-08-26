const properties = {
  sv: {
    name: 'signedVersion',
    description:
      "Indicates the version of the service that's used to construct the signature field. It also specifies the service version that handles requests that are made with this SAS."
  },
  sr: {
    name: 'signedResource',
    description:
      'Specifies which blob resources are accessible via the shared access signature.'
  },
  st: {
    name: 'signedStart',
    description:
      'Optional. The time when the shared access signature becomes valid, expressed in one of the accepted ISO 8601 UTC formats. If this value is omitted, the current UTC time is used as the start time. For more information about accepted UTC formats, see Format DateTime values.'
  },
  se: {
    name: 'signedExpiry',
    description:
      'The time when the shared access signature becomes invalid, expressed in one of the accepted ISO 8601 UTC formats. For more information about accepted UTC formats, see Format DateTime values.'
  },
  sp: {
    name: 'signedPermissions',
    description:
      'Indicates which operations that a client who possesses the SAS may perform on the resource. Permissions may be combined.'
  },
  sip: {
    name: 'signedIp',
    description:
      'Specifies an IP address or an inclusive range of IP addresses from which to accept requests.'
  },
  spr: {
    name: 'signedProtocol',
    description:
      "Specifies the protocol that's permitted for a request made with the SAS. Include this field to require that requests made with the SAS token use HTTPS."
  },
  skoid: {
    name: 'signedObjectId',
    description: 'Identifies an Azure AD security principal.'
  },
  sktid: {
    name: 'signedTenantId',
    description:
      'Specifies the Azure AD tenant in which a security principal is defined.'
  },
  skt: {
    name: 'signedKeyStartTime',
    description:
      'The value is returned by the Get User Delegation Key operation. Indicates the start of the lifetime of the user delegation key, expressed in one of the accepted ISO 8601 UTC formats. If the value omitted, the current time is assumed. For more information about accepted UTC formats, see Format DateTime values.'
  },
  ske: {
    name: 'signedKeyExpiryTime',
    description:
      'The value is returned by the Get User Delegation Key operation. Indicates the end of the lifetime of the user delegation key, expressed in one of the accepted ISO 8601 UTC formats. For more information about accepted UTC formats, see Format DateTime values.'
  },
  sks: {
    name: 'signedKeyService',
    description:
      'Indicates the service for which the user delegation key is valid. Currently, only Blob Storage is supported.'
  },
  saoid: {
    name: 'signedAuthorizedObjectId',
    description:
      "Specifies the object ID for an Azure AD security principal that's authorized by the owner of the user delegation key to perform the action granted by the SAS token. No additional permission check on Portable Operating System Interface (POSIX) access control lists (ACLs) is performed."
  },
  suoid: {
    name: 'signedUnauthorizedObjectId',
    description:
      'Specifies the object ID for an Azure AD security principal when a hierarchical namespace is enabled. Azure Storage performs a POSIX ACL check against the object ID before it authorizes the operation.'
  },
  scid: {
    name: 'signedCorrelationId',
    description:
      'Correlate the storage audit logs with the audit logs that are used by the principal that generates and distributes the SAS.'
  },
  sdd: {
    name: 'signedDirectoryDepth',
    description:
      'Indicates the number of directories within the root folder of the directory specified in the canonicalizedResource field of the string-to-sign.'
  },
  ses: {
    name: 'signedEncryptionScope',
    description:
      'Indicates the encryption scope to use to encrypt the request contents.'
  },
  sig: {
    name: 'signature',
    description:
      "The signature is a hash-based message authentication code (HMAC) that's computed over the string-to-sign and key by using the SHA256 algorithm, and then encoded by using Base64 encoding."
  },
  rscc: {
    name: 'Cache-Control response header',
    description:
      "Azure Storage sets the Cache-Control response header to the value that's specified on the SAS token."
  },
  rscd: {
    name: 'Content-Disposition response header',
    description:
      "Azure Storage sets the Content-Disposition response header to the value that's specified on the SAS token."
  },
  rsce: {
    name: 'Content-Encoding response header',
    description:
      "Azure Storage sets the Content-Encoding response header to the value that's specified on the SAS token."
  },
  rscl: {
    name: 'Content-Language response header',
    description:
      "Azure Storage sets the Content-Language response header to the value that's specified on the SAS token."
  },
  rsct: {
    name: 'Content-Type response header',
    description:
      "Azure Storage sets the Content-Type response header to the value that's specified on the SAS token."
  }
};
