import Client from "../domain/client.entity";

export default interface ClientGatway {
  add(input: Client): Promise<void>;
  find(id: string): Promise<Client>;
}