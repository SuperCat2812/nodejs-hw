import { model, Schema } from 'mongoose';

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const Note = model('note', noteSchema);
export default Note;
