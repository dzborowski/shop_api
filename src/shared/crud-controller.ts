import {FindConditions, getRepository} from "typeorm";
import {Request, Response} from "express";
import RouteError from "./error";

type ObjectType<T> = { new(): T } | Function

abstract class CurdController<T> {
    public model: ObjectType<T>

    constructor(model: ObjectType<T>) {
        this.model = model;

        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.isExist = this.isExist.bind(this);
    }

  public async getAll(req: Request, res: Response) {
      const data = await getRepository(this.model).find();
      res.status(200).json(data);
  }

  public async getOne(req: Request, res: Response) {
      const data = await this.isExist(req.params.id);
      res.status(200).json(data);
  }

  public async create(req: Request, res: Response) {
      const obj: FindConditions<T> = req.body;
      const repo = getRepository(this.model);
      const isExist = await repo.findOne(obj);

      if (isExist) {
          const name = await repo.metadata.targetName;
          throw new RouteError(`${name} already exist!`, 400);
      }

      const data = await repo.save(req.body);
      res.status(201).json(data);
  }

  public async update(req: Request, res: Response) {
      const id = req.params.id;
      await this.isExist(id);
      await getRepository(this.model).update(id, req.body);
      res.status(200).end();
  }

  public async delete(req: Request, res: Response) {
      const id = req.params.id;
      await this.isExist(id);
      await getRepository(this.model).delete(id);
      res.status(200).end();
  }

  public async isExist(obj: FindConditions<T>): Promise<T | RouteError> {
    try {
        return await getRepository(this.model).findOneOrFail(obj);
    } catch (err) {
        throw new RouteError(err.message, 404);
    }
  }
}

export default CurdController;
