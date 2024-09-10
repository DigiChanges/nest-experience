
interface MultipartFilePayload
{
  fieldname: string;
  originalFilename: string;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
}

export default MultipartFilePayload;
