// services/book.js
const Book = require("../models/Book");
const esClient = require("../config/elasticSearch");
const {
  BOOK404,
  BOOK_EXISTS_ERROR,
  COPYRIGHT_ERROR,
} = require("../middlewares/Errors/APIError");
const { Op } = require("sequelize");
// delete an index
// esClient.indices.delete({ index: 'books'})
const getAllBooks = async () => {
  let books = await esClient.search({
    index: "books",
  });
  let result = books.hits.hits.map((hit) => hit._source);
  return result;
};

const getASpecificBook = async (bookId) => {
  let book = await esClient.search({
    index: "books",
    query: {
      match: { id: bookId },
    },
  });
  if (book.hits.hits.length == 0) {
    throw new BOOK404();
  }
  return book.hits.hits[0]._source;
};

const addBook = async (bookData) => {
  const book = await Book.findOne({ where: { title: bookData.title } });
  let content;
  if (bookData.content) {
    content = await Book.findOne({ where: { content: bookData.content } });
  }
  if (book) {
    throw new BOOK_EXISTS_ERROR();
  }
  if (content) {
    throw new COPYRIGHT_ERROR();
  }
  const newBook = await Book.create(bookData);
  await esClient.index({
    index: "books",
    body: newBook.toJSON(),
  });
  return newBook;
};

const updateBook = async (bookId, updatedData) => {
  const foundBook = await Book.findOne({ where: { id: bookId } });
  if (!foundBook) {
    throw new BOOK404();
  }
  const book = await Book.findOne({
    where: {
      title: {
        [Op.eq]: updatedData.title,
        [Op.ne]: foundBook.title,
      },
    },
  });
  const content = await Book.findOne({
    where: {
      content: {
        [Op.ne]: foundBook.content,
        [Op.eq]: updatedData.content,
      },
    },
  });

  if (book) {
    throw new BOOK_EXISTS_ERROR();
  }
  if (content) {
    throw new COPYRIGHT_ERROR();
  }
  const [count, [updatedBook]] = await Book.update(updatedData, {
    where: { id: bookId },
    returning: true,
  });
  // return ({count, updatedBook})
  if (count == 0) {
    throw new BOOK404();
  }
  // updateBook = updateBook.toJSON()
  if (count > 0) {
    await esClient.update({
      index: "books",
      id: bookId,
      doc: { ...updatedData },
    });
  }

  return updatedBook;
};

const deleteBook = async (bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new BOOK404();
  }
  if (book) {
    await book.destroy();
    await esClient.delete({ index: "books", id: bookId });
  }

  return book;
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getASpecificBook,
};
