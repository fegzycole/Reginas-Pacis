import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";

import routes from "./routes";

config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});
