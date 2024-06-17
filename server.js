import express from "express";
const app = express();
import hbs from "hbs";
import path from "path";
import hbsConfig from "./config/hbs_config.js";
import fileUpload from "express-fileupload";
import data from "./data/db.js";

app.set("view options", { layout: "layouts/layout" });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import home from "./routes/home.js";
import users from "./routes/users.js";
import edit from "./routes/edit.js";

app.use(fileUpload({}));

app.use(express.static("public"));

hbsConfig(hbs, path);

app.use("/", home);
app.use("/users", users);
app.use("/users/edit", edit);

const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default data;
