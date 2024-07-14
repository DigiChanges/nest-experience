import { z } from 'zod';

export const IdSchemaValidation = z.object({
    id: z.string().uuid()
});
