import Router from 'express';
import {upload} from '../middlewares/upload.middleware.js';
import { evaluateResumeController, matchResumeController } from '../controllers/resume.controller.js';

const router = Router();

router.post('/evaluate', upload.single('resume'), evaluateResumeController)
router.post('/match', upload.single('resume'), matchResumeController)

export default router;