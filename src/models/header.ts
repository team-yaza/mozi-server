import mongoose from 'mongoose';

const headerSchema = new mongoose.Schema({
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

const Header = mongoose.model('Header', headerSchema);

export default Header;
