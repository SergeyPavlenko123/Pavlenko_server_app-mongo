import express from "express";
const router = express.Router();
import data from "../data/db.js";
const collection = data.collection("users");

router.get("/:id", async (req, res) => {
  const users = await collection.find().toArray();
  let user = users.find((el) => el.id === Number(req.params.id));

  res.render("edit.hbs", {
    id: user.id,
    title: user.name,
    pageTitle: "User page",
    obj: user,
    description: user.description,
    city: user.city,
    hobby: user.hobby,
  });
});

router.post("/:id", async (req, res) => {
  const users = await collection.find().toArray();
  let user = await users.find((el) => el.id === Number(req.params.id));
  await collection.updateOne({ id: user.id }, { $set: req.body });

  if (!req.files || Object.keys(req.files).length === 0) {
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

      console.log('"mv" success!');
      user.imgName = newFileName;
    } catch (err) {}
  }

  res.redirect("/users");
});

export default router;
