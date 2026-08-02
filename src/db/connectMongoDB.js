import mongoose from 'mongoose';

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Successfully connected database');
  } catch (error) {
    console.log('Failed connect database', error);
    process.exit(1);
  }
};
export default connectDataBase;
