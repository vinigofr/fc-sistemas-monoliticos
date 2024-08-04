export interface FindClientFacadeInputDto {
  id: string
}

export interface FindClientFacadeOutputDto {
  id: string
  name: string
  email: string
  address: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  zipCode: string
  state: string
}

export interface AddClientFacadeInputDto {
  id?: string
  name: string
  email: string
  address: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
}

export interface AddClientFacadeOutputDto {
  id: string
  name: string
  email: string
  address: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  zipCode: string
  createdAt: Date
  state: string
  updatedAt: Date
}

