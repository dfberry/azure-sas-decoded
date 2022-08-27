/**
 * Type of Sas token
 */
enum SasType {
  Account,
  Service,
  UserDelegation,
  Unknown
}

type SasDecoded = {
  sasType: SasType;
  options: object | undefined;
};

type sasTokenOptions = {
  ss: string | undefined; // Services (Blob, Table, Queue, File)
  sks: string | undefined; // User-based something
};

export const decodeSasToken = (sasOptions: sasTokenOptions) => {
  // ss = account sas
  // !ss && !sks = service sas
  // !ss && sks = user sas

  const sasDecoded: SasDecoded = {
    sasType: SasType.Unknown,
    options: undefined
  };

  if (sasOptions?.ss) {
    sasDecoded.sasType = SasType.Account;
  }
  if (!sasOptions?.ss && !sasOptions?.sks) {
    sasDecoded.sasType = SasType.Service;
    //sasDecoded.options = decodeServiceTokenQueryString(sasOptions);
  } else if (sasOptions.sks) {
    sasDecoded.sasType = SasType.UserDelegation;
  }
};
