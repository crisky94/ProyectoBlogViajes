
import newEntryController from '../controllers/entries/newEntryController.js';
 import deleteEntryController from '../controllers/entries/deleteEntryController.js';
 import selectEntryById from '../../selectEntryById.js'

import express from 'express'
const router = express.Router();
import multer from 'multer';
const upload = multer({ dest: 'uploads/'});


router.post('/entries', upload.single('image'), newEntryController,

);

router.get("/recomendaciones/place/:entriesPlace", selectEntryById)

router.delete('/entries', upload.single(''), deleteEntryController)

  





export default router;