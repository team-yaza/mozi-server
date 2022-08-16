import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

const User = mongoose.model('User', userSchema);

export default User;
