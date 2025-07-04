import Service from '../entities/service'

export abstract class ServiceRepository {
  abstract create(service: Service): Promise<Service>
  abstract findMany(): Promise<Service[]>
  abstract findByName(name: string): Promise<Service | null>
  abstract findById(id: string): Promise<Service | null>
  abstract save(service: Service): Promise<void>
  abstract delete(id: string): Promise<void>
}
