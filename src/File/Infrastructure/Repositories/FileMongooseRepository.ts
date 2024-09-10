import { FileMongooseDocument } from '@file/Infrastructure/Schemas/FileSchema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICriteria } from '@shared/Criteria/ICriteria';
import { IPaginator } from '@shared/Criteria/IPaginator';
import * as mongoose from 'mongoose';

import BaseMongooseRepository from '../../../Shared/Repositories/BaseMongooseRepository';
import MongoosePaginator from '../../../Shared/Utils/MongoosePaginator';
import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileRepository from '../../Domain/Repositories/IFileRepository';
import FileFilter from '../../Presentation/Criterias/FileFilter';


@Injectable()
class FileMongooseRepository extends BaseMongooseRepository<IFileDomain> implements IFileRepository
{
    constructor(@InjectModel('File') fileModel: mongoose.Model<IFileDomain>)
    {
        super(fileModel);
    }

    list(criteria: ICriteria): IPaginator
    {
        const queryBuilder: mongoose.Query<FileMongooseDocument[], FileMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(FileFilter.NAME))
        {
            const name: string = filter.get(FileFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(FileFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default FileMongooseRepository;
