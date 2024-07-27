import { BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

abstract class ValidatedHandler<T>
{
    protected constructor(private schema: ZodSchema<any>) {}

    async validate<Q>(command: T): Promise<Q>
    {
        const payload = (command as any).payload;
        const validation = this.schema.safeParse(payload);

        if (!validation.success)
        {
            throw new BadRequestException(validation.error.errors);
        }

        return payload as Q;
    }

    abstract execute(command: T): Promise<any>;
}

export default ValidatedHandler;
