import { BadRequestException } from '@nestjs/common';
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
            throw new BadRequestException(validation.error.errors);
        }

        return payload as Q;
    }

    abstract execute(command: T): Promise<R>;
}

export default ValidatedHandler;
