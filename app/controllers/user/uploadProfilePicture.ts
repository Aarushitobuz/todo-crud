// import { Request, Response, NextFunction } from 'express';
// import User from '../../models/User';

// export const uploadProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = (req as any).user.userId;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { profilePicture: file.filename },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({
//       message: 'Profile picture uploaded successfully',
//       profilePicture: file.filename,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';

export const uploadProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imagePath = `uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imagePath },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile picture updated', profilePicture: imagePath });
  } catch (err) {
      next(err);
  }
};

