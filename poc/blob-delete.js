const { BlockBlobClient } = require('@azure/storage-blob');
require('dotenv').config();

const sasToken = process.env.SASTOKEN_DELETEBLOB;

async function main() {

    const blobClient = new BlockBlobClient(sasToken);

    await blobClient.delete();
    console.log(`download shouldn't succeed`);

}
main()
    .then(() => console.log('done'))
    .catch((ex) => console.log(ex.message));
