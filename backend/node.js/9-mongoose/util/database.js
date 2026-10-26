const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const password = "Atulyoyodj1%23";
let db;
async function startConnection() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://Atul9021:${password}@cluster0.vxu2k.mongodb.net/?appName=Cluster0`,
    );

    console.log("connected");
    db = client.db("shop");
    console.log(db);
  } catch (error) {
    console.log("error");
    throw error;
  }
}

function getDatabase() {
  if (db) {
    return db;
  }

  console.log("value", db);

  throw new Error("database is not found");
}

exports.getDatabase = getDatabase;
exports.startConnection = startConnection;
