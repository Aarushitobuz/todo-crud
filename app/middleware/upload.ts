// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/profile_photos/');
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = `${Date.now()}-${file.originalname}`;
//         cb(null, uniqueName);
//     },
// });

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname).toLowerCase();
//         if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//             return cb(new Error('Only images are allowed') as any, false);
//         }
//         cb(null, true);
//     },
//     limits: { fileSize: 2 * 1024 * 1024 },
// });

// export default upload;


import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
