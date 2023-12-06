const { Sequelize } = require("sequelize");
const Book = require("./src/models/Book");
const sequelize = require("./src/config/db");
const esClient = require("./src/config/elasticSearch");
// Define your sample data
const booksData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    content: "A novel about the American Dream. ",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    content: "A classic of modern American literature.",
  },
];

// Function to seed data into the Book model
const seedData = async () => {
  try {
    // Sync the model with the database
    await Book.sync({ force: true });

    // Insert the combined data into the Book model
    const insertedBooks = await Book.bulkCreate(booksData);

    // Index the inserted books in Elasticsearch
    const esBulkIndexBody = [];
    insertedBooks.forEach((book) => {
      esBulkIndexBody.push(
        { index: { _index: "books", _id: book.id } },
        book.toJSON()
      );
    });

    await esClient.bulk({ body: esBulkIndexBody });

    console.log("Data seeded and indexed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Run the seed function
seedData();
