import mongoose from 'mongoose';

interface Todo {
  title: string;
  description: string;
  done: boolean;
  location: {
    type: 'Point';
    coolrdinate: [number];
    name: string;
  };
}

const todoSchema = new mongoose.Schema<Todo>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    done: {
      type: Boolean,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      name: {
        type: String,
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  {
    timestamps: true,
  },
);

todoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

todoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

const Todo = mongoose.model<Todo>('Todo', todoSchema);

export default Todo;
