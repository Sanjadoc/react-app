const router = require("express").Router();
const User = require("../models/user");
const db = require("../services/db");

router.get("/", async (req, res) => {
  res.send(await db.select().from(User.tableName).orderBy("id"));
});

router.get("/:id", (req, res) => {
  res.send(`Get one user with ID: ${req.params.id}`);
});

router.get("/:id/friends", (req, res) => {
  res.send(
    `<h1 style="text-align:center; color: green;">Get all friends for user ID: ${req.params.id}: <h1>`,
  );
});

router.post("/:id/create", (req, res) => {
  res.send(`Create user with ID: ${req.params.id}`);
});

router.put("/:id/update", (req, res) => {
  res.send(`Updated user with ID: ${req.params.id}`);
});

router.delete("/:id/delete", (req, res) => {
  res.send(`Deleted user with ID: ${req.params.id}`);
});

module.exports = router;
