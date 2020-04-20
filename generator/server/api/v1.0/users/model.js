import mongoose, { Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
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

usersSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      email: this.email,
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
};

const model = mongoose.model('Users', usersSchema);

export const { schema } = model;
export default model;
