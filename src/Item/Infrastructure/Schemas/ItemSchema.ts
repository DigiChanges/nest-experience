import * as mongoose from 'mongoose';
import { randomUUID } from 'crypto';

import Item from '../../Domain/Entities/Item';
import IItemDomain from '../../Domain/Entities/IItemDomain';

export type ItemMongooseDocument = Document & IItemDomain;

const ItemSchema: any = new mongoose.Schema<IItemDomain & { _id: string }>({
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    description: { type: Number, required: true }
}, { timestamps: true });

ItemSchema.loadClass(Item);

ItemSchema.virtual('id').get(function()
{
  return this._id;
});

ItemSchema.set('toJSON', { virtuals: true });
ItemSchema.set('toObject', { virtuals: true });

export default ItemSchema;
