import Jewel from '@/domain/jewel/entities/jewel'

export class JewelPresenter {
  static toHTTP(jewel: Jewel) {
    return {
      id: jewel.id.toString(),
      name: jewel.name,
      price: jewel.price,
      stock: jewel.stock,
      category: jewel.category,
      material: jewel.material,
      imageUrl: jewel.imageUrl,
      description: jewel.description,
    }
  }
}
