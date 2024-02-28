import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./productAdmDto.facade.interface";
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

  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    const result = await this._checkStockUsecase.execute(input);
    return result;
  }

}