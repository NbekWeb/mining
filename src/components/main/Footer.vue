<template>
  <footer class="w-full bg-[#171717]">
    <div class="container mx-auto p-5">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <Logo class="text-5xl text-white" />
        <!-- <img src="../../assets/img/logo.png" alt="MA Logo" class="h-16" /> -->
      </div>
      <!-- Copyright Text -->
      <div class="text-center text-white mb-6">
        <p class="text-sm opacity-50">© 2025 CRYPTO MINING LLC.</p>
        <p class="text-sm opacity-50">All rights reserved</p>
      </div>
      <!-- Divider -->
      <div class="w-full h-px bg-gray-600 mb-6"></div>
      <!-- Social Media Icons -->
      <div class="flex justify-center gap-4">
        <a
          v-for="network in networks"
          :key="network.id"
          :href="network.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 bg-white group rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          <component 
            :is="getNetworkIcon(network.network)" 
            class="w-6 h-6 text-white/90 group-hover:text-white" 
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
import { Instagram, Facebook, Youtube, X } from "lucide-vue-next";
import Logo from "../logo.vue";
import useMine from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";
import { onMounted, h } from "vue";

const mineStore = useMine();
const { networks } = storeToRefs(mineStore);

// TikTok icon component
const TikTokIcon = {
  render() {
    return h('svg', { 
      class: 'w-6 h-6 text-gray-700', 
      viewBox: '0 0 24 24', 
      fill: 'currentColor' 
    }, [
      h('path', { 
        d: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' 
      })
    ]);
  }
};

// Function to get the appropriate icon component based on network name
const getNetworkIcon = (networkName) => {
  const iconMap = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    x: X,
    twitter: X,
    tiktok: TikTokIcon
  };
  
  return iconMap[networkName.toLowerCase()] || Instagram; // Default to Instagram if network not found
};

// Fetch networks data when component mounts
onMounted(() => {
  mineStore.getNetworks();
});
</script>
