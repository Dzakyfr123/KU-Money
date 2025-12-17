import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  text: { type: String, required: true },
  attachment: { type: String },
  status: { type: String, default: 'Ditinjau' },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
  date: { type: Date, default: Date.now },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
