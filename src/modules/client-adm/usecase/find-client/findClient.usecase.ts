import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGatway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./findClient.usecase.dto";

export default class FindClientUsecase implements UsecaseInterface {
  private _clientRepository: ClientGatway;

  constructor(clientRepository: ClientGatway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const result = await this._clientRepository.find(input.id);

    if (!result) {
      throw new Error(`client.with.id.${result.id.id}.not.found`)
    }

    const {
      address,
      createdAt,
      email,
      id,
      updatedAt,
      name
    } = result

    return {
      address,
      createdAt,
      email,
      id: id.id,
      updatedAt,
      name,
    }
  }
}