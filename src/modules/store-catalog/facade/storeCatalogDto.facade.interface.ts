export interface FindProductFacadeInputDto {
  id: string
}

export interface FindProductFacadeOutputDto {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface FindAllProductsFacadeOutputDto {
  products: {
    id: string
    name: string
    description: string
    salesPrice: number
  }[]
}
