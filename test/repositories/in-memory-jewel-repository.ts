import Jewel from '@/domain/jewel/entities/jewel'
import { JewelRepository } from '@/domain/jewel/repositories/jewel-repository'

export class InMemoryJewelRepository extends JewelRepository {
  items: Jewel[] = []

  async create(jewel: Jewel) {
    this.items.push(jewel)
    return jewel
  }

  async findById(id: string) {
    const jewel = this.items.find((jewel) => jewel.id.toString() === id)
    return jewel ?? null
  }

  async save(jewel: Jewel) {
    const itemIndex = this.items.findIndex((item) => item.id === jewel.id)
    this.items[itemIndex] = jewel
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)
    this.items.splice(itemIndex, 1)
  }

  async findMany() {
    return this.items
  }

  async findByName(name: string) {
    const jewel = this.items.find((jewel) => jewel.name === name)
    return jewel ?? null
  }
}
