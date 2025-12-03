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
        <!-- Avatar bot -->
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          🤖
        </div>
        <!-- Bubble -->
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
/* agar list / bold / heading markdown lebih rapi */
.prose p {
  margin: 0.25rem 0;
}
</style>