


import express from 'express';
import postController from '../controllers/postController.js';

const router = express.Router();

router.post('/add', postController.addPost);
router.delete('/delete/:id', postController.deletePost);
router.put('/update/:id', postController.updatePost);
router.get('/all', postController.getAllPosts);
router.get('/all-with-owners', postController.getAllPostsWithOwners);
router.get('/sort-by-date', postController.sortPostsByDateDescending);

export default router;
