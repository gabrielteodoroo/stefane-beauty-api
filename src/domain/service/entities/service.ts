import Entity from '@/core/entities/entity'
import Identity from '@/core/entities/identity'
import { Optional } from '@/core/types/optional'

export type ServiceType = {
  name: string
  description: string
  price: number
  category: string
  createdAt?: Date
  updatedAt?: Date
}

export default class Service extends Entity<ServiceType> {
  static create(
    data: Optional<ServiceType, 'createdAt' | 'updatedAt'> & {
      createdAt?: Date
      updatedAt?: Date
    },
    id?: Identity,
  ) {
    return new Service(
      {
        ...data,
      },
      id,
    )
  }

  get name() {
    return this.attributes.name
  }

  get description() {
    return this.attributes.description
  }

  get price() {
    return this.attributes.price
  }

  get category() {
    return this.attributes.category
  }

  get createdAt() {
    return this.attributes.createdAt ?? new Date()
  }

  get updatedAt() {
    return this.attributes.updatedAt ?? new Date()
  }

  set name(name: string) {
    this.attributes.name = name
  }

  set description(description: string) {
    this.attributes.description = description
  }

  set price(price: number) {
    this.attributes.price = price
  }

  set category(category: string) {
    this.attributes.category = category
  }

  set createdAt(date: Date) {
    this.attributes.createdAt = date
  }

  set updatedAt(date: Date) {
    this.attributes.updatedAt = date
  }
}
