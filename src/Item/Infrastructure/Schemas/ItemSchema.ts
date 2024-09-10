import { randomUUID } from 'crypto';

import * as mongoose from 'mongoose';

import IItemDomain from '../../Domain/Entities/IItemDomain';
import Item from '../../Domain/Entities/Item';

const { Schema } = mongoose;
export type ItemMongooseDocument = Document & IItemDomain;

const ItemSchema = new Schema<IItemDomain & { _id: string }>({
    _id: { type: Schema.Types.String, default: randomUUID },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.Number, required: true }
}, { timestamps: true });

ItemSchema.loadClass(Item);

ItemSchema.virtual('id').get(function()
{
  return this._id;
});

ItemSchema.set('toJSON', { virtuals: true });
ItemSchema.set('toObject', { virtuals: true });

export default ItemSchema;
