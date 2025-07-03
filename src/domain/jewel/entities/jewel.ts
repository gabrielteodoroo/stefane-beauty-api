import Entity from '@/core/entities/entity'
import Identity from '@/core/entities/identity'
import { Optional } from '@/core/types/optional'

export type JewelType = {
  name: string
  price: number
  stock: number
  category: string
  material: string
  imageUrl: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

export default class Jewel extends Entity<JewelType> {
  static create(
    data: Optional<JewelType, 'createdAt' | 'updatedAt'> & {
      createdAt?: Date
      updatedAt?: Date
    },
    id?: Identity,
  ) {
    return new Jewel(
      {
        ...data,
      },
      id,
    )
  }

  get name() {
    return this.attributes.name
  }

  get price() {
    return this.attributes.price
  }

  get stock() {
    return this.attributes.stock
  }

  get category() {
    return this.attributes.category
  }

  get material() {
    return this.attributes.material
  }

  get imageUrl() {
    return this.attributes.imageUrl
  }

  get description() {
    return this.attributes.description
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

  set price(price: number) {
    this.attributes.price = price
  }

  set stock(stock: number) {
    this.attributes.stock = stock
  }

  set category(category: string) {
    this.attributes.category = category
  }

  set material(material: string) {
    this.attributes.material = material
  }

  set imageUrl(imageUrl: string) {
    this.attributes.imageUrl = imageUrl
  }

  set description(description: string | undefined) {
    this.attributes.description = description
  }

  set createdAt(date: Date) {
    this.attributes.createdAt = date
  }

  set updatedAt(date: Date) {
    this.attributes.updatedAt = date
  }
}
