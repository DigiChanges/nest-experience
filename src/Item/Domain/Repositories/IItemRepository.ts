import IItemDomain from '../Entities/IItemDomain';
import IBaseRepository from '../../../Shared/Repositories/IBaseRepository';

abstract class IItemRepository extends IBaseRepository<IItemDomain> {}

export default IItemRepository;
