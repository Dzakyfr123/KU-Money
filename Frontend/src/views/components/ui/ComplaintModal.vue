<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div
        class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl"
      >
        <h2 class="text-xl font-bold text-gray-800">
          {{ isEdit ? 'Edit Keluhan' : 'Tambah Keluhan' }}
        </h2>
        <button
          @click="$emit('close')"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <i class="mdi mdi-close text-xl"></i>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2">Judul Keluhan</label>
          <input
            type="text"
            v-model="form.title"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2">Kategori</label>
          <select
            v-model="form.category"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Bug">Bug</option>
            <option value="Fitur">Fitur</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2">Deskripsi</label>
          <textarea
            v-model="form.text"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition resize-none"
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2">Lampiran</label>
          <input
            type="file"
            @change="handleFileUpload"
            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        <!-- Actions -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {{ isEdit ? 'Simpan' : 'Kirim' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  complaint: Object,
});

const emit = defineEmits(['close', 'submit']);

const form = ref({
  id: null,
  title: '',
  category: '',
  text: '',
  attachment: null,
});

const isEdit = ref(false);

watch(
  () => props.complaint,
  (newComplaint) => {
    if (newComplaint) {
      form.value = { ...newComplaint };
      isEdit.value = true;
    } else {
      form.value = { id: null, title: '', category: '', text: '', attachment: null };
      isEdit.value = false;
    }
  },
  { immediate: true }
);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.attachment = file; // simpan File object
  }
};

const handleSubmit = () => {
  emit('submit', { ...form.value });
  emit('close');
};
</script>