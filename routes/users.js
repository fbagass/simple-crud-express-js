import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";

// Contoh Database
const users = [
  //   {
  //     name: "Ujang",
  //     age: 23,
  //   },
  //   {
  //     name: "Putra",
  //     age: 19,
  //   },
];

router.get("/", (req, res) => {
  res.send({
    status: "success",
    data: users,
  });
});

router.post("/", (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send({
    status: "success",
    data: users,
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const findUserById = users.find((user) => user.id === id);
  if (findUserById) {
    res.send({
      status: "success",
      data: findUserById,
    });
  } else {
    res.send({
      status: "userNotFound",
      message: "User data not found",
    });
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const userData = users.find((user) => user.id === id);
  if (userData) {
    if (name) {
      userData.name = name;
    }
    if (age) userData.age = age;
    res.send({
      status: "success",
      message: "User data has been updated",
    });
  } else {
    res.send({
      status: "userNotFound",
      message: "User data not found",
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const findUser = users.find((user) => user.id === id);
  if (findUser) {
    users.splice(findUser, 1);
    res.send({
      status: "success",
      message: "User data has been deleted",
    });
  } else {
    res.send({
      status: "userNotFound",
      message: "User data not found",
    });
  }
});

export default router;
