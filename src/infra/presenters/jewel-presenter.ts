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
      imageUrl: jewel.imageUrl
        ? `${process.env.S3_BASE_URL}/${jewel.imageUrl}`
        : null,
      description: jewel.description,
    }
  }
}
