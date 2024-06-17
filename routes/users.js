import express from "express";
import data from "../data/db.js";
const collection = data.collection("users");
const router = express.Router();

router.get("/", async (req, res) => {
  let usersArr = await collection.find().toArray();
  res.render("users.hbs", {
    title: "Зарегистрированные пользователи",
    user_city: usersArr.user_city,
    usersArr: usersArr,
  });
});

router.get("/:id", async (req, res) => {
  let users = await collection.find().toArray();
  let user = await users.find((el) => el.id === Number(req.params.id));
  res.render("user-page.hbs", {
    title: user.name,
    pageTitle: "User page",
    obj: user,
    description: user.description,
    city: user.city,
    hobby: user.hobby,
  });
});

router.delete("/:id", (req, res) => {
  try {
    const result = collection.deleteOne({
      id: Number(req.params.id),
    });
    if (result.deletedCount === 0) {
      res.send("not deleted. Empty?");
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.log("err: ", err);
    res.sendStatus(500);
  }
});

export default router;
