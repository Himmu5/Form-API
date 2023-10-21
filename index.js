const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const { UserRouter } = require("./Routes/UserRouter") 
require("dotenv").config();

app.use(express.json());
app.use(cors());

main().catch((err) => console.log(err));
main().then((s) => console.log("Db connected"));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.use("/v1/user" ,UserRouter);


app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
})