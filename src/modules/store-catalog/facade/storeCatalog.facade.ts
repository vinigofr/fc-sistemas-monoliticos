import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import {
  FindAllProductsFacadeOutputDto,
  FindProductFacadeInputDto,
  FindProductFacadeOutputDto
} from "./storeCatalogDto.facade.interface";
import StoreCatalogFacadeInterface from "./storeCatalogFacade.interface";

export interface UsecaseProps {
  findAllProductsUsecase: UsecaseInterface;
  findProductUsecase: UsecaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findAllProductsUsecase: UsecaseInterface;
  private _findProductUsecase: UsecaseInterface;

  constructor(usecasesProps: UsecaseProps) {
    this._findAllProductsUsecase = usecasesProps.findAllProductsUsecase;
    this._findProductUsecase = usecasesProps.findProductUsecase;
  }

  async find(input: FindProductFacadeInputDto): Promise<FindProductFacadeOutputDto> {
    return await this._findProductUsecase.execute(input);
  }

  async findAll(): Promise<FindAllProductsFacadeOutputDto> {
    return await this._findAllProductsUsecase.execute(null);
  }

}