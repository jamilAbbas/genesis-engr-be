const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require("cors");

require("dotenv").config();
const app = express();
const port = 5000;

const University = require("./routes/university");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

app.use("/api/v1/uni", University);

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  // console.log(`=> API running on localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
