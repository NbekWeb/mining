<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Deposit</h1>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <a-spin size="large" />
    </div>

    <!-- Deposit Wallets Grid -->
    <DepositWalletsGrid 
      :deposit-wallets="deposit_wallets"
      @open-deposit-modal="openDepositModal"
    />

    <!-- Deposits Table -->
    <DepositsTable 
      :deposits="deposits"
      :coins="coins"
      @open-address-modal="openAddressModal"
    />

    <!-- Empty State -->
    <EmptyState 
      :loading="loading"
      :deposit-wallets="deposit_wallets"
      :deposits="deposits"
    />

    <!-- Address Modal -->
    <AddressModal 
      v-model:visible="addressModalVisible"
      :selected-deposit="selectedDeposit"
    />

    <!-- Deposit Modal -->
    <DepositModal 
      v-model:visible="modalVisible"
      :selected-wallet="selectedWallet"
      :loading="loadingUrl.has('mining/deposit-wallets/')"
      @add-deposit="handleAddDeposit"
    />
  </div>
</template>

<script setup>
import useMine from "../../stores/mine.pinia";
import useCore from "../../stores/core.pinia";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import DepositWalletsGrid from "./DepositWalletsGrid.vue";
import DepositsTable from "./DepositsTable.vue";
import AddressModal from "./AddressModal.vue";
import DepositModal from "./DepositModal.vue";
import EmptyState from "./EmptyState.vue";

const minersStore = useMine();
const coreStore = useCore();
const { deposit_wallets, deposits,coins } = storeToRefs(minersStore);
const { loadingUrl } = storeToRefs(coreStore);

// Reactive state
const loading = ref(false);
const modalVisible = ref(false);
const addressModalVisible = ref(false);
const selectedWallet = ref(null);
const selectedDeposit = ref(null);

onMounted(() => {
  minersStore.getDeposits();
  minersStore.getDeposit();
  minersStore.getCoins();
});

// Open deposit modal
const openDepositModal = (wallet) => {
  selectedWallet.value = wallet;
  modalVisible.value = true;
};

// Open address modal
const openAddressModal = (deposit) => {
  selectedDeposit.value = deposit;
  addressModalVisible.value = true;
};

// Handle add deposit
const handleAddDeposit = (depositData) => {
  minersStore.postDeposits(depositData, () => {
    message.success("Deposit request sent successfully!");
    modalVisible.value = false;
    // Refresh deposits list
    minersStore.getDeposits();
  });
};
</script>

<style scoped>
/* Custom styles for better appearance */
.ant-modal-content {
  border-radius: 12px;
}

.ant-modal-header {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;
}

.ant-modal-body {
  padding: 24px;
}
</style>
