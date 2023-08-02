import express, { Request, Response } from "express";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute();

    res.format({
        json: async () => res.send(output)
    });
});

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());


    try {
        const productDTO: InputCreateProductDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,

        };
        const output = await usecase.execute(productDTO);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});


