import mongoose from 'mongoose';

export default async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
