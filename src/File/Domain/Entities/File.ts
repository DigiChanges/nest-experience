import IFileDomain from './IFileDomain';
import BaseDomain from '../../../Shared/Entities/BaseDomain';

class File extends BaseDomain implements IFileDomain
{
  currentVersion: number;

  constructor()
{
    super();
    this.currentVersion = 0;
  }
}

export default File;
