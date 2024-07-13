// import ItemUpdatePayload from '../Payloads/ItemUpdatePayload';
// import IItemDomain from '../Entities/IItemDomain';
// import IItemRepository from '../Repositories/IItemRepository';
// import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
// import ItemSchemaUpdateValidation from '../Validations/ItemSchemaUpdateValidation';
//
// class UpdateItemUseCase
// {
//     constructor(private repository: IItemRepository)
//     {
//         this.repository = repository;
//     }
//
//     async handle(payload: ItemUpdatePayload): Promise<string>
//     {
//         await ValidatorSchema.handle(ItemSchemaUpdateValidation, payload);
//
//         const item: IItemDomain = await this.repository.getOne(payload.id);
//         item.type = payload.type;
//         item.name = payload.name;
//
//         await this.repository.save(item);
//
//         return item.getId();
//     }
// }
//
// export default UpdateItemUseCase;
