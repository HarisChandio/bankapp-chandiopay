require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connect} = require("./db/index");
const rootRouter = require("./routes/index");
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", rootRouter);
const port = process.env.PORT ;

app.listen(port, async () => {
  await connect();
  console.log("listening on 3001");
});
