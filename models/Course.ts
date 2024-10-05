import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  credits: { type: Number, required: true },
  department: { type: String, required: true },
  // Add more fields as needed
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);