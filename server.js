const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const todos = require("./router/todoRoutes");
const indexRouter = require("./router");
const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/urlShortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/todos", todos);
app.use("/", indexRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
