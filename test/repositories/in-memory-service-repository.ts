import Service from '@/domain/service/entities/service'
import { ServiceRepository } from '@/domain/service/repositories/service-repository'

export class InMemoryServiceRepository extends ServiceRepository {
  items: Service[] = []

  async create(service: Service) {
    this.items.push(service)
    return service
  }

  async findById(id: string) {
    const service = this.items.find((service) => service.id.toString() === id)
    return service ?? null
  }

  async save(service: Service) {
    const itemIndex = this.items.findIndex((item) => item.id === service.id)
    this.items[itemIndex] = service
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)
    this.items.splice(itemIndex, 1)
  }

  async findMany() {
    return this.items
  }

  async findByName(name: string) {
    const service = this.items.find((service) => service.name === name)
    return service ?? null
  }
}
