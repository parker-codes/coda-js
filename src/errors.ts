// 400
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

// 401
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

// 403
export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

// 404
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// 410
export class GoneError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoneError';

    Object.setPrototypeOf(this, GoneError.prototype);
  }
}

// 429
export class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TooManyRequestsError';

    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}
