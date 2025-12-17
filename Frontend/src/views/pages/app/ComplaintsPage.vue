<template>
  <div class="pb-20">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Keluhan</h2>
      <p class="text-gray-600 mt-1">Kelola keluhan Anda</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <i class="mdi mdi-loading mdi-spin text-4xl text-green-600 mb-2"></i>
      <p class="text-gray-600">Memuat keluhan...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="complaints.length === 0" class="bg-white rounded-xl p-12 text-center border border-gray-200">
      <i class="mdi mdi-file-document-outline text-6xl text-gray-300 mb-4"></i>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Belum ada keluhan</h3>
      <p class="text-gray-600 mb-6">Tambahkan keluhan pertama Anda</p>
      <button @click="openAddComplaintModal"
              class="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
        <i class="mdi mdi-plus mr-2"></i> Tambah Keluhan
      </button>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lampiran</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="(complaint, index) in complaints" :key="complaint.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm text-gray-500">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ complaint.title }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ complaint.category }}</td>
            <td class="px-6 py-4 text-sm">
              <a v-if="complaint.attachment" :href="`http://localhost:3000${complaint.attachment}`" rel="noreferrer" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                Lihat
              </a>
            </td>
            <td class="px-6 py-4 text-sm">
              <span :class="getStatusClass(complaint.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ complaint.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-medium">
              <button @click="openEditComplaintModal(complaint)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="handleDeleteComplaint(complaint)" class="text-red-600 hover:text-red-900 ml-4">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Floating Action Button -->
    <button @click="openAddComplaintModal"
            class="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition flex items-center justify-center z-40">
      <i class="mdi mdi-plus text-2xl"></i>
    </button>

    <!-- Modal -->
    <ComplaintModal
      :show="isModalOpen"
      :complaint="selectedComplaint"
      @close="closeModal"
      @submit="handleComplaintSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ComplaintModal from '@/views/components/ui/ComplaintModal.vue';
import useComplaints from '@/composables/useComplaints';

const { complaints, loading, error, fetchComplaints, createComplaint, updateComplaint, deleteComplaint } = useComplaints();
onMounted(fetchComplaints);

const isModalOpen = ref(false);
const selectedComplaint = ref(null);

const openAddComplaintModal = () => { selectedComplaint.value = null; isModalOpen.value = true; };
const openEditComplaintModal = (complaint) => { selectedComplaint.value = complaint; isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; };

const handleComplaintSubmit = async (complaintData) => {
  if (complaintData.id) await updateComplaint(complaintData.id, complaintData);
  else await createComplaint(complaintData);
  fetchComplaints();
};

const handleDeleteComplaint = async (complaint) => {
  if (confirm(`Yakin ingin menghapus keluhan: "${complaint.title}"?`)) {
    await deleteComplaint(complaint._id);
    fetchComplaints();
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Ditanggapi': return 'bg-yellow-100 text-yellow-800';
    case 'Ditinjau': return 'bg-blue-100 text-blue-800';
    case 'Selesai': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>
