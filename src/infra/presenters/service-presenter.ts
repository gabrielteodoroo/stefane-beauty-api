import Service from '@/domain/service/entities/service'

export class ServicePresenter {
  static toHTTP(service: Service) {
    return {
      id: service.id.toString(),
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
    }
  }
}
