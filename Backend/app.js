const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./routes/user.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/Docu_Verify", (err, db) => {
  console.log("Db connected");
  // console.log(process.env.JWT_SECRET);
});

app.use("/users", UserRoutes);

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is started on port :${port}`);
});
