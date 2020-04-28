import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import InvalidUserError from './errors';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => isEmail(value),
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        /* eslint-disable no-param-reassign, no-underscore-dangle */
        delete ret._id;
      },
    },
  },
);

/* eslint-disable func-names */
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

userSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      tokens: this.tokens,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full
      ? {
          ...view,
          // add properties for a full view
        }
      : view;
  },
  async comparePassword(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  },
  async generateAuthToken() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, config.get('auth.salt'), {
      expiresIn: config.get('auth.ttl'),
    });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
  },
};

userSchema.statics = {
  async findByCredentials(email, password) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new InvalidUserError();
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new InvalidUserError();
    }

    return user;
  },
};

const model = mongoose.model('User', userSchema);

export const { schema } = model;
export default model;
