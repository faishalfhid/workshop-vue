<script setup>
  import Navbar from './components/Navbar.vue';
  import InputBox from './components/InputBox.vue';
  import MessageList from './components/MessageList.vue';
  import { ref, nextTick } from 'vue'
  import { sendMessage,submitVideo } from './api.js'

const videoTitle = ref('')
const videoUrl = ref('')
const videoSelected = ref(false)
const urlValid = ref(true)

// function validateUrl() {
//   const youtubeRegex =
//     /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{6,}/

//   urlValid.value = youtubeRegex.test(videoUrl.value)
// }

const isLoadingVideo = ref(false)

const messages = ref([])
const isTyping = ref(false)
const chatContainer = ref(null)

async function startChat() {
  isLoadingVideo.value = true

  try {
    const response = await submitVideo(videoUrl.value, videoTitle.value)
    videoSelected.value = true

    messages.value = [
      {
        id: 1,
        from: 'bot',
        text: response
      }
    ]
  } catch (err) {
    alert("❌ Gagal mengirim data ke server.")
  } finally {
    isLoadingVideo.value = false
  }
}


function resetVideo() {
  videoSelected.value = false
  videoTitle.value = ''
  videoUrl.value = ''
}

function scrollToBottom() {
  nextTick(() => {
    const el = chatContainer.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

async function handleSend(text) {
  messages.value.push({ id: Date.now(), from: 'user', text })
  scrollToBottom()

  isTyping.value = true
  scrollToBottom()

  try {
    // Kirim ke n8n webhook
    const botReply = await sendMessage(text)

    // Tambahkan respon dari bot
    messages.value.push({
      id: Date.now() + 1,
      from: 'bot',
      text: botReply
    })
  } catch (error) {
    messages.value.push({
      id: Date.now() + 2,
      from: 'bot',
      text: '⚠️ Gagal menghubungi server. Coba lagi nanti.'
    })
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}
</script>

<template>
  <div>
    <Navbar />
    <div class="flex flex-col h-screen bg-gray-50 pt-16">
      <!-- Main content goes here -->
      <!-- <MessageList />
      <InputBox/> -->
      <div v-if="!videoSelected" class="flex flex-col items-center justify-center h-full p-6">
      <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
        <h2 class="text-xl font-semibold text-center">Masukkan Informasi Video</h2>

      <input
        v-model="videoTitle"
        placeholder="Judul Video"
        class="border w-full p-2 rounded-lg text-sm"
      />

      <input
        v-model="videoUrl"
        @input="validateUrl"
        placeholder="URL YouTube"
        class="border w-full p-2 rounded-lg text-sm"
        :class="!urlValid ? 'border-red-500' : ''"
      />

      <p v-if="!urlValid" class="text-red-500 text-sm">
        ❌ URL YouTube tidak valid
      </p>

      <button
        @click="startChat"
        :disabled="!videoTitle || !videoUrl || !urlValid || isLoadingVideo"
        class="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        <span v-if="!isLoadingVideo">Mulai Chat</span>
        <span v-else>Mengirim...</span>
      </button>

      </div>
    </div>

     <div v-else class="flex flex-col h-full fixed w-full">
      <header class="p-4 bg-white shadow-sm flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold">Judul video: {{ videoTitle }}</h2>
          <p class="text-sm text-gray-500 truncate w-64">URL Video: {{ videoUrl }}</p>
        </div>
        <button
          @click="resetVideo"
          class="text-sm bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white transition"
        >
          Ganti Video
        </button>
      </header>

      <main ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 pb-40">
        <MessageList :messages="messages" />

        <!-- Typing animation -->
        <div v-if="isTyping" class="flex items-center space-x-2 text-gray-500 text-sm">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          <span>Bot sedang mengetik...</span>
        </div>
      </main>

      <InputBox @send="handleSend" />
    </div>
      
    </div>
  </div>
</template>

<style scoped>

</style>
