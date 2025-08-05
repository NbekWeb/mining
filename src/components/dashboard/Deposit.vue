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

    <!-- First Modal - Amount Input -->
    <DepositModal 
      v-model:visible="showFirstModal"
      :selected-wallet="selectedWallet"
      :loading="loadingUrl.has('mining/deposit-wallets/')"
      @show-confirmation="handleShowConfirmation"
    />
    
    <!-- Second Modal - Payment Confirmation -->
    <DepositConfirmationModal
      v-model:visible="showSecondModal"
      :deposit-data="depositData"
      :loading="loading"
      @confirm-payment="handleConfirmPayment"
      @cancel-deposit="handleCancelDeposit"
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
import DepositConfirmationModal from "./DepositConfirmationModal.vue";
import EmptyState from "./EmptyState.vue";

const minersStore = useMine();
const coreStore = useCore();
const { deposit_wallets, deposits, coins } = storeToRefs(minersStore);
const { loadingUrl } = storeToRefs(coreStore);

// Reactive state
const loading = ref(false);
const addressModalVisible = ref(false);
const selectedDeposit = ref(null);

// Modal states for two-step deposit process
const showFirstModal = ref(false);
const showSecondModal = ref(false);
const depositData = ref(null);
const selectedWallet = ref(null);

onMounted(() => {
  minersStore.getDeposits();
  minersStore.getDeposit();
  minersStore.getCoins();
});

// Open deposit modal (first step)
const openDepositModal = (wallet) => {
  selectedWallet.value = wallet;
  showFirstModal.value = true;
};

// Open address modal
const openAddressModal = (deposit) => {
  selectedDeposit.value = deposit;
  addressModalVisible.value = true;
};

// Handle show confirmation (from first modal to second modal)
const handleShowConfirmation = (data) => {
  depositData.value = data;
  showSecondModal.value = true;
};

// Handle confirm payment (from second modal)
const handleConfirmPayment = (data) => {
  loading.value = true;
  
  // Format currency to 8 decimal places
  const formattedData = {
    ...data,
    currency: parseFloat(data.currency).toFixed(8)
  };
  
  // Make API call to confirm the deposit
  minersStore.postDeposits(formattedData, () => {
    message.success("Deposit request sent successfully!");
    showSecondModal.value = false;
    depositData.value = null;
    loading.value = false;
    
    // Refresh deposits list
    minersStore.getDeposits();
  });
};

// Handle cancel deposit (from second modal)
const handleCancelDeposit = () => {
  showSecondModal.value = false;
  depositData.value = null;
  
  // Show info message
  message.info("Deposit cancelled");
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
