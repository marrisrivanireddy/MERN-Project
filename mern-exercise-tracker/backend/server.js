const express = require("express");

//const bodyParser = require("body-parser");

const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//****middleware****
app.use(cors()); //(to take the frontend data)
//app.use(bodyParser.json());
app.use(express.json());

//****database connection****

const uri = process.env.ATLAS_URI; //process.env.ATLAS_URI
//mongoose.connect(uri, { userNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
  .connect(uri)
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.error(err));

//mongoose.connect(uri, { userNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

//****importing the routes****
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

//using the imported files
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
