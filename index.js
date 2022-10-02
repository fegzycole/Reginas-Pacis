import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";

import routes from "./routes/index.js";
import { connectToDb, getDb } from "./db/index.js";

config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", routes);

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`App Running on port ${PORT}`);
    });

    db = getDb();
  }
});

export let db;
