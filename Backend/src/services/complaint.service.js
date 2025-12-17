import Complaint from '../models/Complaint.model.js';
import path from 'path'; // <--- pastikan ini ada

export const createComplaint = async (data) => {
  if (data.attachment) {
    data.attachment = `/uploads/${data.attachment.split(path.sep).pop()}`;
  }
  const complaint = new Complaint(data);
  return complaint.save();
};

export const updateComplaint = async (id, data) => {
  if (data.attachment) {
    data.attachment = `/uploads/${data.attachment.split(path.sep).pop()}`;
  }
  return Complaint.findByIdAndUpdate(id, data, { new: true });
};

export const getComplaintsByUserId = async (userId) => {
  return Complaint.find({ userId }).sort({ date: -1 });
};

export const deleteComplaint = async (id) => {
  return Complaint.findByIdAndDelete(id);
};