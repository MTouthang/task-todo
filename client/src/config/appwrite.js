import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("http://115.99.183.81/v1") // Your API Endpoint
  .setProject("6388a609c191b6091f86"); // Your project ID

const account = new Account(client);

export default account;
