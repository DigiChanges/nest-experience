import { z } from 'zod';

export const ItemSchemaSaveValidation = z.object({
    name: z.string().min(2).max(20),
    description: z.number().min(1).max(100)
});
