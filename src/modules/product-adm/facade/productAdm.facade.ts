import { getPreparedAssociationOptions } from "sequelize-typescript";
import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto, GetProductFacadeInputDto, GetProductFacadeOutputDto } from "./productAdmDto.facade.interface";
import ProductAdmFacadeInterface from "./productAdmFacade.interface";

export interface UsecaseProps {
  addProductUsecase: UsecaseInterface;
  checkStockUsecase: UsecaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UsecaseInterface;
  private _checkStockUsecase: UsecaseInterface;

  constructor(usecasesProps: UsecaseProps) {
    this._addUsecase = usecasesProps.addProductUsecase;
    this._checkStockUsecase = usecasesProps.checkStockUsecase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input);
  }

  async getStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    const result = await this._checkStockUsecase.execute(input);
    return result;
  }

  async getProduct(input: GetProductFacadeInputDto): Promise<GetProductFacadeOutputDto> {
    throw new Error("pending")
  }

}