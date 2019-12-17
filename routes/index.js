const express = require("express");
const router = express.Router();
const user = require("./user");
const board = require("./board");

router.post("/register", user.register);
router.post("/login", user.login);

router.get("/board/list", board.listBoard);
router.get("/board/write", board.writeBoard);
router.post("/board/write", board.addBoard);

module.exports = router;