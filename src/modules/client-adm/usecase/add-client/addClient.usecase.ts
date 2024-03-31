import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import ClientGatway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./addClient.usecase.dto";

export default class AddClientUsecase implements UsecaseInterface {
  private _clientRepository: ClientGatway;

  constructor(clientRepository: ClientGatway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const client = new Client({
      address: input.address,
      email: input.email,
      name: input.name
    });

    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      address: client.address,
      email: client.email,
      name: client.name,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }

}