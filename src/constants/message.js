const { STATUS } = require("./constant");

module.exports = {
  ROUTE_NOT_FOUND: {
    message:
      "The page you're looking for is on a coffee break. Apparently, it needed a break from being found. Don't worry, it's sipping on some espresso and contemplating its existence. Try again when it's done with its caffeine fix.",
    status: STATUS.NOT_FOUND,
  },
  BOOK_ALREADY_CREATED: {
    message: "A book already exists with the specified title",
    status: STATUS.CONFLICT,
  },
  COPYRIGHT: {
    message:
      "🙄 That's a  copyright violation, A book with exact content already exist",
    status: STATUS.CONFLICT,
  },
  INVALID_ID: {
    message:
      "Whoa, we asked for an ID, not an ancient hieroglyphic code. Numbers, my friend, numbers. Try again, and this time, keep it as simple as 1, 2, 3... unless counting is also an issue.",
    status: STATUS.BAD,
  },
  BOOK_NOT_FOUND: {
    message: "The book with that id does not exist",
    status: STATUS.NOT_FOUND,
  },
  SERVER_ERROR: {
    message:
      "Internal Server Error: Looks like our servers took a detour to explore the Bermuda Triangle. We're sending a search party, but in the meantime, try refreshing. If that doesn't work, blame it on cosmic interference",
    status: STATUS.INTERNAL_SERVER,
  },
  CREATED: {
    message: "Creation successful",
    status: STATUS.CREATED,
  },
  UPDATED: {
    message: "Updated successfully",
    status: STATUS.SUCCESS,
  },
  DELETED: {
    message: "Deleted successfully",
    status: STATUS.SUCCESS,
  },
};
