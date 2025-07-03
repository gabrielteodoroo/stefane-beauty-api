import Entity from '@/core/entities/entity';
import Identity from '@/core/entities/identity';
import { Optional } from '@/core/types/optional';
import Email from '@/domain/shared/email';

export type UserType = {
  name: string;
  email: Email;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class User extends Entity<UserType> {
  static create(
    data: Optional<UserType, 'createdAt' | 'updatedAt'> & {
      createdAt?: Date;
      updatedAt?: Date;
    },
    id?: Identity,
  ) {
    return new User(
      {
        ...data,
      },
      id,
    );
  }

  get name() {
    return this.attributes.name;
  }

  get email() {
    return this.attributes.email;
  }

  get password() {
    return this.attributes.password;
  }

  get createdAt() {
    return this.attributes.createdAt ?? new Date();
  }

  get updatedAt() {
    return this.attributes.updatedAt ?? new Date();
  }

  set name(name: string) {
    this.attributes.name = name;
  }

  set email(email: Email) {
    this.attributes.email = email;
  }

  set password(password: string) {
    this.attributes.password = password;
  }

  set createdAt(date: Date) {
    this.attributes.createdAt = date;
  }

  set updatedAt(date: Date) {
    this.attributes.updatedAt = date;
  }
}
