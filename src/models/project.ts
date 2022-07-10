import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  index: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Header', projectSchema);

export default Project;
