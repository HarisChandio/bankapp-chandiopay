require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connect} = require("./db/index");
const rootRouter = require("./routes/index");
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", rootRouter);

app.listen(3001, async () => {
  await connect();
  console.log("listening on 3000");
});
