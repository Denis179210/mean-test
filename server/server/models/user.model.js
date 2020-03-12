import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from '../config';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(email) {
        return new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(email.trim());
      }
    },
  },
  password: {
    type: String,
    set: (p) => bcrypt.hashSync(p, config.salt)
  }
}, {
  versionKey: false
});

userSchema.methods.validPassword = function(password) {
  return  bcrypt.compareSync(password, this.password);
}

export const User = mongoose.model('User', userSchema);
