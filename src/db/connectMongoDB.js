import mongoose from 'mongoose';

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Successfully connected database');
  } catch (error) {
    console.log('Failed connect database', error);
    throw error;
  }
};
export default connectDataBase;
