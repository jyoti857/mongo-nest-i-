import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";


export abstract class EntityRepository <T extends Document> {
  constructor(protected readonly entityModel: Model<T>){}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null>{
    return this.entityModel.findOne(entityFilterQuery, {
      _id: 0, 
      __v: 0,
      ...projection
    }).exec()
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null>{
    return this.entityModel.find(entityFilterQuery)
  }

  async create(createEntityData: any): Promise<T>{
    const entity = new this.entityModel(createEntityData) //try to write unknown, error is throwing
    return entity.save();
  }
  async findOneAndUpdate(filterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T|null>{
    return this.entityModel.findOneAndUpdate(filterQuery, updateEntityData, {new: true})
  }
  async delete(filterQuery: FilterQuery<T>):Promise<boolean>{
    const deleteResult = await this.entityModel.deleteOne(filterQuery);
    return deleteResult.deletedCount >= 1;
  }
}