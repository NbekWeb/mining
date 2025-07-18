<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Deposit</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <p class="text-gray-600">Deposit content will be displayed here.</p>
    </div>
  </div>
</template>

<script setup>
import useMine from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const minersStore = useMine();
const { deposit_wallets } = storeToRefs(minersStore);

onMounted(() => {
  minersStore.getDeposit();
});

// Deposit component logic

</script> 