import IFileDomain from '../Entities/IFileDomain';
import IBaseRepository from '../../../Shared/Repositories/IBaseRepository';

abstract class IFileRepository extends IBaseRepository<IFileDomain> {}

export default IFileRepository;
