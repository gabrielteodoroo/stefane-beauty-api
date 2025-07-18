import User from '../entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<User>
  abstract findMany(): Promise<User[]>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract save(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract hasAnyUser(): Promise<boolean>
}
