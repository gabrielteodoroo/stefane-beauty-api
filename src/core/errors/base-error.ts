export class BaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BaseError'
  }
}
