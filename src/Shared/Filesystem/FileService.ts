import { extname } from 'path';

import IFileDomain from '@file/Domain/Entities/IFileDomain';
import { Injectable } from '@nestjs/common';
import { IFileService } from '@shared/Filesystem/IFileService';

interface Config {
    fileSystemBucket: string;
    fileSystemHost: string;
    fileSystemPort: string;
    fileSystemRootPath: string;
    fileSystemProtocol: string;
}

@Injectable()
class FileService implements IFileService
{
    constructor(private readonly config: Config) {}

    addNewFilePath(id: string, version: number, filename: string): string
    {
        return `${id}/${version}/${filename}`;
    }

    convertToUrlFriendly(filename: string): string
    {
        return filename
          .toLowerCase()
          .replace(/[\s_]+/g, '-')
          .replace(/[^\w\-.]+/g, '')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '')
          .replace(/\.+/g, '.');
    }

    getFileExtension(filename: string): string | null
    {
        const ext = extname(filename);
        return ext ? ext.slice(1) : null;
    }

    setFullPathToFile(file: IFileDomain): IFileDomain
    {
        const { fileSystemBucket, fileSystemHost, fileSystemPort, fileSystemRootPath, fileSystemProtocol } = this.config;
        file.path = `${fileSystemProtocol}://${fileSystemHost}${fileSystemPort ? `:${fileSystemPort}` : ''}/${fileSystemBucket}/${fileSystemRootPath}/${file.path}`;

        return file;
    }
}

export default FileService;
