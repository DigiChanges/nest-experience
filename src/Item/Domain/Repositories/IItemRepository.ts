import IBaseRepository from '../../../Shared/Repositories/IBaseRepository';
import IItemDomain from '../Entities/IItemDomain';

abstract class IItemRepository extends IBaseRepository<IItemDomain> {}

export default IItemRepository;
