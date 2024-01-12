export class ServerError extends Error {
  cause?: Response;
}
