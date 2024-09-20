import { extname } from 'path';

import { Injectable } from '@nestjs/common';

@Injectable()
class FileService // TODO: Add  interface specification
{
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
}

export default FileService;
