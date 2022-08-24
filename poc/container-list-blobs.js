// index.js
const { ContainerClient } = require('@azure/storage-blob');
require('dotenv').config()


async function main() {

  const sasToken = process.env.SERVICE_SASTOKEN_LISTBLOBS;

  const containerClient = new ContainerClient(sasToken);

  let i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

}

main()
  .then(() => console.log(`done`))
  .catch((ex) => console.log(ex.message));
