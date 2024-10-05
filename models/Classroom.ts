import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  building: { type: String, required: true },
  // Add more fields as needed
});

export default mongoose.models.Classroom || mongoose.model('Classroom', ClassroomSchema);