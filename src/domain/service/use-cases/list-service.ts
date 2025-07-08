import { Either, right } from '@/core/errors/either/either'
import { ServiceRepository } from '@/domain/service/repositories/service-repository'
import Service from '../entities/service'

type Response = Either<null, Service[]>

export class ListServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async handle(): Promise<Response> {
    const services = await this.serviceRepository.findMany()

    return right(services)
  }
}
