import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },
  },
  { versionKey: false, timestamps: true },
);

noteSchema.index({ tag: 1 });

const Note = model('note', noteSchema);
export default Note;
