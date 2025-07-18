<template>
  <footer class="w-full bg-[#171717]">
    <div class="container mx-auto p-5">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="../../assets/img/logo.png" alt="MA Logo" class="h-16" />
      </div>
      <!-- Copyright Text -->
      <div class="text-center text-white mb-6">
        <p class="text-sm opacity-50">© 2025 CRYPTO MINING LLC.</p>
        <p class="text-sm opacity-50">All rights reserved</p>
      </div>
      <!-- Divider -->
      <div class="w-full h-px bg-gray-600 mb-6"></div>
      <!-- Social Media Icon -->
      <div class="flex justify-center">
        <a
          href="https://www.instagram.com/mining.base/"
          class="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-300"
        >
          <!-- Replace with a Telegram icon font or image as needed -->
          <Instagram class="w-6 h-6 text-white/90" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
// Instagram icon is now inline SVG
import { Instagram } from "lucide-vue-next";
</script>
