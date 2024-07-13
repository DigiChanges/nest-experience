import { Post, Get, Controller, Body } from '@nestjs/common';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';

@Controller('items')
class ItemController
{
    constructor(private useCase: SaveItemUseCase)
    {

    }

    @Post('/')
    async save(@Body() payload: ItemRepPayload): Promise<void>
    {
        console.log('useCase');
        console.log(this.useCase.handle(payload));

        // const commandBus = DependencyInjector.inject<CommandBus>(CommandBus);
        // console.log('commandBus');
        // console.log(commandBus);
        //
        // const itemId = await commandBus.execute(new SaveItemCommand(payload));
        // console.log('itemId');
        // console.log(itemId);
        //
        // await responder.send({ _id: itemId }, reply, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }
//
//     async list(request: FastifyRequest<IRequestFastify>, reply: FastifyReply): Promise<void>
//     {
//         const { url } = request;
//
//         const requestCriteria: ICriteria = new RequestCriteria({
//             filter: new ItemFilter(request.query as ParsedQs),
//             sort: new ItemSort(request.query as ParsedQs),
//             pagination: new Pagination(request.query as ParsedQs, url)
//         });
//
//         const commandBus = DependencyInjector.inject<QueryBus>('QueryBus');
//         const paginator = await commandBus.execute(new ListItemQuery(requestCriteria));
//
//         await responder.paginate(paginator, reply, StatusCode.HTTP_OK, new ItemTransformer());
//     }
//
//     async show(request: FastifyRequest, reply: FastifyReply): Promise<void>
//     {
//         const commandBus = DependencyInjector.inject<QueryBus>('QueryBus');
//         const item = await commandBus.execute(new GetItemQuery(request.params as IdPayload));
//
//         await responder.send(item, reply, StatusCode.HTTP_OK, new ItemTransformer());
//     }
//
//     async update(request: FastifyRequest<IRequestFastify<ItemUpdatePayload>>, reply: FastifyReply): Promise<void>
//     {
//         const payload = {
//             id: (request.params as IdPayload).id,
//             ...request.body
//         };
//
//         const commandBus = DependencyInjector.inject<CommandBus>('CommandBus');
//         const itemId = await commandBus.execute(new UpdateItemCommand(payload));
//
//         await responder.send({ _id: itemId }, reply, StatusCode.HTTP_OK, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
//     }
//
//     async remove(request: FastifyRequest<IRequestFastify>, reply: FastifyReply): Promise<void>
//     {
//         const commandBus = DependencyInjector.inject<CommandBus>('CommandBus');
//         const item = await commandBus.execute(new RemoveItemCommand(request.params as IdPayload));
//
//         await responder.send(item, reply, StatusCode.HTTP_OK, new ItemTransformer());
//     }
}

export default ItemController;
