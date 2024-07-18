import IBaseDomain from '../../../Shared/Entities/IBaseDomain';

interface IFileDomain extends IBaseDomain {
  currentVersion: number;
}

export default IFileDomain;
