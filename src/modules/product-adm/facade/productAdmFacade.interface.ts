import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
  GetProductFacadeInputDto,
  GetProductFacadeOutputDto
} from "./productAdmDto.facade.interface"

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>
  getStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>
  getProduct(input: GetProductFacadeInputDto): Promise<GetProductFacadeOutputDto>
}