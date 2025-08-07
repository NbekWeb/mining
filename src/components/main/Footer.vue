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
            class="w-6 h-6 !text-white/90 group-hover:text-white text-2xl" 
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
import { 
  InstagramOutlined, 
  FacebookOutlined, 
  YoutubeOutlined, 
  TwitterOutlined
} from "@ant-design/icons-vue";
import Logo from "../logo.vue";
import useMine from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";
import { onMounted, h } from "vue";

const mineStore = useMine();
const { networks } = storeToRefs(mineStore);

// TikTok icon component (custom since Ant Design doesn't have TikTok icon)
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

// Telegram icon component (custom since Ant Design doesn't have Telegram icon)
const TelegramIcon = {
  render() {
    return h('svg', { 
      class: 'w-6 h-6 text-gray-700', 
      viewBox: '0 0 24 24', 
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', { 
        d: 'M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ]);
  }
};

// Function to get the appropriate icon component based on network name
const getNetworkIcon = (networkName) => {
  const iconMap = {
    instagram: InstagramOutlined,
    facebook: FacebookOutlined,
    youtube: YoutubeOutlined,
    x: TwitterOutlined,
    twitter: TwitterOutlined,
    tiktok: TikTokIcon,
    telegram: TelegramIcon
  };
  
  return iconMap[networkName.toLowerCase()] || InstagramOutlined; // Default to Instagram if network not found
};

// Fetch networks data when component mounts
onMounted(() => {
  mineStore.getNetworks();
});
</script>
