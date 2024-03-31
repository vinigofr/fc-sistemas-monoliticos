import {
  FindAllProductsFacadeOutputDto,
  FindProductFacadeInputDto,
  FindProductFacadeOutputDto
} from "./storeCatalogDto.facade.interface"

export default interface StoreCatalogFacadeInterface {
  find(input: FindProductFacadeInputDto): Promise<FindProductFacadeOutputDto>
  findAll(): Promise<FindAllProductsFacadeOutputDto>
}