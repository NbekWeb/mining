<template>
  <div
    v-if="!loading && depositWallets.length === 0 && deposits.length === 0"
    class="text-center py-12"
  >
    <p class="text-gray-500">No deposit wallets available</p>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  depositWallets: {
    type: Array,
    required: true,
  },
  deposits: {
    type: Array,
    required: true,
  },
});
</script> 