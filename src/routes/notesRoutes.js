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

const noteRouter = Router();

noteRouter.get(
  '/',
  celebrate(getAllNotesSchema, { abortEarly: false }),
  getAllNotes,
);
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
