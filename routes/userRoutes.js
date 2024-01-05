

import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/searchByNameAndAge/:name/:age', userController.searchByNameAndAge);
router.get('/searchByAgeRange/:minAge/:maxAge', userController.searchByAgeRange);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserProfile/:id', userController.getUserProfile);

export default router;
