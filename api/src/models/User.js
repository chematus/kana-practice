import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },
    hashedPassword: String,
    stats: {
      picker: {
        correct: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
      },
      matcher: {
        correct: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
      },
      canvas: {
        total: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true },
);

UserSchema.methods.verifyPassword = function (pwd) {
  return bcrypt.compare(pwd, this.hashedPassword);
};

export default mongoose.model('User', UserSchema);
