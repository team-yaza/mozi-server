import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    index: {
      type: Number,
    },
    headers: {
      type: [{ headerId: mongoose.Schema.Types.ObjectId, title: String, index: Number }],
      default: [],
      ref: 'Header',
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
