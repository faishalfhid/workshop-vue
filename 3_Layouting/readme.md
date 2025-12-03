---

## 🧩 App.vue — Komponen Utama UI Chatbot

Pada bagian ini, kita menghubungkan UI dengan fungsi API (`sendMessage` & `submitVideo`).
App.vue mengatur alur aplikasi:

1️⃣ User memasukkan informasi video → Kirim ke server
2️⃣ Server melakukan pemrosesan → Kirim hasil awal chat
3️⃣ User dapat melanjutkan percakapan melalui InputBox
4️⃣ Pesan akan tampil di MessageList

---

### ✨ Import Komponen & API

```vue
<script setup>
import Navbar from './components/Navbar.vue';
import InputBox from './components/InputBox.vue';
import MessageList from './components/MessageList.vue';
import { ref, nextTick } from 'vue'
import { sendMessage, submitVideo } from './api.js'
```

📝 Penjelasan:

* `Navbar` → tampilan atas aplikasi
* `InputBox` → input chat user
* `MessageList` → daftar pesan dalam percakapan
* `sendMessage()` & `submitVideo()` → komunikasi ke API

---

### 🧠 State Management (ref)

```js
const videoTitle = ref('')
const videoUrl = ref('')
const videoSelected = ref(false)
const urlValid = ref(true)
const isLoadingVideo = ref(false)

const messages = ref([])
const isTyping = ref(false)
const chatContainer = ref(null)
```

📌 Apa saja yang disimpan dalam state?

| Variabel                 | Fungsi                                         |
| ------------------------ | ---------------------------------------------- |
| `videoTitle`, `videoUrl` | Menyimpan input awal informasi video           |
| `videoSelected`          | Menentukan tampilan *input* atau *chat*        |
| `messages`               | List pesan chat (user & bot)                   |
| `isTyping`               | Animasi bot mengetik                           |
| `isLoadingVideo`         | Menampilkan loading saat submit video          |
| `urlValid`               | Validasi URL YouTube (bisa diaktifkan kembali) |

---

### 🚀 Kirim Informasi Video ke Server

```js
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
```

Alur:

1. User klik **Mulai Chat**
2. Data `title + url` dikirim via API
3. Response awal dari server masuk sebagai pesan bot pertama

---

### ♻ Reset Input Video

```js
function resetVideo() {
  videoSelected.value = false
  videoTitle.value = ''
  videoUrl.value = ''
}
```

➡️ User bisa mengganti video kapan saja

---

### 🔽 Scroll otomatis ke pesan terakhir

```js
function scrollToBottom() {
  nextTick(() => {
    const el = chatContainer.value
    if (el) el.scrollTop = el.scrollHeight
  })
}
```

---

### 📨 Kirim Pesan Chat

```js
async function handleSend(text) {
  messages.value.push({ id: Date.now(), from: 'user', text })
  scrollToBottom()

  isTyping.value = true

  try {
    const botReply = await sendMessage(text)

    messages.value.push({
      id: Date.now() + 1,
      from: 'bot',
      text: botReply
    })
  } catch {
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
```

✔ Pesan user langsung tampil
✔ API dipanggil untuk mendapatkan balasan bot
✔ Bot mengetik dengan animasi pending

---

## 🎨 Bagian Template (UI)

### 🧱 Halaman Input Video (sebelum chat dimulai)

```vue
<div v-if="!videoSelected" class="flex flex-col items-center justify-center h-full p-6">
  <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
```

Menampilkan:

* Input Judul
* Input URL
* Tombol “Mulai Chat”
* Validasi URL (opsional)

---

### 💬 Tampilan Chat Setelah Video Dikirim

```vue
<div v-else class="flex flex-col h-full fixed w-full">
```

Berisi:

* Header: Info video + tombol ganti video
* MessageList → tampilan chat
* InputBox → kotak chat user

Animasi bot mengetik:

```vue
<div v-if="isTyping" class="flex items-center space-x-2 text-gray-500 text-sm">
  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  ...
</div>
```

---

## 📌 Alur tampilan

```mermaid
flowchart TD
A[User Input Video Title & URL] --> B[Klik Mulai Chat]
B --> C[submitVideo() ke API]
C --> D[Tampilan Chat Muncul]
D --> E[User Kirim Pesan]
E --> F[sendMessage() ke API]
F --> G[Pesan Bot Ditampilkan]
```

---

## 🎯 Kesimpulan Utama

| Fitur             | Keterangan                             |
| ----------------- | -------------------------------------- |
| UI Dinamis        | Berubah sesuai kondisi `videoSelected` |
| API Integration   | Dua request: submit video & chat       |
| UX Enhancements   | Auto-scroll & bot typing animation     |
| Komponen reusable | Navbar, MessageList, InputBox          |

---

Jika kamu ingin, saya bisa bantu:

✔ Gabungkan dokumentasi `api.js`, `App.vue`, dan komponen menjadi satu **README.md final rapi**
✔ Tambahkan **preview UI** (GIF / screenshot)
✔ Tambahkan bagian **Deployment** (Netlify / Vercel)
✔ Buat **struktur folder** untuk project Vue ini

Ingin saya langsung **rapikan seluruh README dan branding Inix Chatbot**? 😊
