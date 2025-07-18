<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const prices = ref(null)
const loading = ref(true)
let intervalId = null

async function fetchPrices() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,bitcoin-cash&vs_currencies=usd&include_24hr_change=true'
    )
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    prices.value = data
  } catch (e) {
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPrices()
  intervalId = setInterval(fetchPrices, 15000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const coinNames = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  ripple: 'XRP',
  litecoin: 'LTC',
  'bitcoin-cash': 'BCH',
}
</script>

<template>
  <div class="relative w-full overflow-hidden bg-white border-b border-gray-200 h-8">
    <div v-if="loading" class="py-2 px-5 text-gray-500">Loading...</div>
    <div
      v-else
      class="flex flex-nowrap items-center whitespace-nowrap animate-ticker"
      :style="{ animationDuration: '30s' }"
    >
      <div
        v-for="(data, coin) in prices"
        :key="coin"
        class="inline-flex items-center px-6 py-2 border-r border-gray-100 min-w-max"
      >
        <span class="font-bold text-sm">{{ coinNames[coin] }}/USD</span>
        <span class="ml-1 text-sm">{{ data.usd.toLocaleString() }}</span>
        <span
          :class="{
            'text-green-500/80': data.usd_24h_change > 0,
            'text-red-500': data.usd_24h_change < 0
          }"
          class="pl-3 font-thin"
        >
          {{ data.usd_24h_change > 0 ? '+' : '' }}{{ data.usd_24h_change.toFixed(2) }}%
        </span>
      </div>
      <div
        v-for="(data, coin) in prices"
        :key="coin + '-dup'"
        class="inline-flex items-center px-6 py-2 border-r border-gray-100 min-w-max"
      >
        <span class="font-bold text-sm">{{ coinNames[coin] }}/USD</span>
        <span class="ml-1 text-sm">{{ data.usd.toLocaleString() }}</span>
        <span
          :class="{
            'text-green-500': data.usd_24h_change > 0,
            'text-red-500': data.usd_24h_change < 0
          }"
          class="pl-3 font-thin"
        >
          {{ data.usd_24h_change > 0 ? '+' : '' }}{{ data.usd_24h_change.toFixed(2) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ticker {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
.animate-ticker {
  display: flex;
  animation: ticker linear infinite;
}
</style> 