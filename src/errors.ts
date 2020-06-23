// 400
class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

// 401
class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

// 403
class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

// 404
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// 410
class GoneError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoneError';

    Object.setPrototypeOf(this, GoneError.prototype);
  }
}

// 429
class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TooManyRequestsError';

    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

export { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, TooManyRequestsError };
