<template>
  <div class="p-4 sm:p-6">
    <div class="flex items-center justify-between">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Withdraw</h1>

      <!-- Withdraw Button -->
      <div class="mb-6">
        <a-button
          type="primary"
          size="large"
          @click="showWithdrawModal = true"
          class="bg-blue-500 hover:bg-blue-600"
        >
          <div class="flex items-center gap-2">
            <WalletIcon class="w-5 h-5" />
            Withdraw Funds
          </div>
        </a-button>
      </div>
    </div>

    <!-- Withdraw History -->
    <WithdrawHistory :withdraw-history="withdraws" :coins="coins" />

    <!-- Withdraw Modal -->
    <WithdrawModal
      v-model:visible="showWithdrawModal"
      :coins="coins"
      :submitting="submitting"
      @withdraw="handleWithdraw"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { WalletIcon } from "lucide-vue-next";
import WithdrawHistory from "./WithdrawHistory.vue";
import WithdrawModal from "./WithdrawModal.vue";
import useMiners from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";
const minersStore = useMiners();
const { coins, withdraws } = storeToRefs(minersStore);

// Modal state
const showWithdrawModal = ref(false);
const submitting = ref(false);

const handleWithdraw = async (values) => {
  submitting.value = true;
  minersStore.postWithdraws(
    {
      coin: values.coin,
      amount: values.amount,
      wallet_adress: values.walletAddress,
    },
    () => {
      showWithdrawModal.value = false;
      submitting.value = false;
      minersStore.getWithdraws();
      message.success("Withdrawal request sent successfully!");
    },
    () => {
      submitting.value = false;
      showWithdrawModal.value = false;
    }
  );
};

onMounted(() => {
  minersStore.getCoins();
  minersStore.getWithdraws();
});
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #f9fafb !important;
  font-weight: 600 !important;
}

:deep(.ant-form-item-label > label) {
  font-weight: 600 !important;
  color: #374151 !important;
}
</style>
