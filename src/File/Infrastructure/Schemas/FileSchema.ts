import * as mongoose from 'mongoose';

import File from '../../Domain/Entities/File';
import IFileDomain from '../../Domain/Entities/IFileDomain';

const { Schema } = mongoose;
export type FileMongooseDocument = mongoose.Document & IFileDomain;

const FileSchema = new Schema<IFileDomain & { _id: string }>({
    _id: { type: Schema.Types.String },
    originalFileId: { type: Schema.Types.String },
    versionUUID: { type: Schema.Types.String },
    fileName: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
    originalName: { type: Schema.Types.String, required: true },
    mimeType: { type: Schema.Types.String, required: true },
    path: { type: Schema.Types.String, required: true },
    extension: { type: Schema.Types.String, required: true },
    size: { type: Schema.Types.Number, required: true },
    version: { type: Schema.Types.Number, required: true, default: 1 },
    isPublic: { type: Schema.Types.Boolean, required: true },
    isOptimized: { type: Schema.Types.Boolean, required: true }
}, { timestamps: true });

FileSchema.loadClass(File);

FileSchema.virtual('id').get(function()
{
  return this._id;
});

// FileSchema.pre('save', function(next: any)
// {
//   if (this.isNew && !this.originalFileId)
//   {
//     this.originalFileId = this._id;
//   }
//   next();
// });

FileSchema.set('toJSON', { virtuals: true });
FileSchema.set('toObject', { virtuals: true });

export default FileSchema;
