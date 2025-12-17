import Complaint from '../models/Complaint.model.js';

// createComplaint
export const createComplaint = async (data) => {
  if (data.attachment) {
    // Ambil nama file saja, simpan path relatif dari root
    data.attachment = `/uploads/${data.attachment.split('/').pop()}`;
  }
  const complaint = new Complaint(data);
  return complaint.save();
};

// updateComplaint
export const updateComplaint = async (id, data) => {
  if (data.attachment) {
    data.attachment = `/uploads/${data.attachment.split('/').pop()}`;
  }
  return Complaint.findByIdAndUpdate(id, data, { new: true });
};

export const getComplaintsByUserId = async (userId) => {
  return await Complaint.find({ userId });
};

export const deleteComplaintById = async (id) => {
  return await Complaint.findByIdAndDelete(id);
};
