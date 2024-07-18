import IFileDomain from './IFileDomain';
import FileRepPayload from '../Payloads/FileRepPayload';
import IBaseDomain from '../../../Shared/Entities/IBaseDomain';

interface IFileVersionDomain extends IBaseDomain, FileRepPayload {
  file: IFileDomain;
  setName(hasOriginalName: boolean): void;
}

export default IFileVersionDomain;
