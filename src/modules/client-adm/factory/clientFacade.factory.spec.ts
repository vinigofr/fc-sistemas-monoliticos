import ClientFacadeFactory from "./clientFacade.factory";

describe("ClientFacadeFactory test", () => {
  test("should instantiate a ClientFacade", () => {
    const productAdmFacade = ClientFacadeFactory.create();

    expect(productAdmFacade).toBeInstanceOf(ClientFacadeFactory);
  })
})