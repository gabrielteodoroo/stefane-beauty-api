export abstract class HashRepository {
  abstract hash(value: string): Promise<string>
  abstract compare(value: string, hash: string): Promise<boolean>
}
