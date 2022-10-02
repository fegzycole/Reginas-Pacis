import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

let dbConnection;

/**
 * Connect to the MongoDB client
 * @param {*} cb callback to be fired either on error or on success
 * @returns the passed callback
 */
export const connectToDb = async (cb) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    dbConnection = client.db();
    return cb();
  } catch (error) {
    console.error(
      "Couldn't connect to the internet, please check your internet and confirm that you are using the correct mongo url"
    );
    return cb(error);
  }
};

/**
 * Gets the Database
 * @returns
 */
export const getDb = () => dbConnection;
