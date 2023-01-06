const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

dotenv.config();

app.use(
  cors({ origin: "http://localhost:3000/" })
  // function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // }
);
app.use(express.json());
app.use(cookieParser());
var port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://manu:test123@diet.qkfbq.mongodb.net/greendeck";
mongoose
  .connect(process.env.MONGODB_URI || uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  })
  .then(console.log("connected"));

const user = require("./routes/user-routes");
app.use("/api/user", user);

// app.use(express.static(path.join(__dirname,'./client/build')))
// app.get('*', function (req, res) {
//   const index = path.join(__dirname, './client/build', 'index.html');
//   res.sendFile(index);
// });

app.listen(5000, (res, req) => {
  console.log("connecting.....");
});
