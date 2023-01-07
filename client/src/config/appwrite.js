import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(
    "https://8080-appwrite-integrationfor-3zvuaeini87.ws-us81.gitpod.io/v1"
  ) // Your API Endpoint

  // 6388a609c191b6091f86
  .setProject("63b95e14bd5df27efa0f"); // Your project ID

const account = new Account(client);

export default account;
