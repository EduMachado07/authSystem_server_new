export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}

export class BadRequest extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class Unauthorized extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class NotFound extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}
export class Conflict extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}
