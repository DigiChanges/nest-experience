import IFileVersionDomain from '../Entities/IFileVersionDomain';
import IBaseRepository from '../../../Shared/Repositories/IBaseRepository';

abstract class IFileVersionRepository extends IBaseRepository<IFileVersionDomain> {}

export default IFileVersionRepository;
