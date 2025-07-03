import Jewel from '../entities/jewel';

export abstract class JewelRepository {
  abstract create(jewel: Jewel): Promise<Jewel>;
  abstract findMany(): Promise<Jewel[]>;
  abstract findByName(name: string): Promise<Jewel | null>;
  abstract findById(id: string): Promise<Jewel | null>;
  abstract save(jewel: Jewel): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
