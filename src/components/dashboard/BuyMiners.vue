<template>
  <div class="p-5 sm:p-6 w-full">
    <h1 class="text-2xl !font-bold text-gray-900 !mb-6 max-sm:!mb-4">Buy Miners</h1>

    <!-- Miners Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="miner in minings"
        :key="miner.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <!-- Miner Image -->
        <div class="h-48 flex items-center justify-center rounded-lg">
          <img
            :src="miner.image"
            :alt="miner.name"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>

        <!-- Miner Info -->
        <div class="p-4">
          <!-- Name -->
          <h3 class="text-lg font-semibold text-gray-900 mb-3 text-center">
            {{ miner.name }}
          </h3>

          <!-- Price -->
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600">Price:</span>
            <span class="text-blue-600 font-bold text-lg"
              >${{ Math.round(miner.price) }}</span
            >
          </div>

          <!-- Daily Return -->
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600">Daily Return:</span>
            <span class="text-green-600 font-semibold"
              >${{ Math.round(miner.per_day) }}</span
            >
          </div>

          <!-- Monthly Return -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-600">Monthly Return:</span>
            <span class="text-green-600 font-semibold"
              >${{ Math.round(miner.per_month) }}</span
            >
          </div>

          <!-- Buy Button -->
          <a-button
            type="primary"
            size="large"
            class="w-full bg-blue-500 hover:bg-blue-600 border-blue-500"
            @click="showConfirmationModal(miner)"
          >
            BUY
          </a-button>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <a-modal
      v-model:open="isModalVisible"
      title="Confirm Purchase"
      :footer="null"
      centered
      width="400px"
    >
      <div class="text-center">
        <p class="text-lg text-gray-700 mb-6">
          Are you sure you want to buy this for ${{ selectedMinerPrice }}?
        </p>
        
        <div class="flex gap-3 justify-center">
          <a-button
            size="large"
            @click="cancelPurchase"
            class="px-6"
          >
            Cancel
          </a-button>
          <a-button
            type="primary"
            size="large"
            @click="confirmPurchase"
            class="px-6 bg-blue-500 hover:bg-blue-600 border-blue-500"
          >
            Buy
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import useMiners from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";

const minersStore = useMiners();
const { minings } = storeToRefs(minersStore);

// Modal state
const isModalVisible = ref(false);
const selectedMiner = ref(null);
const selectedMinerPrice = ref(0);

// Show confirmation modal
const showConfirmationModal = (miner) => {
  selectedMiner.value = miner;
  selectedMinerPrice.value = Math.round(miner.price);
  isModalVisible.value = true;
};

// Cancel purchase
const cancelPurchase = () => {
  isModalVisible.value = false;
  selectedMiner.value = null;
  selectedMinerPrice.value = 0;
};

// Confirm purchase
const confirmPurchase = () => {
  if (selectedMiner.value) {
    const minerName = selectedMiner.value.name; // Store the name before clearing
    minersStore.buyMining(selectedMiner.value.id, () => {
      message.success(`Successfully added ${minerName} to cart!`);
    });
  }
  
  // Close modal
  isModalVisible.value = false;
  selectedMiner.value = null;
  selectedMinerPrice.value = 0;
};

onMounted(() => {
  minersStore.getMinings();
});
</script>

<style scoped>
/* Custom styles for better appearance */
:deep(.ant-btn-primary) {
  height: 44px;
  font-weight: 600;
  font-size: 16px;
}

:deep(.ant-btn-primary:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Modal styles */
:deep(.ant-modal-content) {
  border-radius: 12px;
}

:deep(.ant-modal-header) {
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.ant-modal-title) {
  font-weight: 600;
  font-size: 18px;
}
</style>
