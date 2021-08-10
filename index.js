const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const chalk = require("chalk");

const PORT = 4000;
const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "public")));
app.use(fileUpload());
app.use(require("./routes/index"));

app.engine(".hbs", hbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

mongoose
  .connect(
    "mongodb+srv://qwer:1234@cluster0.tnvrx.mongodb.net/pharmacy_database?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        chalk.bgBlue.yellow.bold(`server has been started on port ${PORT}`)
      );
      console.log(chalk.bgBlue.yellow.bold(`DataBase has been connected`));
    });
  })
  .catch(() => {
    console.log(chalk.bgRed.red.bold("error"));
  });
