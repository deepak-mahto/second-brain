import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import mainRouter from "./routes";
import cors from "cors";

const port = process.env.PORT;
const dbConnString = process.env.DB_CONN_STRING;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

const main = async () => {
  try {
    await mongoose.connect(dbConnString as string);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error on connection to MongoDB");
  }
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
};

main();
