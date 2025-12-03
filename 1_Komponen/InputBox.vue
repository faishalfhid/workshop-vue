<template>
  <div class="fixed bottom-0 left-0 w-full p-4 flex gap-2 pl-5 pr-5 bg-white shadow-lg">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Tulis pesan..."
      class="text-black border rounded-lg p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      @click="sendMessage"
      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Kirim
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const emit = defineEmits(['send'])

function sendMessage() {
  const text = message.value.trim()
  if (!text) return
  emit('send', text)
  message.value = '' // reset input setelah kirim
}
</script>
