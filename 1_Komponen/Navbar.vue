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
