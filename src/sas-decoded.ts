
const queryString = require('query-string');
//const { AccountSASPermissions} = require('@azure/storage-blob');
const { decodeServiceTokenQueryString } = require("./service-sas");

type SasDecoded = {
    name: string | undefined,
    options: object | undefined,
};

const decodeSasOptions = (sasOptions: any) =>{

    // ss = account sas
    // !ss && !sks = service sas
    // !ss && sks = user sas

    const sasDecoded:SasDecoded =  {
        name: undefined,
        options: undefined
    };

    if(sasOptions?.ss){
        console.log("found Account SAS");
    }
    if(!sasOptions?.ss && !sasOptions?.sks){
        sasDecoded.name= "Service SAS";
        sasDecoded.options = decodeServiceTokenQueryString(sasOptions);
        console.log("found Service SAS")
        return sasDecoded;
    } else if (sasOptions.sks){
        console.log("found User-delegation SAS");
    }

} 

export const decodeSasToken = (
    sasToken: string
    ) => {

        const sas: any = {
            resourceName: undefined,
            options: undefined
        };

        // split URL
        // split query string
        const myURL = new URL(sasToken);

        console.log(myURL.toJSON());

        const resourceName = myURL?.host?.split(".")[0] || "";

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

}