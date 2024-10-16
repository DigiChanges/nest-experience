import { ErrorException } from '@shared/Exceptions/ErrorException';
import { GeneralErrorType } from '@shared/Exceptions/GeneralErrorType';
import { ZodSchema } from 'zod';

interface Payload {
    payload: unknown;
}

abstract class ValidatedHandler<T extends Payload, R>
{
    protected constructor(private schema: ZodSchema) {}

    async validate<Q>(command: T): Promise<Q>
    {
        const payload = command.payload;
        const validation = await this.schema.safeParseAsync(payload);

        if (!validation.success)
        {
            throw new ErrorException({
                message: 'Validation errors occurred',
                type: GeneralErrorType.BAD_REQUEST
            });
        }

        return validation.data as Q;
    }

    abstract execute(command: T): Promise<R>;
}

export default ValidatedHandler;
