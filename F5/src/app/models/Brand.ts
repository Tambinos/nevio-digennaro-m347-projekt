export class Brand {
  id: number
  brand: string
  is_cheap_brand: boolean
  constructor(id: number, brand: string, is_cheap_brand: boolean) {
    this.id = id;
    this.brand = brand;
    this.is_cheap_brand = is_cheap_brand;
  }
}
