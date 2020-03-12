import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
}, {
  versionKey: false
});

export const Role = mongoose.model('Role', roleSchema);
