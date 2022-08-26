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
  ss: string | undefined;  // Services (Blob, Table, Queue, File)
  sks: string | undefined; // User-based something 
};

const decodeSasOptions = (sasOptions: sasTokenOptions) => {
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

export const decodeSasToken = (sasToken: string) => {
  const sas: any = {
    resourceName: undefined,
    options: undefined
  };

  // split URL
  // split query string
  const myURL = new URL(sasToken);

  console.log(myURL.toJSON());

  const resourceName = myURL?.host?.split('.')[0] || '';

  // query string
  const querystringObject = queryString.parse(myURL?.search);
  const results = decodeSasOptions(querystringObject);

  // @ts-ignore
  sas.resourceName = resourceName;
  sas.options = results;

  // TBD: container name
  // TBD: directory name
  // TBD: file name

  return sas;
};
