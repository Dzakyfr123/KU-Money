import { Router } from 'express';
import * as complaintController from '../controllers/complaint/complaint.controller.js';
import { authMiddleware } from '../middlewares/auth/auth.middleware.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

const router = Router();
router.use(authMiddleware);

router.get('/', complaintController.getComplaints);
router.post('/', upload.single('attachment'), complaintController.createComplaint);
router.put('/:id', upload.single('attachment'), complaintController.updateComplaint);
router.delete('/:id', complaintController.deleteComplaint);

export default router;
