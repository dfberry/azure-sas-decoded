// index.js
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

// account sas only

async function main() {
  const accountSasToken = process.env.ACCOUNT_SASTOKEN_LISTCONTAINERS;

  const blobServiceClient = new BlobServiceClient(accountSasToken);

  // ... do something with container
  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }
}

main()
  .then(() => console.log(`done`))
  .catch((ex) => console.log(ex.message));
