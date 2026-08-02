import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNotesById,
  updateNote,
} from '../controllers/notesController.js';

const noteRouter = Router();

noteRouter.get('/', getAllNotes);
noteRouter.get('/:noteId', getNotesById);

noteRouter.post('/', createNote);
noteRouter.patch('/:noteId', updateNote);
noteRouter.delete('/:noteId', deleteNote);

export default noteRouter;
