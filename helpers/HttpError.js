const errorMessage = {
  409: "Conflict",
  401: "Unauthorized",
};


class HttpError extends Error {
  constructor(status, message = errorMessage[status]) {
    super(message);
    this.status = status;

  }
}

module.exports = HttpError;