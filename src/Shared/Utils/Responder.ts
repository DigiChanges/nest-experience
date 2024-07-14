import { Injectable } from '@nestjs/common';

import { Transformer } from '../Transformers';
import { IPaginator } from '../Criteria/IPaginator';

@Injectable()
class Responder
{
    public async send<T, P>(data: Promise<T>, transformer?: Transformer<T, P>)
    {
        if (!transformer)
        {
            return await data;
        }

        return await transformer.handle(data);
    }

    public async paginate<T, P>(data: IPaginator, transformer?: Transformer<T, P>)
    {
        if (!transformer)
        {
            return data.paginate();
        }

        return await transformer.paginate<P>(data);
    }

    // public async error(error: ErrorHttpException, reply: FastifyReply, status: IHttpStatusCode)
    // {
    //     await reply.code(status.code).send(this.#formatError.getFormat(error));
    // }
}

export default Responder;
