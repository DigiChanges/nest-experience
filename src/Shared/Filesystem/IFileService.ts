import IFileDomain from '@file/Domain/Entities/IFileDomain';
export abstract class IFileService
{
  abstract addNewFilePath(id: string, version: number, filename: string): string;
  abstract convertToUrlFriendly(filename: string): string;
  abstract getFileExtension(filename: string): string | null;
  abstract setFullPathToFile(file: IFileDomain): IFileDomain;
}
