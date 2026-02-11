import express from 'express';
import { getProfile, updateProfile, getAllUsers, updateUserRole, deleteUser } from '../controllers/userController.js';
import { protect, authorize } from '../backend/middleware/authMiddleware.js';
import { validateUpdateProfile } from '../backend/middleware/validation.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, validateUpdateProfile, updateProfile);

router.get('/', protect, authorize('admin', 'moderator'), getAllUsers);
router.put('/:userId/role', protect, authorize('admin'), updateUserRole);
router.delete('/:userId', protect, authorize('admin'), deleteUser);

export default router;