import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const noteRouter = Router();

noteRouter.get('/', getAllNotes);
noteRouter.get('/:noteId', getNoteById);

noteRouter.post('/', createNote);
noteRouter.patch('/:noteId', updateNote);
noteRouter.delete('/:noteId', deleteNote);

export default noteRouter;
