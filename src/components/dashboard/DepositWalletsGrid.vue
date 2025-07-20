<template>
  <div v-if="depositWallets.length > 0" class="mb-8">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">
      Available Wallets
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="wallet in depositWallets"
        :key="wallet.id"
        class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
      >
        <!-- Coin info -->
        <div class="flex items-center justify-center mb-4">
          <img
            :src="wallet.coin.image"
            :alt="wallet.coin.name"
            class="w-16 h-16 rounded-full object-cover"
          />
        </div>

        <!-- Coin name and symbol -->
        <div class="text-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ wallet.coin.name }}
          </h3>
          <p class="text-sm text-gray-600">{{ wallet.coin.symbol }}</p>
        </div>

        <!-- Deposit button -->
        <a-button
          type="primary"
          size="large"
          class="w-full"
          @click="$emit('openDepositModal', wallet)"
        >
          Add Deposit
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  depositWallets: {
    type: Array,
    required: true,
  },
});

defineEmits(['openDepositModal']);
</script> 