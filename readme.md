
---

# workshop-vue

Repositori ini berisi kode untuk workshop **“Building Intelligent Chat Interfaces with Vue.js and n8n AI API”** — mencakup setup komponen, layout, dan koneksi ke backend API.

## 📂 Struktur Direktori

```
/  (root)
├─ 1_Komponen/         # Komponen Vue: Navbar, InputBox, MessageList, dll
├─ 2_API/              # File API (axios-based) untuk kirim data ke webhook
├─ 3_Layouting/        # Layout utama: App.vue — menggabungkan semua komponen & logic  
├─ .DS_Store           # file system (abaikan)  
├─ readme.md           # dokumentasi ini
```

---

## 🚀 Fitur & Alur Aplikasi

* **Input video (YouTube URL + Judul)** — user memasukkan informasi video.
* **Submit video ke backend** via API → backend (webhook n8n) memproses video, kemudian mengirimkan hasil.
* **Chat interface** — setelah video dikirim: tampilkan chat UI; user bisa mengetik pesan; pesan dikirim ke backend dan bot merespon.
* **Komponen UI modular** — menggunakan komponen `Navbar`, `InputBox`, `MessageList` agar kode terstruktur dan mudah dipahami.
* **UX: loading, typing indicator, scroll otomatis** — agar interaksi terasa seperti chat pada umumnya.

---

## 🧩 Komponen Utama

Penjelasan singkat setiap bagian di repo:

* **1_Komponen** — folder berisi komponen Vue:

  * `Navbar.vue` — header / bar atas dengan logo & nama aplikasi.
  * `InputBox.vue` — input chat user + tombol kirim.
  * `MessageList.vue` — menampilkan daftar pesan (user & bot), mendukung Markdown & sanitasi HTML.

* **2_API/api.js** — berisi fungsi untuk berkomunikasi dengan server (webhook):

  * `submitVideo(url, title)` — kirim data video ke server.
  * `sendMessage(text)` — kirim pesan chat ke server & mendapatkan balasan dari bot.

* **3_Layouting / App.vue** — komponen utama aplikasi; menggabungkan komponen UI, state management (reactive), dan logic untuk alur video → chat → pesan.

---

## 🛠️ Cara Instal & Jalankan

1. Clone repository

   ```bash
   git clone https://github.com/faishalfhid/workshop-vue.git
   cd workshop-vue
   ```

2. Install dependencies (misalnya `vue`, `axios`, dll)

   ```bash
   npm install
   ```

3. Jalankan development server (jika menggunakan Vite / Vue CLI)

   ```bash
   npm run dev
   ```

4. Buka browser ke `http://localhost:…` sesuai output server

---

## 📄 Penjelasan API (2_API/api.js)

Sebelum menggunakan API, pastikan menjalankan:

```bash
npm install axios
```

Kode `api.js`:

```js
import axios from 'axios'

const BASE_URL = 'https://faishalfhid.app.n8n.cloud/webhook'

export async function sendMessage(text) { … }
export async function submitVideo(url, title) { … }
```

* `submitVideo(url, title)` — mengirim HTTP POST berisi `{ url, title }`, menerima response dari server.
* `sendMessage(text)` — mengirim pesan chat ke server, menerima balasan bot.
* Error handling sudah ada — jika request gagal, fungsi mengembalikan pesan fallback.

---

## 🔄 Flow Aplikasi — Secara Ringkas

1. User input video → click "Mulai Chat"
2. `submitVideo()` dipanggil → jika sukses → `videoSelected = true` → tampilkan chat UI
3. Pesan awal dari bot (hasil proses video) ditampilkan
4. User mengetik pesan di `InputBox` → `handleSend()` dipanggil → `sendMessage()` ke API
5. Bot merespon → pesan tampil di `MessageList` → otomatis scroll ke bawah
6. User bisa klik “Ganti Video” untuk ulang dari awal

---

## ✅ Catatan & Tips

* Pastikan server backend / webhook aktif dan bisa diakses dari origin aplikasi
* Gunakan sanitasi & rendering Markdown di `MessageList` agar aman dari XSS (sudah menggunakan `markdown-it` + `dompurify`)
* Komponen UI sudah modular — mudah untuk diubah gaya, tema, atau diganti layout
* Bisa diperluas: autentikasi, penyimpanan chat, integrasi video player, dsb.

---

## 🎯 Tujuan Repositori Ini

Repositori ini cocok untuk:

* Belajar struktur proyek Vue modular
* Mempelajari integrasi frontend dengan API backend
* Praktik membuat UI chat interaktif
* Workshop / materi belajar bersama

---
