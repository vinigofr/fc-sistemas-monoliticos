import Id from "../../../@shared/domain/value-object/idValueObject";
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
      id: new Id(input.id),
      address: input.address,
      email: input.email,
      name: input.name,
      city: input.city,
      complement: input.complement,
      document: input.complement,
      number: input.number,
      state: input.state,
      street: input.state,
      zipCode: input.zipCode,
    });

    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      address: client.address,
      email: client.email,
      name: client.name,
      city: client.city,
      complement: client.complement,
      document: client.document,
      number: client.number,
      state: client.state,
      street: client.street,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }

}