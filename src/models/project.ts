import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  headers: {
    type: [{ headerId: mongoose.Types.ObjectId, title: String, index: Number }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
