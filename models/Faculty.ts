import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  // Add more fields as needed
});

export default mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);