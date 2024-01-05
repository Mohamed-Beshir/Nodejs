


import User from '../models/user.js';
import Post from '../models/post.js';

const postController = {
  addPost: async (req, res) => {
    try {
      const { title, content, userID } = req.body;

      // Check if the user with the provided userID exists
      const user = await User.findById(userID);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newPost = await Post.create({ title, content, userID });
      user.posts.push(newPost._id);
      await user.save();

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Check if the authenticated user is the creator of the post
      if (post.userID.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }

      await post.remove();
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Check if the authenticated user is the owner of the post
      if (updatedPost.userID.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllPostsWithOwners: async (req, res) => {
    try {
      const posts = await Post.find().populate('userID');

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  sortPostsByDateDescending: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default postController;
