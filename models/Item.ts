import { Schema, model, Document } from 'mongoose';

interface IItem extends Document {
  text: string;
  done: boolean;
}

const itemSchema = new Schema<IItem>({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Item = model<IItem>('Item', itemSchema);

export default Item;
