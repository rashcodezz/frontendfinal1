const express = require("express");
const app = express();
const taskRoute = require("./routes/task.route");

require("dotenv").config();
const PORT = process.env.PORT || 9005;
const cors = require("cors");
const connectDB = require("./db");
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", taskRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
