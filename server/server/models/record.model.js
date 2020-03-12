import mongoose from 'mongoose';
import { Role } from './role.model';

const recordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator(firstName) {
        return (new RegExp(/^([a-zA-Z]+)$/).test(firstName.trim()));
      }
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator(lastName) {
        return new RegExp(/^([a-zA-Z]+)$/).test(lastName.trim());
      }
    },
  },
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
  role: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
}, {
  versionKey: false
});

recordSchema.post('validate', (err, doc, next) => {
  console.log(err, doc);
  if (err) {
    console.log(err);
    next(new Error(err + '=>' + err));
  } else {
    next();
  }
});

export const Record = mongoose.model('Record', recordSchema);
