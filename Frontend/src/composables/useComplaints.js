import { ref } from 'vue';
import { axios } from '../plugins/axios';

export default function useComplaints() {
  const complaints = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Ambil semua keluhan
  const fetchComplaints = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get('/complaints'); // leading slash tetap
      complaints.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  // Tambah keluhan baru
  const createComplaint = async (complaintData) => {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append('title', complaintData.title);
      formData.append('category', complaintData.category);
      formData.append('text', complaintData.text);
      if (complaintData.attachment instanceof File) {
        formData.append('attachment', complaintData.attachment);
      }

      const response = await axios.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      complaints.value.push(response.data);
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  // Update keluhan
  const updateComplaint = async (id, complaintData) => {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append('title', complaintData.title);
      formData.append('category', complaintData.category);
      formData.append('text', complaintData.text);
      if (complaintData.attachment instanceof File) {
        formData.append('attachment', complaintData.attachment);
      }

      const response = await axios.put(`/complaints/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // update lokal array
      const index = complaints.value.findIndex(c => c._id === id);
      if (index !== -1) complaints.value[index] = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  // Hapus keluhan
  const deleteComplaint = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`/complaints/${id}`);
      complaints.value = complaints.value.filter(c => c._id !== id);
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    complaints,
    loading,
    error,
    fetchComplaints,
    createComplaint,
    updateComplaint,
    deleteComplaint,
  };
}