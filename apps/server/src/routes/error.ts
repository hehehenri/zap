export class RouteError extends Error {
  message: string;
  status: number;
  cause: any;
  
  constructor({message, status, cause}: {message: string, status: number, cause?: any}) {
    super();

    this.message = message;
    this.status = status;
    this.cause = cause;
  }
}

export class InvalidPayloadError extends RouteError {
  constructor(message: string) {
    super({
      message,
      status: 422 
    });
  }
}

export class UnauthorizedError extends RouteError {
  constructor() {
    super({ message: "User not authorized", status: 401});
  }
}

export class DatabaseError extends RouteError {
  constructor({ message, cause }: { message?: string, cause: string}) {
    super({ message: message ?? "Database query failed", status: 500, cause })
  }
}
