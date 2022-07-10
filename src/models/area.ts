import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  projects: {},
  index: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Area = mongoose.model('Area', areaSchema);

export default Area;
