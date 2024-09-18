import CreateBucketHandler from '@file/Application/Handlers/CreateBucketHandler';
import DownloadFileHandler from '@file/Application/Handlers/DownloadFileHandler';
import GetMetadataFileHandler from '@file/Application/Handlers/GetMetadataFileHandler';
import ListFilesHandler from '@file/Application/Handlers/ListFilesHandler';
import RemoveFileHandler from '@file/Application/Handlers/RemoveFileHandler';
import UpdateUploadFileMultipartHandler from '@file/Application/Handlers/UpdateUploadFileMultipartHandler';
import UploadFileMultipartHandler from '@file/Application/Handlers/UploadFileMultipartHandler';

export const QueryHandlers = [
    DownloadFileHandler,
    GetMetadataFileHandler,
    ListFilesHandler,
    RemoveFileHandler,
    UploadFileMultipartHandler,
    UpdateUploadFileMultipartHandler,
    CreateBucketHandler
];
