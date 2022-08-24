const { BlockBlobClient } = require('@azure/storage-blob');
require('dotenv').config();

const sasToken = process.env.SERVICE_SASTOKEN_DOWNLOADBLOB;

async function main() {

    const blobClient = new BlockBlobClient(sasToken);

    const randomFileName = `temp/${(0|Math.random()*9e6).toString(36)}.txt`;

    await blobClient.downloadToFile(randomFileName);
    console.log(`download success`);

}
main()
    .then(() => console.log('done'))
    .catch((ex) => console.log(ex.message));
