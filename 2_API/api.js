import axios from 'axios'

const BASE_URL = 'https://faishalfhid.app.n8n.cloud/webhook'

// === Kirim pesan text ke bot ===
export async function sendMessage(text) {
  try {
    const response = await axios.post(`${BASE_URL}/input-message`, { text })

    if (response.data?.message) {
      return response.data.message
    }

    console.warn('Response tidak sesuai:', response.data)
    return '⚠️ Maaf, tidak ada respons dari bot.'
  } catch (error) {
    console.error('Error saat kirim pesan:', error)
    return '⚠️ Maaf, terjadi kesalahan koneksi.'
  }
}

// === Kirim data video (URL + title) ===
export async function submitVideo(url, title) {
  try {
    const response = await axios.post(`${BASE_URL}/submit-video`, {
      url,
      title
    })

    if (response.data?.output) {
      return response.data.output
    }

    console.warn('Response tidak sesuai:', response.data)
    return '⚠️ Maaf, respons API tidak valid.'
  } catch (error) {
    console.error('Error saat submit video:', error)
    return '⚠️ Maaf, terjadi kesalahan koneksi.'
  }
}
