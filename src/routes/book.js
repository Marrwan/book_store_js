// routes/book.js
const express = require("express");
const bookController = require("../controllers/book");
const { validateRequest, validateParams } = require("../middlewares/validation");

const router = express.Router();

router.get("/",  bookController.getAllBooks);

router.get("/:id", validateParams, bookController.getSpecificBook);

router.post("/", validateRequest, bookController.addBook);

router.patch("/:id", validateParams, validateRequest,  bookController.updateBook);

router.delete("/:id", validateParams, bookController.deleteBook);

router.all("*", bookController.notFound);
module.exports = router;
