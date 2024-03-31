import ClientFacade from "../facade/client.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/addClient.usecase";
import FindClientUsecase from "../usecase/find-client/findClient.usecase";

export default class ClientFacadeFactory {
  static create(): ClientFacade {
    const repository = new ClientRepository();
    const findClientUsecase = new FindClientUsecase(repository);
    const addClientUsecase = new AddClientUsecase(repository);

    return new ClientFacade({ addClientUsecase, findClientUsecase })
  }
}