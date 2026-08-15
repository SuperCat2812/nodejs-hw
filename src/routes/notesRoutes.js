import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import authenticate from '../middleware/authenticate.js';

const noteRouter = Router();
noteRouter.use(authenticate);
noteRouter.get('/', celebrate(getAllNotesSchema), getAllNotes);
noteRouter.get(
  '/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  getNoteById,
);

noteRouter.post(
  '/',
  celebrate(createNoteSchema, { abortEarly: false }),
  createNote,
);
noteRouter.patch(
  '/:noteId',
  celebrate(updateNoteSchema, { abortEarly: false }),
  updateNote,
);
noteRouter.delete(
  '/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  deleteNote,
);

export default noteRouter;
