import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input: InputFindProductDto = {
      id: "123"
    };

    const product = new Product("123", "Refrigerante", 10.99);

    await productRepository.create(product);

    await productRepository.find(input.id);

    const output = {
      id: expect.any(String),
      name: product.name,
      price: product.price
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});