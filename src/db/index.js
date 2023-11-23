import mongoose from 'mongoose';

export const connectToDB = (url = process.env.MONGODB_URL, opts = {}) => {
  return mongoose.connect(url, {
    ...opts
  });
};