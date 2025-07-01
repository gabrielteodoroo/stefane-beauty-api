import { BaseError } from '../base-error'

export class NotAllowedError extends BaseError {
  constructor(message?: string) {
    super(message || 'Not Allowed')
  }
}
