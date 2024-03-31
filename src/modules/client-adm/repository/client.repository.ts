import Id from "../../@shared/domain/value-object/idValueObject";
import Client from "../domain/client.entity";
import ClientGatway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGatway {
  async add(input: Client): Promise<void> {
    await ClientModel.create({
      id: input.id.id || new Id().id,
      name: input.name,
      email: input.email,
      address: input.address,
      updatedAt: input.updatedAt,
      createdAt: input.createdAt
    });
  };

  async find(id: string): Promise<Client> {
    const result = await ClientModel.findOne({ where: { id }, raw: true });

    if (!result) {
      throw new Error('Client not found');
    }

    return new Client({
      id: new Id(result.id),
      name: result.name,
      email: result.email,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    })
  }
}