import { MongoClient } from "mongodb";
import { log } from "console";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "users";

let data;

try {
  await client.connect();
  log("Connection sucessfuly to server");
  data = client.db(dbName);
} catch (err) {
  log("Error:", err);
}

export default data;
