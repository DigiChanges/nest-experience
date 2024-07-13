import * as mongoose from 'mongoose';
import Item from '../../Domain/Entities/Item';

const ItemSchema: any = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true }
}, { timestamps: true });

ItemSchema.loadClass(Item);

export default ItemSchema;
