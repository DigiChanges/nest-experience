import IBaseRepository from '../../../Shared/Repositories/IBaseRepository';
import IFileDomain from '../Entities/IFileDomain';

abstract class IFileRepository extends IBaseRepository<IFileDomain> {}

export default IFileRepository;
