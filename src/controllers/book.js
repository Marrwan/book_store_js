// controllers/book.js
const bookService = require("../services/book");

module.exports.getAllBooks = async (request, response) => {
  try {
    const books = await bookService.getAllBooks();
    response.status(200).json(books);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getSpecificBook = async (request, response, next) => {
  try {
    const book = await bookService.getASpecificBook(request.params.id);

    return response.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

module.exports.addBook = async (request, response, next) => {
  try {
    const { title, author, content } = request.body;

    const newBook = await bookService.addBook({ title, author, content });
    return response.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

module.exports.updateBook = async (request, response, next) => {
  try {
    const updatedBook = await bookService.updateBook(
      request.params.id,
      request.body
    );

    response.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBook = async (request, response, next) => {
  try {
    await bookService.deleteBook(request.params.id);

    response.json({ success: "The book has been deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports.notFound = async (_request, response) => {
  return response.status(404).json({
    error:
      "The page you're looking for is on a coffee break. Apparently, it needed a break from being found. Don't worry, it's sipping on some espresso and contemplating its existence. Try again when it's done with its caffeine fix.",
  });
};

// 147
