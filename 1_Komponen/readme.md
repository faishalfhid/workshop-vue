## 🏗️ Membuat Komponen UI (Navbar, InputBox, MessageList)

Pada bagian ini, kita akan membuat tiga komponen yang digunakan dalam tampilan chat:

1. **Navbar**
2. **InputBox**
3. **MessageList**

Untuk menjaga struktur rapi, buat folder:

```
src/
 └─ components/
     ├─ Navbar.vue
     ├─ InputBox.vue
     ├─ MessageList.vue
 └─ assets/
     └─ logo-inix.png
```

---

### 📌 Navbar Component

> Menampilkan brand/header aplikasi chatbot.

📍 **Tambahkan file: `src/components/Navbar.vue`**

```vue
<template>
  <nav class="bg-white shadow-sm fixed top-0 left-0 w-full z-50 pl-4 pr-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 relative">
      <div class="flex absolute inset-0 items-center h-16 justify-between">

        <!-- Logo / Brand -->
        <div class="flex items-center space-x-2">
          <img src="../assets/logo-inix.png" alt="Logo" class="h-8 w-8" />
          <span class="text-lg font-semibold text-gray-800">Inix Chatbot</span>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
```

🎯 Yang dipelajari:

* Memasang logo branding
* Navbar fixed position agar tetap di atas

---

### 📌 InputBox Component

> Input pesan user dan tombol kirim event ke parent (`App.vue`)

📍 **Tambahkan file: `src/components/InputBox.vue`**

```vue
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
  message.value = '' // reset
}
</script>
```

🎯 Yang dipelajari:

* `v-model` untuk input teks
* Event emitter ke parent

---

### 📌 MessageList Component (Markdown Support)

> Menampilkan daftar chat user ↔ bot dengan bubble style & markdown

#### 📦 Install dependency

```bash
npm install markdown-it dompurify
```

📍 **Tambahkan file: `src/components/MessageList.vue`**

```vue
<template>
  <div class="flex flex-col space-y-3">
    <div
      v-for="msg in messages"
      :key="msg.id"
      class="flex items-end"
      :class="msg.from === 'user' ? 'justify-end' : 'justify-start'"
    >
      <!-- Bot Message -->
      <div v-if="msg.from === 'bot'" class="flex items-start space-x-2 max-w-[80%]">
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          🤖
        </div>

        <div
          class="bg-gray-200 text-black px-3 py-2 rounded-2xl rounded-tl-none shadow-sm prose prose-sm max-w-none"
          v-html="renderMarkdown(msg.text)"
        ></div>
      </div>

      <!-- User Message -->
      <div v-else class="flex items-start space-x-2 max-w-[80%] flex-row-reverse">
        <div class="bg-blue-500 text-white px-3 py-2 rounded-2xl rounded-tr-none shadow-sm">
          {{ msg.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const md = new MarkdownIt({
  breaks: true,
  linkify: true
})

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

function renderMarkdown(text) {
  if (!text) return ""
  const html = md.render(text)
  return DOMPurify.sanitize(html)
}
</script>

<style>
.prose p {
  margin: 0.25rem 0;
}
</style>
```

🎯 Yang dipelajari:

* `v-for` rendering pesan
* Markdown → HTML + sanitized
* Alignment berbeda untuk bot vs user

---

## 🎉 Hasil Komponen UI

Semua komponen ini sekarang bisa dipakai di **App.vue** seperti:

```vue
<Navbar />
<MessageList :messages="messages" />
<InputBox @send="handleSend" />
```

---
