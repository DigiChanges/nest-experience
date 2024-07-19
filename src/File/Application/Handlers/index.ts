import GetFileMetadata from './GetFileMetadata';
import CreateBucket from './CreateBucket';
import Download from './Download';
import GetPresignedGetObject from './GetPresignedGetObject';
import ListFilesHandler from './ListFiles';
import ListObjectsHandler from './ListObjects';
import Optimize from "./Optimize";

export const QueryHandlers = [GetFileMetadata,
    CreateBucket,
    Download,
    GetPresignedGetObject,
    ListFilesHandler,
    ListObjectsHandler,
    Optimize];
