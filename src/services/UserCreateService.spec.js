const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");
describe("UserCretateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  //com beforeEach() podemos rodar ele para cada função, no inicio dela,
  //então para não repedir codigo, criamos a variavel epara cada função usamos as classes devidas nelas
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("user should be create", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    const userCreate = await userCreateService.execute(user);

    expect(userCreate).toHaveProperty("id");
  });
  it("user not should be created with exists email", async () => {
    const user1 = {
      name: "user test 1",
      email: "user@test.com",
      password: "1234",
    };
    const user2 = {
      name: "user test 2",
      email: "user@test.com",
      password: "456",
    };
    //so usamos await pois usamos no cenario real, mas não precisava
    //pois o banco é inMemory ou seja um array
    await userCreateService.execute(user1);
    //usamos rejects pois o retorno é uma rejeição então comparamos se a rejeição é a mesma que esperamos
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("Email de Usuario Já Cadastrado")
    );
  });
});
