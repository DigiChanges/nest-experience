import { z } from 'zod';

export const MultipartFileSchemaValidation = z.object({
    fieldname: z.string().min(3).max(30),
    originalFilename: z.string().min(5).max(300),
    filename: z.string().min(2).max(300),
    encoding: z.string().min(2).max(300), // TODO: Add encoding enum
    mimetype: z.string().min(5).max(300),
    path: z.string().min(5).max(300),
    size: z.number()
});
