import { Schema, model } from 'mongoose';

const userSchema = Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function () {
  if (!this.username) this.username = this.email;
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('user', userSchema);
