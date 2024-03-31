import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import ClientFacadeInterface from "./client.facade.interface";
import { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./clientDto.facade.interface";

interface UsecaseProps {
  addClientUsecase: UsecaseInterface;
  findClientUsecase: UsecaseInterface;
}

export default class ClientFacade implements ClientFacadeInterface {
  private _addClientUsecase: UsecaseInterface;
  private _findClientUsecase: UsecaseInterface;

  constructor(usecasesProps: UsecaseProps) {
    this._addClientUsecase = usecasesProps.addClientUsecase;
    this._findClientUsecase = usecasesProps.findClientUsecase;
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return await this._findClientUsecase.execute(input)
  }

  async add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
    const result = await this._addClientUsecase.execute(input);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }
  }
}