import { Client as Appwrite, Account } from "appwrite";

const APPWRITE_URL = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "6697687d002cbd31ba6b";

const client = new Appwrite();

client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(client);

client.headers = {
  ...client.headers,
  "Accept-Encoding": "identity",
};

export { client, account };
