/* eslint-disable max-classes-per-file */
export class UnauthorizedError extends Error {
    constructor() {
        super();
        this.name = "UnauthorizedError";
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class UnauthenticatedError extends Error {
    constructor() {
        super();
        this.name = "UnauthenticatedError";
        Object.setPrototypeOf(this, UnauthenticatedError.prototype);
    }
}

export class NotFoundError extends Error {
    constructor() {
        super();
        this.name = "NotFoundError";
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ConflictError extends Error {
    constructor() {
        super();
        this.name = "ConflictError";
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
