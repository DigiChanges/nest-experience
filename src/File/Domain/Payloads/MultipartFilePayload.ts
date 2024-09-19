
interface MultipartFilePayload
{
  fieldname: string;
  originalFilename: string;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  isPublic?: boolean;
  isOptimized?: boolean;
  isOriginalName?: boolean;
}

export default MultipartFilePayload;
