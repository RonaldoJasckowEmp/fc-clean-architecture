import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
      const response = await request(app)
          .post("/product")
          .send({
            "type": "a",
            "name": "product a",
            "price": 50
        });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("product a");
    expect(response.body.price).toBe(50);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "john",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        "type": "a",
        "name": "product a",
        "price": 50
    });
    expect(response.status).toBe(200);
    
    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(1);

  });
});
