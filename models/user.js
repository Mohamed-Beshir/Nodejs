

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]  
});

const User = mongoose.model('User', userSchema);

export default User;
