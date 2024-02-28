import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from "./productAdmDto.facade.interface"

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>
}