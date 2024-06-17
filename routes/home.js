import express from "express";
import data from "../data/db.js";
import idIncrement from "../utils/utils.js";
const router = express.Router();
const collection = data.collection("users");

// ---------------------------------------------

router.get("/", (req, res) => {
  res.render("home.hbs", {
    title: "Регистрация пользователя",
    welcomeMessage: "Добро пожаловать!",
  });
});
// ---------------------------------------------

router.post("/", async (req, res) => {
  const users = await collection.find().toArray();
  const newUser = {
    id: idIncrement(users),
    name: req.body.name,
    description: req.body.description,
    img_file: req.body.img_file,
    city: req.body.user_city,
    hobby: req.body.hobby,
  };

  if (!req.files || Object.keys(req.files).length === 0) {
    newUser.imgName = "";
  } else {
    let imgFile;
    let newFileName;
    let uploadPath;

    imgFile = req.files.img_file;
    newFileName =
      new Date().toLocaleDateString("uk-UA").replaceAll(".", "-") +
      "_" +
      imgFile.name;
    uploadPath = "./public/img/" + newFileName;

    try {
      await imgFile.mv(uploadPath);

      newUser.imgName = newFileName;
    } catch (err) {
      console.log('"mv" error: ', err);
      newUser.imgName = "";
    }
  }
  await collection.insertOne(newUser);
  res.redirect("/");
});

export default router;
