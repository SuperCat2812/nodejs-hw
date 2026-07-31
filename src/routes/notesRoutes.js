import { Router } from 'express';
import {
  addNote,
  deleteNote,
  getNotes,
  getNotesId,
  updateNote,
} from '../controllers/notesControllers.js';

const noteRouter = Router();

noteRouter.get('/', getNotes);
noteRouter.get('/:noteId', getNotesId);

noteRouter.post('/', addNote);
noteRouter.patch('/:noteId', updateNote);
noteRouter.delete('/:noteId', deleteNote);

export default noteRouter;
