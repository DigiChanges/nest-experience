import { FileInterceptor, UploadedFile } from '@blazity/nest-file-fastify';
import IFileDomain from '@file//Domain/Entities/IFileDomain';
import RemoveFileCommand from '@file/Application/Commands/RemoveFileCommand';
import UpdateUploadFileMultipartCommand from '@file/Application/Commands/UpdateUploadFileMultipartCommand';
import UploadFileMultipartCommand from '@file/Application/Commands/UploadFileMultipartCommand';
import DownloadFileQuery from '@file/Application/Queries/DownloadFileQuery';
import GetMetadataFileQuery from '@file/Application/Queries/GetMetadataFileQuery';
import ListFileQuery from '@file/Application/Queries/ListFileQuery';
import MultipartFilePayload from '@file/Domain/Payloads/MultipartFilePayload';
import UpdateMultipartFilePayload from '@file/Domain/Payloads/UpdateMultipartFilePayload';
import FileFilter from '@file/Presentation/Criterias/FileFilter';
import FileSort from '@file/Presentation/Criterias/FileSort';
import { UpdateBucketRepRequest } from '@file/Presentation/Requests/UpdateBucketRepRequest';
import UploadBucketRepRequestQuery from '@file/Presentation/Requests/UploadBucketRepRequest';
import FileTransformer from '@file/Presentation/Transformers/FileTransformer';
import { Post, Get, Controller, Param, Delete, UseInterceptors, Put, Res } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Criteria } from '@shared/Criteria/CriteriaDecorator';
import Criterias from '@shared/Criteria/CriteriasDecorator';
import { ICriteria } from '@shared/Criteria/ICriteria';
import { IPaginator } from '@shared/Criteria/IPaginator';
import Paginate from '@shared/Criteria/PaginateDecorator';
import IdPayload from '@shared/Payloads/IdPayload';
import Transform from '@shared/Transformers/TransformDecorator';
import { FastifyReply } from 'fastify';


const LIMITS_FILE_SIZE = 1024 * 1024 * 10;
const DEST = '/tmp';

@Controller('files')
class FileController
{
    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus
    ) {}

    @Post('/')
    @UseInterceptors(
    FileInterceptor('file', {
        dest: DEST,
        limits: {
            fileSize: LIMITS_FILE_SIZE
        }
    }))
    @Transform(FileTransformer)
    async uploadMultipart(
      @UploadedFile() file: MultipartFilePayload,
      @Query() query: UploadBucketRepRequestQuery
    )
    {
        const payload = { ...file, ...query };
        return await this.commandBus.execute(new UploadFileMultipartCommand(payload));
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('file', {
      dest: DEST,
      limits: {
        fileSize: LIMITS_FILE_SIZE
      }
    }))
    @Transform(FileTransformer)
    async updateUploadMultipart(
      @UploadedFile() payload: MultipartFilePayload,
      @Param() id: IdPayload,
      @Query() query: UpdateBucketRepRequest
    ) // TODO
    {
        const updatePayload: UpdateMultipartFilePayload = { ...payload, ...id, ...query };
        return await this.commandBus.execute(new UpdateUploadFileMultipartCommand(updatePayload));
    }

    @Get('/')
    @Paginate()
    @Transform(FileTransformer)
    @Criterias(FileFilter, FileSort)
    async list(@Criteria() payload: ICriteria): Promise<IPaginator>
    {
        return this.queryBus.execute(new ListFileQuery(payload));
    }

    @Get('/:id')
    async download(@Param() payload: IdPayload, @Res() reply: FastifyReply): Promise<void>
    {
        const fileStream = await this.queryBus.execute(new DownloadFileQuery(payload));

        const { stream, fileName, mimeType } = fileStream;

        await reply
            .code(200)
            .header('Content-Type',  mimeType)
            .header('Content-Disposition', `attachment; filename=${fileName}`)
            .send(stream);
    }

    @Get('/metadata/:id')
    @Transform(FileTransformer)
    async getFileMetadata(@Param() payload: IdPayload): Promise<IFileDomain>
    {
       return this.queryBus.execute(new GetMetadataFileQuery(payload));
    }

    @Delete('/:id')
    async remove(@Param() payload: IdPayload)
    {
        await this.commandBus.execute(new RemoveFileCommand((payload))); // TODO

        return { message: 'File removed.', id: payload.id };
    }
}

export default FileController;
