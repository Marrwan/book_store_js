const {
  BOOK_NOT_FOUND,
  ROUTE_NOT_FOUND,
  COPYRIGHT,
  SERVER_ERROR,
  BOOK_ALREADY_CREATED,
} = require("../../constants/message");
const BaseError = require("./BaseError");

class BOOK404 extends BaseError {
  constructor(
    name,
    statusCode = BOOK_NOT_FOUND.status,
    description = BOOK_NOT_FOUND.message,
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

class ROUTE404 extends BaseError {
  constructor(
    name,
    statusCode = ROUTE_NOT_FOUND.status,
    description = ROUTE_NOT_FOUND.message,
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

class COPYRIGHT_ERROR extends BaseError {
  constructor(
    name,
    statusCode = COPYRIGHT.status,
    description = COPYRIGHT.message,
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

class ERROR500 extends BaseError {
  constructor(
    name,
    statusCode = SERVER_ERROR.status,
    description = SERVER_ERROR.message,
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

class BOOK_EXISTS_ERROR extends BaseError {
  constructor(
    name,
    statusCode = BOOK_ALREADY_CREATED.status,
    description = BOOK_ALREADY_CREATED.message,
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

module.exports = {
  BOOK404,
  ROUTE404,
  BOOK_EXISTS_ERROR,
  ERROR500,
  COPYRIGHT_ERROR,
};
