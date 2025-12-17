import * as complaintService from '../../services/complaint.service.js';

export const createComplaint = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      userId: req.user.id,
      email: req.user.email,
      name: req.user.name,
      profilePicture: req.user.profilePicture,
      attachment: req.file ? req.file.path : undefined, // hanya path saja
    };
    const complaint = await complaintService.createComplaint(data);
    res.status(201).json(complaint);
  } catch (err) {
    next(err);
  }
};

export const updateComplaint = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      attachment: req.file ? req.file.path : undefined,
    };
    const complaint = await complaintService.updateComplaint(req.params.id, data);
    res.status(200).json(complaint);
  } catch (err) {
    next(err);
  }
};

export const deleteComplaint = async (req, res, next) => {
  try {
    await complaintService.deleteComplaint(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getComplaints = async (req, res, next) => {
  try {
    const complaints = await complaintService.getComplaintsByUserId(req.user.id);
    res.status(200).json(complaints);
  } catch (err) {
    next(err);
  }
};
