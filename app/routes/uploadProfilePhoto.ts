// import express from 'express';
// import { authenticate } from '../middleware/auth';
// import upload from '../middleware/upload';
// import { uploadProfilePhoto } from '../controllers/user/uploadProfilePhoto';

// const router = express.Router();

// router.post(
//   '/upload-profile-photo',
//   authenticate,
//   upload.single('photo'),
//   uploadProfilePhoto
// );

// export default router;

import express from 'express';
import upload from '../middleware/upload';
import { uploadProfilePhoto } from '../controllers/user/uploadProfilePhoto';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/upload-photo', authenticate, upload.single('profilePhoto'), uploadProfilePhoto);

export default router;
