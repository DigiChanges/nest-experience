import { NotFoundException } from '@nestjs/common';
import { ErrorException } from '@shared/Exceptions/ErrorException';
import { GeneralErrorType } from '@shared/Exceptions/GeneralErrorType';
import * as mongoose from 'mongoose';

import { ICriteria } from '../Criteria/ICriteria';
import { IPaginator } from '../Criteria/IPaginator';
import IBaseDomain from '../Entities/IBaseDomain';

import IBaseRepository from './IBaseRepository';
import IByOptions from './IByOptions';


abstract class BaseMongooseRepository<T extends IBaseDomain> implements IBaseRepository<T>
{
    protected readonly entityName: string;
    protected repository: mongoose.Model<T>;
    protected populate: string[];

    protected constructor(model: mongoose.Model<T>, populate: string[] = [])
    {
        this.repository = model;
        this.populate = populate;
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.create(entity);
    }

    async getOne(id: string): Promise<T>
    {
        const entity = await this.repository.findOne({ _id: id } as mongoose.FilterQuery<T>).populate(this.populate);

        if (!entity)
        {
            throw new ErrorException({
                message: `${this.entityName} not found.`,
                type: GeneralErrorType.NOT_FOUND,
                metadata: {
                    context: 'Entity not found in the repository',
                    id
                }
            });
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        return this.repository.findOneAndUpdate({ _id: entity.id } as mongoose.FilterQuery<T>, { $set: entity }, { new: true }).populate(this.populate  as string | string[]);
    }

    async delete(id: string): Promise<T>
    {
        const entity = await this.repository.findByIdAndDelete({ _id: id } as any).populate(this.populate);

        if (!entity)
        {
            throw new ErrorException({
                message: `${this.entityName} not found.`,
                type: GeneralErrorType.NOT_FOUND,
                metadata: {
                    context: 'Entity not found in the repository',
                    id
                }
            });
        }

        return entity;
    }

    async getOneBy(condition: Record<string, any>, options: IByOptions = { initThrow: true, populate: undefined }): Promise<any>
    {
        const entity = await this.repository.findOne(condition as mongoose.FilterQuery<T>).populate(options?.populate as string | string[]).exec();

        if (options?.initThrow && !entity)
        {
            throw new ErrorException({
                message: `${this.entityName} not found.`,
                type: GeneralErrorType.NOT_FOUND
            });
        }

        return entity;
    }

    async getBy(condition: Record<string, any>, options: IByOptions = { initThrow: false, populate: undefined }): Promise<T[]>
    {
        const entities = await this.repository.find(condition as mongoose.FilterQuery<T>).populate(options?.populate as string | string[]).exec();

        if (options?.initThrow && entities.length === 0)
        {
            throw new ErrorException({
                message: `${this.entityName} not found.`,
                type: GeneralErrorType.NOT_FOUND
            });
        }

        return entities;
    }

    async getInBy(condition: Record<string, string[]>): Promise<T[]>
    {
        const [key] = Object.keys(condition);

        return await this.getBy({ [key]: { $in: condition[key] } });
    }

    async exist(condition: Record<string, any>, select: string[], initThrow = false): Promise<any>
    {
        const exist = await this.repository.findOne(condition as mongoose.FilterQuery<T>, select.join(' '));

        if (initThrow && !exist)
        {
            throw new ErrorException({
                message: `${this.entityName} not found.`,
                type: GeneralErrorType.NOT_FOUND
            });
        }

        return exist;
    }

    abstract list(criteria: ICriteria): IPaginator;
}

export default BaseMongooseRepository;
