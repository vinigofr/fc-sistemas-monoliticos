import { AddClientInputDto } from "../usecase/add-client/addClient.usecase.dto"
import { AddClientFacadeOutputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./clientDto.facade.interface"

export default interface ClientFacadeInterface {
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>
  add(input: AddClientInputDto): Promise<AddClientFacadeOutputDto>
}